package com.social.net.controllers;

import com.social.net.model.Post;
import com.social.net.model.User;

import com.social.net.services.PostService;
import com.social.net.services.UserService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/api/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostsController {

    @Inject
    PostService postService;
    @Inject
    UserService userService;
    // Lấy tất cả bài đăng, có hỗ trợ phân trang qua query param
    @GET
    public List<Post> getAllPosts(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("size") @DefaultValue("10") int size
    ) {
        return postService.findAllPaged(page, size);
    }

    // Lấy chi tiết 1 bài đăng
    @GET
    @Path("/{id}")
    public Post getPostById(@PathParam("id") Long id) {
        return postService.findByIdOrThrow(id);
    }



    // Tạo bài đăng mới một cách thực tế:
    @POST
    public Response createPost(Post postData) {
        // Kiểm tra xem có truyền thông tin user id hay không
        if (postData.user == null || postData.user.id == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("User id is missing in request").build();
        }

        // Lấy user từ DB dựa trên id
        User user = userService.getUserById(postData.user.id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("User not found").build();
        }

        // Tạo bài đăng mới sử dụng user thực từ DB
        Post created = postService.createPost(user, postData.content, postData.mediaUrl);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    // Cập nhật bài đăng
    @PUT
    @Path("/{id}")
    public Post updatePost(@PathParam("id") Long id, Post postData) {
        return postService.updatePost(id, postData.content, postData.mediaUrl);
    }

    // Xoá bài đăng
    @DELETE
    @Path("/{id}")
    public Response deletePost(@PathParam("id") Long id) {
        boolean deleted = postService.deletePost(id);
        if (deleted) {
            return Response.noContent().build();
        }
        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
