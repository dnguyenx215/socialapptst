package com.social.net.repository;

import com.social.net.model.ChatMessage;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class ChatMessageRepository implements PanacheRepository<ChatMessage> {

    // Lấy danh sách tin nhắn giữa 2 người dùng (hai chiều) theo thứ tự gửi tăng dần
    public List<ChatMessage> findMessagesBetweenUsers(Long userId1, Long userId2) {
        return list("((sender.id = ?1 and receiver.id = ?2) or (sender.id = ?2 and receiver.id = ?1)) order by sentAt asc", userId1, userId2);
    }
}
