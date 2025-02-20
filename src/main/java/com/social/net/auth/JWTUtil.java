package com.social.net.auth;

import io.smallrye.jwt.build.Jwt;
import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.auth.principal.ParseException;
import io.smallrye.jwt.util.ResourceUtils;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import java.util.Set;

@ApplicationScoped
public class JWTUtil {
    @Inject
    JWTParser jwtParser;

    public String generateToken(String username, String email) {
        return Jwt.issuer("social-app")
                .subject(email)
                .groups(Set.of("USER"))
                .claim("username", username)
                .expiresAt(System.currentTimeMillis() / 1000 + 3600)
                .sign();
    }

    public String getEmailFromToken(String token) {
        try {
            // "sub" chứa email theo chuẩn JWT
            return jwtParser.parse(token).getClaim("sub");
        } catch (ParseException e) {
            throw new RuntimeException("Invalid token", e);
        }
    }
}
