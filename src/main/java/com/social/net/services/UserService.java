package com.social.net.services;

import com.social.net.auth.JWTUtil;
import com.social.net.dto.LoginRequest;
import com.social.net.dto.RegisterRequest;
import com.social.net.model.User;
import com.social.net.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.WebApplicationException;
import jakarta.ws.rs.core.Response;
import org.mindrot.jbcrypt.BCrypt;

import java.util.List;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    JWTUtil jwtUtil;

    public List<User> getAllUsers() {
        return userRepository.listAll();
    }

    @Transactional
    public User findById(Long id) {
        return userRepository.findById(id);
    }

    public User getUserById(Long id) {
        User user = userRepository.findById(id);
        if (user == null) {
            throw new WebApplicationException("Không tìm thấy người dùng với ID: " + id, Response.Status.NOT_FOUND);
        }
        return user;
    }

    @Transactional
    public void register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()) != null) {
            throw new WebApplicationException("Email đã được sử dụng!", Response.Status.BAD_REQUEST);
        }

        User user = new User();
        user.username = request.getUsername();
        user.email = request.getEmail();
        user.passwordHash = BCrypt.hashpw(request.getPassword(), BCrypt.gensalt());

        userRepository.persist(user);
    }

    public String login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email);

        if (user == null || !BCrypt.checkpw(request.password, user.passwordHash)) {
            throw new WebApplicationException("Sai email hoặc mật khẩu!", Response.Status.UNAUTHORIZED);
        }

        return jwtUtil.generateToken(user.username, user.email);
    }

    public User getCurrentUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new WebApplicationException("Người dùng không tồn tại", Response.Status.NOT_FOUND);
        }
        return user;
    }
}