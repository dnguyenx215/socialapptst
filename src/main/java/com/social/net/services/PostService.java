package com.social.net.services;

import com.social.net.model.Post;
import com.social.net.model.User;
import com.social.net.repository.PostRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class PostService {

    @Inject
    PostRepository postRepository;

    // Lấy tất cả bài đăng (hoặc thêm phân trang thủ công)
    public List<Post> findAllPosts() {
        return postRepository.listAll();
    }

    // Lấy bài đăng theo phân trang
    // pageIndex: trang bắt đầu từ 0
    // pageSize: số item mỗi trang
    public List<Post> findAllPaged(int pageIndex, int pageSize) {
        return postRepository.findAll()
                .page(pageIndex, pageSize)
                .list();
    }

    // Tạo bài đăng mới
    @Transactional
    public Post createPost(User user, String content, String mediaUrl) {
        Post post = new Post();
        post.user = user;
        post.content = content;
        post.mediaUrl = mediaUrl;
        postRepository.persist(post);
        return post;
    }

    // Tìm bài đăng theo ID (trả về null nếu không tồn tại)
    public Post findById(Long id) {
        return postRepository.findById(id);
    }

    // Tìm bài đăng theo ID, ném lỗi nếu không tồn tại
    public Post findByIdOrThrow(Long id) {
        Post post = findById(id);
        if (post == null) {
            throw new IllegalArgumentException("Post not found with id: " + id);
        }
        return post;
    }

    // Cập nhật nội dung và mediaUrl cho Post
    public Post updatePost(Long id, String content, String mediaUrl) {
        Post post = findByIdOrThrow(id);
        post.content = content;
        post.mediaUrl = mediaUrl;
        // Với Hibernate, nếu post đang trong context (đã được load),
        // thay đổi sẽ tự động cập nhật, nhưng để chắc chắn có thể gọi persist
        postRepository.persist(post);
        return post;
    }

    // Xoá bài đăng
    @Transactional
    public boolean deletePost(Long id) {
        return postRepository.deleteById(id);
    }
}
