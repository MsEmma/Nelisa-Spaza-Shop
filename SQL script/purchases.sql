create table purchases (
    id int primary key auto_increment,
    shop varchar(30) not null,
    date date not null,
    quantity int not null,
    cost decimal(10,2) not null,
    product_id int,
    foreign key (product_id) references products(id)
);
