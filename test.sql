--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` char(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category` (`category`)
);

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Bakery'),
(2, 'Canned Food'),
(3, 'Dairy'),
(4, 'Fruits'),
(5, 'Soft Drinks');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product` varchar(30) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product` (`product`),
  KEY `category_id` (`category_id`)
);

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product`, `category_id`) VALUES
(1, 'Milk 1l', 3),
(2, 'Amasi', 3),
(3, 'Bread', 1),
(4, 'Chakalaka Can', 2),
(5, 'Gold Dish Vegetable Curry Can', 2),
(6, 'Fanta 500ml', 5),
(7, 'Coke 500ml', 5),
(8, 'Cream Soda 500ml', 5),
(9, 'Bananas - loose', 4),
(10, 'Apples - loose', 4);

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE IF NOT EXISTS `purchases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `shop` varchar(30) NOT NULL,
  `date` date NOT NULL,
  `quantity` int(11) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
);

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `shop`, `date`, `quantity`, `cost`, `product_id`) VALUES
(1, 'Makro', '2016-02-06', 30, 9.00, 3),
(2, 'Makro', '2016-02-06', 15, 7.00, 4),
(3, 'Makro', '2016-02-06', 36, 3.50, 7),
(4, 'Makro', '2016-02-06', 18, 4.50, 8),
(5, 'Makro', '2016-02-06', 24, 4.50, 6),
(6, 'Makro', '2016-02-06', 15, 5.00, 5),
(7, 'Makro', '2016-02-06', 25, 17.00, 2),
(8, 'Makro', '2016-02-06', 5, 20.00, 9),
(9, 'Makro', '2016-02-06', 10, 7.00, 1),
(10, 'Makro', '2016-02-06', 10, 8.00, 10);

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE IF NOT EXISTS `sales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `sold` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
);

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `date`, `product_id`, `sold`, `price`) VALUES
(1, '2016-02-01', 1, 3, 10.00),
(2, '2016-02-01', 2, 1, 25.00),
(3, '2016-02-01', 3, 2, 12.00),
(4, '2016-02-01', 4, 3, 10.00),
(5, '2016-02-01', 5, 2, 9.00),
(6, '2016-02-01', 6, 3, 6.00),
(7, '2016-02-01', 7, 2, 6.00),
(8, '2016-02-01', 8, 2, 7.00),
(9, '2016-02-01', 9, 0, 30.00),
(10, '2016-02-01', 10, 2, 12.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(150) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `admin`, `locked`) VALUES
(1, 'nelisa', '$2a$10$H0ZsbNmQmU6Ff7zh0IfvOuEbjbhjOZblW98O/Xmm8lnMIeAoN.mwm', 1, 0),
(2, 'tom', '$2a$10$OJ1wnWQFQsi4AqxpZTJiCOoDayEeZUodr9su7Z3bykf8g5UC.Gx.6', 0, 1),
(3, 'rose', '$2a$10$5c8UW/MCUkfY8so4SrFBJufQtxfnNBM2XipvND.PCU1TOGO0IoKw6', 0, 0);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
