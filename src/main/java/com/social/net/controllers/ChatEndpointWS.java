package com.social.net.controllers;

import com.social.net.model.ChatMessage;

import com.social.net.services.ChatService;
import jakarta.inject.Inject;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

@ServerEndpoint("/ws/chat/{userId}")
public class ChatEndpointWS {

    // Quản lý các kết nối hiện có
    private static Set<ChatEndpointWS> endpoints = new CopyOnWriteArraySet<>();

    private Session session;
    private Long userId;

    // Injection ChatService (lưu ý: nếu gặp khó khăn với injection, bạn có thể dùng CDI.current() để lookup)
    @Inject
    ChatService chatService;

    @OnOpen
    public void onOpen(Session session, @PathParam("userId") String userIdStr) {
        this.session = session;
        this.userId = Long.valueOf(userIdStr);
        endpoints.add(this);
        sendMessage("Connected as user " + userId);
    }

    @OnMessage
    public void onMessage(String message, Session session) {
        // Định dạng tin nhắn dự kiến: "receiverId:messageContent"
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

        try {
            ChatMessage chatMessage = chatService.sendMessage(userId, receiverId, content);
            broadcastMessage(chatMessage, receiverId);
        } catch (Exception e) {
            sendMessage("Error sending message: " + e.getMessage());
        }
    }

    @OnClose
    public void onClose(Session session) {
        endpoints.remove(this);
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        throwable.printStackTrace();
    }

    // Gửi tin nhắn tới client hiện tại
    private void sendMessage(String message) {
        try {
            session.getBasicRemote().sendText(message);
        } catch (IOException e) {
            System.out.println("Error sending message: " + e.getMessage());
        }
    }

    // Phát tin nhắn tới các client có userId khớp với receiver hoặc sender (để hiển thị lại tin nhắn)
    private void broadcastMessage(ChatMessage chatMessage, Long receiverId) {
        String formattedMessage = formatChatMessage(chatMessage);
        for (ChatEndpointWS endpoint : endpoints) {
            if (endpoint.userId.equals(receiverId) || endpoint.userId.equals(chatMessage.sender.id)) {
                endpoint.sendMessage(formattedMessage);
            }
        }
    }

    // Định dạng tin nhắn gửi về client (có thể chuyển đổi sang JSON nếu cần)
    private String formatChatMessage(ChatMessage chatMessage) {
        return "From: " + chatMessage.sender.username + " | Message: " + chatMessage.content;
    }
}
