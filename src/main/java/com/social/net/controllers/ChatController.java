package com.social.net.controllers;



import com.social.net.model.ChatMessage;
import com.social.net.services.ChatService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/api/chat")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChatController {

    @Inject
    ChatService chatService;

    // DTO để gửi tin nhắn qua REST
    public static class MessageRequest {
        public Long senderId;
        public Long receiverId;
        public String content;
    }

    /**
     * Endpoint gửi tin nhắn qua REST.
     */
    @POST
    @Path("/messages")
    public Response sendMessage(MessageRequest request) {
        if (request.senderId == null || request.receiverId == null || request.content == null || request.content.trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("senderId, receiverId và content không được để trống").build();
        }
        try {
            ChatMessage chatMessage = chatService.sendMessage(request.senderId, request.receiverId, request.content);
            return Response.status(Response.Status.CREATED).entity(chatMessage).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    /**
     * Endpoint lấy danh sách tin nhắn giữa 2 người dùng.
     */
    @GET
    @Path("/messages")
    public Response getMessages(@QueryParam("user1") Long user1, @QueryParam("user2") Long user2) {
        if (user1 == null || user2 == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Cần truyền user1 và user2").build();
        }
        List<ChatMessage> messages = chatService.getChatMessages(user1, user2);
        return Response.ok(messages).build();
    }
}
