package com.social.net.services;

import com.social.net.model.ChatMessage;
import com.social.net.model.User;
import com.social.net.repository.ChatMessageRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ChatService {

    @Inject
    ChatMessageRepository chatMessageRepository;

    @Inject
    UserService userService;

    /**
     * Gửi tin nhắn từ sender sang receiver, lưu vào DB và trả về đối tượng ChatMessage.
     */
    @Transactional
    public ChatMessage sendMessage(Long senderId, Long receiverId, String content) {
        User sender = userService.findById(senderId);
        User receiver = userService.findById(receiverId);
        if (sender == null || receiver == null) {
            throw new IllegalArgumentException("Sender hoặc Receiver không tồn tại.");
        }
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.sender = sender;
        chatMessage.receiver = receiver;
        chatMessage.content = content;
        chatMessageRepository.persist(chatMessage);
        return chatMessage;
    }

    /**
     * Lấy danh sách tin nhắn giữa 2 người dùng.
     */
    public List<ChatMessage> getChatMessages(Long userId1, Long userId2) {
        return chatMessageRepository.findMessagesBetweenUsers(userId1, userId2);
    }
}
