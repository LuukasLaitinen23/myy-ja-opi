-- TESTIDATAN LISÄÄMINEN



-- Käyttäjät (Users)

INSERT INTO users (user_id, first_name, last_name, username, password, email, user_level, avatar) VALUES

(1, 'Matti', 'Meikäläinen', 'mattim', '$2b$10$hashedpass1', 'matti@metropolia.fi', 1, 'avatar1.png'),

(2, 'Laura', 'Opiskelija', 'laura_o', '$2b$10$hashedpass2', 'laura@aalto.fi', 1, 'avatar2.png'),

(3, 'Admin', 'Järjestäjä', 'opiskelijakunta', '$2b$10$hashedpass3', 'hallitus@opkunta.fi', 3, 'admin_logo.png');



-- Kategoriat (Categories)

INSERT INTO categories (category_id, name) VALUES

(1, 'Kurssikirjat & opiskelutarvikkeet'),

(2, 'Tapahtumaliput & bileet'),

(3, 'Haalarimerkit & opiskelijakulttuuri'),

(4, 'Elektroniikka & IT'),

(5, 'Koti & soluasuminen');



-- Tapahtumat (Events)

INSERT INTO events (event_id, user_id, title, description, event_date, venue, street_address, city, postal_code, image) VALUES

(1, 3, 'Helsingin Wappuapprot 2027', 'Vuoden suurin opiskelijatapahtuma kantakaupungissa.', '2027-04-29 16:00:00', 'Kansalaistori', 'Mannerheiminaukio 1', 'Helsinki', '00100', 'appro27.jpg'),

(2, 3, 'Insinöörien Kevätsitsit', 'Perinteiset sitsit teemalla kasari.', '2027-05-15 18:00:00', 'Uudisrakennuksen kerhohuone', 'Vanha viertotie 23', 'Helsinki', '00350', 'sitsit.jpg');



-- Tuotteet (Products)

-- Huom: 1 & 2 ovat tavallisia tavaroita (event_id = NULL). 3 on tapahtumalippu (kytketty eventtiin 1).

INSERT INTO products (product_id, user_id, category_id, event_id, title, `condition`, description, price, quantity, is_sold, image, street_address, city, postal_code) VALUES

(1, 1, 1, NULL, 'Tekniikan kaavasto & TI-84 Plus', 3, 'Hyväkuntoiset matematiikan apuvälineet insinöörille.', 45.00, 1, FALSE, 'laskin.jpg', 'Karaportti 2', 'Espoo', '02610'),

(2, 2, 5, NULL, 'Airfryer 4.2L kompakti', 2, 'Soluhuoneeseen sopiva kiertoilmakypsennin vähän käytettynä.', 30.00, 1, FALSE, 'airfryer.jpg', 'Ruoholahdenkatu 14', 'Helsinki', '00180'),

(3, 3, 2, 1, 'Wappuappro 2027 Pääsylippu + Haalarimerkki', NULL, 'Virallinen osallistujaranneke suoraan järjestäjältä.', 15.00, 50, FALSE, 'lippu.jpg', 'Mannerheiminaukio 1', 'Helsinki', '00100');



-- Kommentit (Comments)

INSERT INTO comments (product_id, user_id, content) VALUES

(1, 2, 'Onko laskimessa tuoreet paristot mukana?'),

(1, 1, 'Joo, vaihdettu viime viikolla!');



-- Suosikit (Favorites)

INSERT INTO favorites (user_id, product_id) VALUES

(1, 2), -- Matti tykkää Lauran airfryerista

(2, 1); -- Laura tykkää Matin laskimesta



-- Arvostelut (Reviews)

INSERT INTO reviews (reviewer_id, seller_id, rating) VALUES

(2, 1, 5); -- Laura antaa Matille 5 tähteä sujuvista kaupoista

