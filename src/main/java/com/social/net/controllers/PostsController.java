package com.social.net.controllers;

import com.social.net.model.Post;
import com.social.net.repository.UserRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PostsController {

    @Inject
    UserRepository userRepository;

    @GET
    public List<Post> getAllPosts() {
        return Post.listAll();
    }

    @POST
    @Transactional
    public Response createPost(Post post) {
        post.persist();
        return Response.status(Response.Status.CREATED).entity(post).build();
    }
}
