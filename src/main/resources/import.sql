-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

CREATE DATABASE social_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE social_app;

CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       password_hash TEXT NOT NULL,
                       full_name VARCHAR(100),
                       avatar_url TEXT,
                       bio TEXT,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       user_id BIGINT NOT NULL,
                       content TEXT,
                       media_url TEXT,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
