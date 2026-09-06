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
    price_per_month int(50)
);
CREATE TABLE car_for_sale(
    car_id int PRIMARY KEY AUTO_INCREMENT,
    car_name varchar(50) NOT NULL,
    available_seat int(50) NOT NULL,
    price_per_car int(50) NOT NULL
);
CREATE TABLE ctegories(
    category_id int PRIMARY KEY AUTO_INCREMENT,
    categoty_name varchar(50) NOT NULL
);
CREATE TABLE contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
