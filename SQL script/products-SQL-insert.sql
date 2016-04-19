CREATE table products(
    id int primary key auto_increment not null,
    product varchar(30) not null,
    category varchar(30) not null,
    category_id int,
    foreign key (category_id) references categories(id)
    );

INSERT INTO `products` (`product`)  VALUES ('Milk 1l')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Amasi')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Bread')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Chakalaka Can')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Gold Dish Vegetable Curry Can')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Fanta 500ml')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Coke 500ml')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Cream Soda 500ml')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Iwisa Pap 5kg')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Top Class Soy Mince')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Shampoo 1 litre')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Soap Bar')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Bananas - loose')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Apples - loose')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Mixed Sweets 5s')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Heart Chocolates')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Rose (plastic)')# 1 row affected.
INSERT INTO `products` (`product`)  VALUES ('Valentine Cards')# 1 row affected.

UPDATE products AS p
INNER JOIN category AS c
ON p.category = c.description
SET p.category_id = c.id;

ALTER TABLE products ADD category VARCHAR(30) AFTER product;

UPDATE products AS p
INNER JOIN categories AS c
ON p.category_id = c.id
SET p.category = c.category;
