package com.social.net.controllers;

import com.social.net.model.ChatMessage;
import com.social.net.services.ChatService;
import com.social.net.services.UserService;
import jakarta.inject.Inject;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.eclipse.microprofile.context.ManagedExecutor;


import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CompletionStage;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint("/ws/chat/{userId}")
public class ChatEndpoint {

    // Quản lý các kết nối hiện tại
    private static Set<ChatEndpoint> endpoints = new CopyOnWriteArraySet<>();

    private Session session;
    private Long userId;

    @Inject
    ChatService chatService;

    @Inject
    UserService userService;

    @Inject
    ManagedExecutor managedExecutor;

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userIdStr) {
        this.session = session;
        this.userId = Long.valueOf(userIdStr);

        // Offload blocking DB call ra worker thread
        managedExecutor.execute(() -> {
            if (userService.findById(userId) == null) {
                sendMessage("User not found with Id: " + userId);
                try {
                    session.close(new CloseReason(CloseReason.CloseCodes.VIOLATED_POLICY, "User not found"));
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return;
            }
            endpoints.add(this);
            sendMessage("Connected as user " + userId);
        });
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        // Định dạng tin nhắn: "receiverId:messageContent"
        String[] parts = message.split(":", 2);
        if (parts.length != 2) {
            sendMessage("Invalid message format. Expected format: receiverId:messageContent");
            return;
        }
        Long receiverId;
        try {
            receiverId = Long.valueOf(parts[0]);
        } catch (NumberFormatException e) {
            sendMessage("Invalid receiver id");
            return;
        }
        String content = parts[1];

        // Offload thao tác blocking (gọi chatService.sendMessage, DB persist, ...) ra worker thread
        CompletionStage<Void> cs = managedExecutor.supplyAsync(() -> {
            ChatMessage chatMessage = chatService.sendMessage(userId, receiverId, content);
            broadcastMessage(chatMessage, receiverId);
            return null;
        });

        cs.exceptionally(ex -> {
            sendMessage("Error sending message: " + ex.getMessage());
            return null;
        });
    }

    @OnClose
    public void onClose(Session session) {
        endpoints.remove(this);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
    }

    // Sử dụng async remote để gửi tin nhắn tránh blocking IO thread
    private void sendMessage(String message) {
        session.getAsyncRemote().sendText(message);
    }

    // Phát tin nhắn tới các client có userId khớp với receiver hoặc sender
    private void broadcastMessage(ChatMessage chatMessage, Long receiverId) {
        String formattedMessage = formatChatMessage(chatMessage);
        endpoints.forEach(endpoint -> {
            if (endpoint.userId.equals(receiverId) || endpoint.userId.equals(chatMessage.sender.id)) {
                endpoint.sendMessage(formattedMessage);
            }
        });
    }

    private String formatChatMessage(ChatMessage chatMessage) {
        return "From: " + chatMessage.sender.username + " | Message: " + chatMessage.content;
    }
}
