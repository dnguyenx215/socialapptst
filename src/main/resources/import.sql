-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

CREATE DATABASE social_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE social_app;

CREATE TABLE users (
                       id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                       username VARCHAR(255) NOT NULL UNIQUE,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password_hash VARCHAR(255) NOT NULL,
                       full_name VARCHAR(255),
                       avatar_url VARCHAR(255),
                       bio TEXT
);


CREATE TABLE posts (
                       id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                       user_id BIGINT NOT NULL,
                       content TEXT,
                       media_url VARCHAR(255),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       CONSTRAINT fk_post_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE chat_messages (
                               id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
                               sender_id BIGINT NOT NULL,
                               receiver_id BIGINT NOT NULL,
                               content TEXT,
                               sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               CONSTRAINT fk_chat_sender FOREIGN KEY (sender_id) REFERENCES users(id),
                               CONSTRAINT fk_chat_receiver FOREIGN KEY (receiver_id) REFERENCES users(id)
);


