create table purchases (
    id int primary key auto_increment,
    shop varchar(30) not null,
    date varchar(30) not null,
    product varchar(50) not null,
    quantity int not null,
    cost decimal(10,2) not null,
    total_cost decimal(10,2) not null,
    week int not null,
    product_id int,
    foreign key (product_id) references products(id)
);

UPDATE purchases AS pur
INNER JOIN products AS p
ON pur.product = p.product
SET pur.product_id = p.id;

ALTER TABLE purchases ADD category VARCHAR(30) AFTER product;

UPDATE purchases AS pur
INNER JOIN products AS p
ON pur.product = p.product
SET pur.category = p.category;
