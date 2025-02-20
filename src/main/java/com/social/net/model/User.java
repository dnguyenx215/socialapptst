package com.social.net.model;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false, unique = true)
    public String username;

    @Column(nullable = false, unique = true)
    public String email;

    @Column(nullable = false)
    public String passwordHash;

    public String fullName;
    public String avatarUrl;
    public String bio;
}
