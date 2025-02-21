package com.social.net.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages")
public class ChatMessage extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    // Người gửi
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    public User sender;

    // Người nhận
    @ManyToOne
    @JoinColumn(name = "receiver_id", nullable = false)
    public User receiver;

    // Nội dung tin nhắn
    @Column(columnDefinition = "TEXT")
    public String content;

    // Thời gian gửi tin nhắn
    public LocalDateTime sentAt = LocalDateTime.now();
}
