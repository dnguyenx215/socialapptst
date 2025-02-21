package com.social.net.repository;

import com.social.net.model.Post;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class PostRepository implements PanacheRepository<Post> {
    // Nếu cần custom query, bạn có thể viết thêm vào đây.
    // Ví dụ:
    // public List<Post> findByUserId(Long userId) { ... }
}
