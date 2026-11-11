-- ESIMERKKIKYSELYT (Backendin SQL-toteutuksia varten)



--  Hae kaikki myynnissä olevat tuotteet ja niiden kategorian sekä myyjän nimi

SELECT p.product_id, p.title, p.price, p.city, c.name AS category_name, u.username AS seller

FROM products p

JOIN categories c ON p.category_id = c.category_id

JOIN users u ON p.user_id = u.user_id

WHERE p.is_sold = FALSE

ORDER BY p.created_at DESC;



-- Hae tietyn tapahtuman myynnissä olevat liput

SELECT products.product_id, products.title, products.price, products.quantity, events.title AS event_title, events.event_date

FROM products

JOIN events ON products.event_id = events.event_id

WHERE products.event_id = 1 AND products.is_sold = FALSE;



-- Laske käyttäjän (myyjän) saama keskimääräinen tähtiarvosana

SELECT seller_id, ROUND(AVG(rating), 1) AS average_rating, COUNT(*) AS review_count

FROM reviews

WHERE seller_id = 1

GROUP BY seller_id;



-- Hae käyttäjän (user_id = 2) tallentamat suosikkituotteet

SELECT products.product_id, products.title, products.price, products.city

FROM favorites

JOIN products ON favorites.product_id = products.product_id

WHERE favorites.user_id = 2;







-- Poista tuote käyttäjän suosikeista

DELETE FROM favorites

WHERE user_id = 2 AND product_id = 1;



-- Merkitse tuote myydyksi (is_sold = TRUE) käyttäjän toimesta

UPDATE products

SET is_sold = TRUE

WHERE product_id = 1 AND user_id = 1;



-- Päivitä käyttäjän profiilitiedot (esim. avatar ja etunimi)

UPDATE users

SET avatar = 'uusi_kuva.png', first_name = 'Matti-Pekka'

WHERE user_id = 1;
