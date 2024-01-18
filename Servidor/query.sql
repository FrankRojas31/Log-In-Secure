CREATE DATABASE Log_In;

USE Log_In;

SELECT * FROM tb_users;

CREATE TABLE tb_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    image_user VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
);

