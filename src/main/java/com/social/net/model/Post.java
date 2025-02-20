package com.social.net.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "posts")
public class Post extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    public User user;

    @Column(columnDefinition = "TEXT")
    public String content;

    public String mediaUrl;

    public LocalDateTime createdAt = LocalDateTime.now();
}
