CREATE DATABASE car_rent_db;
USE car_rent_db;

CREATE TABLE users(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('user','admin') DEFAULT 'user'
);
CREATE TABLE car_for_rental(
    car_id int PRIMARY KEY AUTO_INCREMENT,
    car_name varchar(50) NOT NULL,
    available_seat int(50) NOT NULL,
    price_per_day int(50),
    price_per_week int(50),
    price_per_month int(50),
    category_id int,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL

);
CREATE TABLE car_for_sale(
    car_id int PRIMARY KEY AUTO_INCREMENT,
    car_name varchar(50) NOT NULL,
    available_seat int(50) NOT NULL,
    price_per_car int(50) NOT NULL,
    category_id int,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL

);
CREATE TABLE categories(
    category_id int PRIMARY KEY AUTO_INCREMENT,
    category_name varchar(50) NOT NULL,
    description TEXT,
    category_image VARCHAR(255),
    status ENUM('active','inactive') DEFAULT 'active'
);
CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);