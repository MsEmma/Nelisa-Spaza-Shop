create table sales (
    id int primary key auto_increment,
    date date not null,
    sold int,
    price decimal(10,2),
    product_id int,
    foreign key (product_id) references products(id)
);
