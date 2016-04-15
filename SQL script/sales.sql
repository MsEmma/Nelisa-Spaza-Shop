create table sales (
    id int primary key auto_increment,
    day varchar(30) not null,
    date varchar(30) not null,
    product varchar(50) not null,
    sold int,
    sales_price decimal(10,2),
    product_id int,
    foreign key (product_id) references products(id)
);

UPDATE sales AS s
INNER JOIN products AS p
ON s.product = p.product
SET s.product_id = p.id;

ALTER TABLE sales ADD week int not null;
UPDATE sales SET week = 1;

DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 433;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 434;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 435;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 436;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 437;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 438;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 439;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 440;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 441;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 442;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 443;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 444;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 445;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 446;
DELETE FROM `spaza`.`sales` WHERE `sales`.`id` = 447;
