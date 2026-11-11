-- TIETOKANNAN ALUSTUS

-- Poistetaan vanha kanta ja luodaan uusi tyhjä

DROP DATABASE IF EXISTS opijamyy;

CREATE DATABASE opijamyy;

USE opijamyy;



-- TAULUJEN LUONTI



-- 1. USERS-taulu (käyttäjät)

CREATE TABLE users (

    user_id INT NOT NULL AUTO_INCREMENT,

    first_name VARCHAR(100),

    last_name VARCHAR(100),

    username VARCHAR(50) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    user_level INT NOT NULL DEFAULT 1,

    avatar VARCHAR(255) DEFAULT 'default_avatar.png',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id)

);



-- 2. CATEGORIES-taulu (tuotekategoriat)

CREATE TABLE categories (

    category_id INT NOT NULL AUTO_INCREMENT,

    name VARCHAR(100) NOT NULL UNIQUE,

    PRIMARY KEY (category_id)

);



-- 3. EVENTS-taulu (opiskelijatapahtumat)

CREATE TABLE events (

    event_id INT NOT NULL AUTO_INCREMENT,

    user_id INT NOT NULL, -- Tapahtuman luoja / järjestäjä

    title VARCHAR(200) NOT NULL,

    description TEXT,

    event_date DATETIME NOT NULL,

    venue VARCHAR(150),

    street_address VARCHAR(150),

    city VARCHAR(100) NOT NULL,

    postal_code VARCHAR(10) NOT NULL, -- VARCHAR etunollien säilymiseksi

    image VARCHAR(255),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (event_id),

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE

);



-- 4. PRODUCTS-taulu (myytävät esineet ja tapahtumaliput)

CREATE TABLE products (

    product_id INT NOT NULL AUTO_INCREMENT,

    user_id INT NOT NULL, -- Myyjä

    category_id INT NOT NULL,

    event_id INT NULL, -- NULL normaaleilla tavaroilla, numero lipuilla

    title VARCHAR(200) NOT NULL,

    `condition` INT NULL, -- 1=Uusi, 2=Erinomainen, 3=Hyvä, 4=Kohtalainen, 5=Huono (lipuilla NULL)

    description TEXT,

    price DECIMAL(10, 2) NOT NULL,

    quantity INT NOT NULL DEFAULT 1,

    is_sold BOOLEAN NOT NULL DEFAULT FALSE,

    image VARCHAR(255),

    street_address VARCHAR(150), -- Valinnainen tarkka sijainti

    city VARCHAR(100) NOT NULL,

    postal_code VARCHAR(10) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (product_id),

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,

    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT,

    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE SET NULL

);



-- 5. COMMENTS-taulu (tuotesivun julkiset kysymykset ja kommentit)

CREATE TABLE comments (

    comment_id INT NOT NULL AUTO_INCREMENT,

    product_id INT NOT NULL,

    user_id INT NOT NULL, -- Kommentin kirjoittaja

    content TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (comment_id),

    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE

);



-- 6. FAVORITES-taulu (suosikit / sydämet)

CREATE TABLE favorites (

    favorite_id INT NOT NULL AUTO_INCREMENT,

    user_id INT NOT NULL,

    product_id INT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (favorite_id),

    UNIQUE KEY unique_user_product_favorite (user_id, product_id), -- Estää saman tuotteen tuplatykkäyksen

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,

    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE

);



-- 7. REVIEWS-taulu (myyjän tähtiarvostelut 1–5)

CREATE TABLE reviews (

    review_id INT NOT NULL AUTO_INCREMENT,

    reviewer_id INT NOT NULL, -- Ostaja

    seller_id INT NOT NULL,   -- Myyjä

    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (review_id),

    CHECK (reviewer_id != seller_id), -- Estää itsensä arvostelun

    FOREIGN KEY (reviewer_id) REFERENCES users(user_id) ON DELETE CASCADE,

    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE

);
