package com.social.net.controllers;

import com.social.net.auth.JWTUtil;
import com.social.net.dto.CustomAPIResponse;
import com.social.net.dto.LoginRequest;
import com.social.net.dto.RegisterRequest;
import com.social.net.model.User;
import com.social.net.services.UserService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.List;

@Path("/api/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {

    @Inject
    UserService userService;
    @Inject
    JWTUtil jwtUtil;

    @GET
    public Response getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return Response.ok()
                    .entity(CustomAPIResponse.success("Lấy danh sách người dùng thành công", users))
                    .build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus())
                    .entity(CustomAPIResponse.error(e.getMessage()))
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(CustomAPIResponse.error("Lỗi hệ thống: " + e.getMessage()))
                    .build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getUserById(@PathParam("id") Long id) {
        try {
            User user = userService.getUserById(id);
            return Response.ok()
                    .entity(CustomAPIResponse.success("Lấy thông tin người dùng thành công", user))
                    .build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus())
                    .entity(CustomAPIResponse.error(e.getMessage()))
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(CustomAPIResponse.error("Lỗi hệ thống: " + e.getMessage()))
                    .build();
        }
    }

    @POST
    @Path("/register")
    public Response register(RegisterRequest request) {
        try {
            if (request == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(CustomAPIResponse.error("Dữ liệu đăng ký không hợp lệ"))
                        .build();
            }

            userService.register(request);
            return Response.status(Response.Status.CREATED)
                    .entity(CustomAPIResponse.success("Đăng ký thành công", null))
                    .build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus())
                    .entity(CustomAPIResponse.error(e.getMessage()))
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(CustomAPIResponse.error("Lỗi đăng ký: " + e.getMessage()))
                    .build();
        }
    }

    @POST
    @Path("/login")
    public Response login(LoginRequest request) {
        try {
            if (request == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(CustomAPIResponse.error("Dữ liệu đăng nhập không hợp lệ"))
                        .build();
            }

            String token = userService.login(request);


            return Response.ok()
                    .entity(CustomAPIResponse.success("Đăng nhập thành công", token))
                    .build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus())
                    .entity(CustomAPIResponse.error(e.getMessage()))
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(CustomAPIResponse.error("Lỗi đăng nhập: " + e.getMessage()))
                    .build();
        }
    }

    @GET
    @Path("/me")
    @RolesAllowed("USER")
    public Response getProfile(@HeaderParam("Authorization") String authHeader) {
        try {
            String token = authHeader.substring("Bearer ".length());
            String email = jwtUtil.getEmailFromToken(token); // Giả sử có method này

            User currentUser = userService.getCurrentUser(email);
            return Response.ok()
                    .entity(CustomAPIResponse.success("Lấy thông tin người dùng thành công", currentUser))
                    .build();
        } catch (WebApplicationException e) {
            return Response.status(e.getResponse().getStatus())
                    .entity(CustomAPIResponse.error(e.getMessage()))
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(CustomAPIResponse.error("Lỗi xác thực: " + e.getMessage()))
                    .build();
        }
    }
}