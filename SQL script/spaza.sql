-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 02, 2016 at 09:29 AM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `spaza`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` char(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category` (`category`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Bakery'),
(2, 'Canned Food'),
(3, 'Dairy'),
(4, 'Fruits'),
(11, 'Laundry'),
(5, 'Soft Drinks'),
(6, 'Staples'),
(7, 'Stationery'),
(8, 'Sweets'),
(9, 'Toiletries');

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

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
(9, 'Iwisa Pap 5kg', 6),
(10, 'Top Class Soy Mince', 6),
(11, 'Shampoo 1 litre', 9),
(12, 'Soap Bar', 9),
(13, 'Bananas - loose', 4),
(14, 'Apples - loose', 4),
(15, 'Mixed Sweets 5s', 8),
(16, 'Heart Chocolates', 8),
(17, 'Rose (plastic)', 7),
(18, 'Valentine Cards', 7),
(21, 'OMO Auto', 11),
(25, 'Conditioner', 9);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=120 ;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `shop`, `date`, `quantity`, `cost`, `product_id`) VALUES
(1, 'HomeMade', '2016-02-02', 1, 20.00, 11),
(2, 'HomeMade', '2016-02-02', 3, 3.00, 12),
(3, 'Epping Market', '2016-02-03', 12, 1.00, 13),
(4, 'Epping Market', '2016-02-03', 100, 1.50, 14),
(5, 'Epping Market', '2016-02-03', 240, 3.00, 15),
(6, 'HomeMade', '2016-02-04', 2, 20.00, 11),
(7, 'HomeMade', '2016-02-04', 5, 3.00, 12),
(8, 'Joe Spaza Shop', '2016-02-04', 4, 11.00, 3),
(9, 'Joe Spaza Shop', '2016-02-04', 4, 24.00, 2),
(10, 'Epping Market', '2016-02-06', 8, 1.00, 13),
(11, 'Epping Market', '2016-02-06', 100, 1.50, 14),
(12, 'Epping Market', '2016-02-06', 150, 3.00, 15),
(13, 'HomeMade', '2016-02-06', 5, 3.00, 12),
(14, 'Makro', '2016-02-06', 30, 9.00, 3),
(15, 'Makro', '2016-02-06', 15, 7.00, 4),
(16, 'Makro', '2016-02-06', 36, 3.50, 7),
(17, 'Makro', '2016-02-06', 18, 4.50, 8),
(18, 'Makro', '2016-02-06', 24, 4.50, 6),
(19, 'Makro', '2016-02-06', 15, 5.00, 5),
(20, 'Makro', '2016-02-06', 25, 17.00, 2),
(21, 'Makro', '2016-02-06', 5, 20.00, 9),
(22, 'Makro', '2016-02-06', 10, 7.00, 1),
(23, 'Makro', '2016-02-06', 10, 8.00, 10),
(24, 'ChinaTown', '2016-02-09', 20, 10.00, 17),
(25, 'Joe Spaza Shop', '2016-02-09', 3, 9.50, 1),
(26, 'Epping Market', '2016-02-10', 4, 1.00, 13),
(27, 'Epping Market', '2016-02-10', 20, 1.50, 14),
(28, 'Epping Market', '2016-02-10', 150, 3.00, 15),
(29, 'Makro', '2016-02-10', 10, 9.00, 3),
(30, 'Makro', '2016-02-10', 15, 7.00, 4),
(31, 'Makro', '2016-02-10', 18, 3.50, 7),
(32, 'Makro', '2016-02-10', 5, 5.00, 5),
(33, 'Makro', '2016-02-10', 20, 25.00, 16),
(34, 'Makro', '2016-02-10', 10, 17.00, 2),
(35, 'Makro', '2016-02-10', 5, 20.00, 9),
(36, 'Makro', '2016-02-10', 10, 7.00, 1),
(37, 'Makro', '2016-02-10', 15, 8.00, 10),
(38, 'HomeMade', '2016-02-11', 2, 20.00, 11),
(39, 'HomeMade', '2016-02-11', 20, 2.00, 18),
(40, 'Joe Spaza Shop', '2016-02-12', 3, 9.50, 1),
(41, 'Epping Market', '2016-02-13', 4, 1.00, 13),
(42, 'Epping Market', '2016-02-13', 50, 3.00, 15),
(43, 'HomeMade', '2016-02-13', 3, 20.00, 11),
(44, 'HomeMade', '2016-02-13', 5, 3.00, 12),
(45, 'Joe Spaza Shop', '2016-02-13', 5, 8.50, 5),
(46, 'Makro', '2016-02-13', 5, 9.00, 3),
(47, 'Makro', '2016-02-13', 12, 3.50, 7),
(48, 'Makro', '2016-02-13', 12, 4.50, 6),
(49, 'Makro', '2016-02-13', 20, 17.00, 2),
(50, 'Makro', '2016-02-13', 15, 7.00, 1),
(51, 'Makro', '2016-02-13', 5, 8.00, 10),
(52, 'HomeMade', '2016-02-14', 1, 20.00, 11),
(53, 'Joe Spaza Shop', '2016-02-14', 2, 8.50, 5),
(54, 'Joe Spaza Shop', '2016-02-16', 2, 8.50, 4),
(55, 'Joe Spaza Shop', '2016-02-16', 2, 7.50, 8),
(56, 'Joe Spaza Shop', '2016-02-16', 1, 6.50, 6),
(57, 'Joe Spaza Shop', '2016-02-16', 2, 8.50, 5),
(58, 'Joe Spaza Shop', '2016-02-16', 1, 30.00, 9),
(59, 'Joe Spaza Shop', '2016-02-16', 6, 9.50, 1),
(60, 'Epping Market', '2016-02-17', 60, 1.50, 14),
(61, 'Epping Market', '2016-02-17', 12, 3.00, 15),
(62, 'Makro', '2016-02-17', 15, 9.00, 3),
(63, 'Makro', '2016-02-17', 10, 7.00, 4),
(64, 'Makro', '2016-02-17', 24, 3.50, 7),
(65, 'Makro', '2016-02-17', 12, 4.50, 8),
(66, 'Makro', '2016-02-17', 12, 4.50, 6),
(67, 'Makro', '2016-02-17', 10, 5.00, 5),
(68, 'Makro', '2016-02-17', 15, 17.00, 2),
(69, 'Makro', '2016-02-17', 5, 20.00, 9),
(70, 'Makro', '2016-02-17', 15, 7.00, 1),
(71, 'Makro', '2016-02-17', 5, 8.00, 10),
(72, 'HomeMade', '2016-02-18', 1, 20.00, 11),
(73, 'HomeMade', '2016-02-18', 5, 3.00, 12),
(74, 'HomeMade', '2016-02-19', 2, 20.00, 11),
(75, 'Joe Spaza Shop', '2016-02-19', 1, 9.50, 1),
(76, 'Epping Market', '2016-02-20', 20, 1.00, 13),
(77, 'Epping Market', '2016-02-20', 90, 1.50, 14),
(78, 'Epping Market', '2016-02-20', 20, 3.00, 15),
(79, 'HomeMade', '2016-02-20', 2, 20.00, 11),
(80, 'HomeMade', '2016-02-20', 3, 3.00, 12),
(81, 'Makro', '2016-02-20', 10, 9.00, 3),
(82, 'Makro', '2016-02-20', 10, 17.00, 2),
(83, 'Makro', '2016-02-20', 5, 20.00, 9),
(84, 'Makro', '2016-02-20', 15, 7.00, 1),
(85, 'Makro', '2016-02-20', 10, 8.00, 10),
(86, 'Joe Spaza Shop', '2016-02-23', 3, 9.00, 4),
(87, 'Epping Market', '2016-02-24', 10, 1.00, 13),
(88, 'Epping Market', '2016-02-24', 90, 1.50, 14),
(89, 'Epping Market', '2016-02-24', 8, 3.00, 15),
(90, 'Makro', '2016-02-24', 15, 9.00, 3),
(91, 'Makro', '2016-02-24', 10, 7.00, 4),
(92, 'Makro', '2016-02-24', 18, 3.50, 7),
(93, 'Makro', '2016-02-24', 6, 4.50, 8),
(94, 'Makro', '2016-02-24', 6, 4.50, 6),
(95, 'Makro', '2016-02-24', 10, 5.00, 5),
(96, 'Makro', '2016-02-24', 15, 17.00, 2),
(97, 'Makro', '2016-02-24', 20, 7.00, 1),
(98, 'Makro', '2016-02-24', 15, 8.00, 10),
(99, 'HomeMade', '2016-02-25', 5, 3.00, 12),
(100, 'HomeMade', '2016-02-26', 2, 20.00, 11),
(101, 'HomeMade', '2016-02-26', 5, 3.00, 12),
(102, 'Joe Spaza Shop', '2016-02-26', 1, 11.00, 3),
(103, 'Joe Spaza Shop', '2016-02-26', 2, 6.50, 6),
(104, 'Joe Spaza Shop', '2016-02-26', 1, 8.50, 5),
(105, 'Joe Spaza Shop', '2016-02-26', 1, 30.00, 9),
(106, 'Epping Market', '2016-02-27', 10, 1.00, 13),
(107, 'Epping Market', '2016-02-27', 60, 1.50, 14),
(108, 'HomeMade', '2016-02-27', 5, 20.00, 11),
(109, 'HomeMade', '2016-02-27', 5, 3.00, 12),
(110, 'Makro', '2016-02-27', 20, 9.00, 3),
(111, 'Makro', '2016-02-27', 15, 7.00, 4),
(112, 'Makro', '2016-02-27', 24, 3.50, 7),
(113, 'Makro', '2016-02-27', 12, 4.50, 8),
(114, 'Makro', '2016-02-27', 12, 4.50, 6),
(115, 'Makro', '2016-02-27', 15, 5.00, 5),
(116, 'Makro', '2016-02-27', 15, 17.00, 2),
(117, 'Makro', '2016-02-27', 10, 20.00, 9),
(118, 'Makro', '2016-02-27', 20, 7.00, 1),
(119, 'Makro', '2016-02-27', 15, 8.00, 10);

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=432 ;

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
(10, '2016-02-01', 10, 2, 12.00),
(11, '2016-02-01', 11, 1, 30.00),
(12, '2016-02-01', 12, 0, 6.00),
(13, '2016-02-01', 13, 3, 2.00),
(14, '2016-02-01', 14, 5, 2.00),
(15, '2016-02-01', 15, 9, 3.00),
(16, '2016-02-02', 1, 4, 10.00),
(17, '2016-02-02', 2, 4, 25.00),
(18, '2016-02-02', 3, 5, 12.00),
(19, '2016-02-02', 4, 4, 10.00),
(20, '2016-02-02', 5, 5, 9.00),
(21, '2016-02-02', 6, 5, 6.00),
(22, '2016-02-02', 7, 8, 6.00),
(23, '2016-02-02', 8, 4, 7.00),
(24, '2016-02-02', 9, 5, 30.00),
(25, '2016-02-02', 10, 3, 12.00),
(26, '2016-02-02', 11, 0, 30.00),
(27, '2016-02-02', 12, 2, 6.00),
(28, '2016-02-02', 13, 0, 2.00),
(29, '2016-02-02', 14, 0, 2.00),
(30, '2016-02-02', 15, 0, 3.00),
(31, '2016-02-03', 1, 7, 10.00),
(32, '2016-02-03', 2, 4, 25.00),
(33, '2016-02-03', 3, 7, 12.00),
(34, '2016-02-03', 4, 4, 10.00),
(35, '2016-02-03', 5, 2, 9.00),
(36, '2016-02-03', 6, 5, 6.00),
(37, '2016-02-03', 7, 8, 6.00),
(38, '2016-02-03', 8, 3, 7.00),
(39, '2016-02-03', 9, 3, 30.00),
(40, '2016-02-03', 10, 3, 12.00),
(41, '2016-02-03', 11, 0, 30.00),
(42, '2016-02-03', 12, 2, 6.00),
(43, '2016-02-03', 13, 10, 2.00),
(44, '2016-02-03', 14, 8, 2.00),
(45, '2016-02-03', 15, 15, 2.00),
(46, '2016-02-04', 1, 5, 10.00),
(47, '2016-02-04', 2, 8, 25.00),
(48, '2016-02-04', 3, 8, 12.00),
(49, '2016-02-04', 4, 2, 10.00),
(50, '2016-02-04', 5, 0, 9.00),
(51, '2016-02-04', 6, 7, 6.00),
(52, '2016-02-04', 7, 12, 6.00),
(53, '2016-02-04', 8, 2, 7.00),
(54, '2016-02-04', 9, 1, 30.00),
(55, '2016-02-04', 10, 4, 12.00),
(56, '2016-02-04', 11, 1, 30.00),
(57, '2016-02-04', 12, 3, 6.00),
(58, '2016-02-04', 13, 16, 2.00),
(59, '2016-02-04', 14, 8, 2.00),
(60, '2016-02-04', 15, 12, 2.00),
(61, '2016-02-05', 1, 10, 10.00),
(62, '2016-02-05', 2, 3, 25.00),
(63, '2016-02-05', 3, 12, 12.00),
(64, '2016-02-05', 4, 3, 10.00),
(65, '2016-02-05', 5, 6, 9.00),
(66, '2016-02-05', 6, 3, 6.00),
(67, '2016-02-05', 7, 9, 6.00),
(68, '2016-02-05', 8, 8, 7.00),
(69, '2016-02-05', 9, 2, 30.00),
(70, '2016-02-05', 10, 1, 12.00),
(71, '2016-02-05', 11, 0, 30.00),
(72, '2016-02-05', 12, 1, 6.00),
(73, '2016-02-05', 13, 8, 2.00),
(74, '2016-02-05', 14, 12, 2.00),
(75, '2016-02-05', 15, 5, 3.00),
(76, '2016-02-06', 1, 6, 10.00),
(77, '2016-02-06', 2, 4, 25.00),
(78, '2016-02-06', 3, 7, 12.00),
(79, '2016-02-06', 4, 5, 10.00),
(80, '2016-02-06', 5, 2, 9.00),
(81, '2016-02-06', 6, 7, 6.00),
(82, '2016-02-06', 7, 8, 6.00),
(83, '2016-02-06', 8, 3, 7.00),
(84, '2016-02-06', 9, 6, 30.00),
(85, '2016-02-06', 10, 8, 12.00),
(86, '2016-02-06', 11, 1, 30.00),
(87, '2016-02-06', 12, 3, 6.00),
(88, '2016-02-06', 13, 2, 2.00),
(89, '2016-02-06', 14, 0, 2.00),
(90, '2016-02-06', 15, 5, 3.00),
(91, '2016-02-07', 1, 4, 10.00),
(92, '2016-02-07', 2, 6, 25.00),
(93, '2016-02-07', 3, 4, 12.00),
(94, '2016-02-07', 4, 2, 10.00),
(95, '2016-02-07', 5, 0, 9.00),
(96, '2016-02-07', 6, 3, 6.00),
(97, '2016-02-07', 7, 7, 6.00),
(98, '2016-02-07', 8, 0, 7.00),
(99, '2016-02-07', 9, 0, 30.00),
(100, '2016-02-07', 10, 1, 12.00),
(101, '2016-02-07', 11, 0, 30.00),
(102, '2016-02-07', 12, 1, 6.00),
(103, '2016-02-07', 13, 8, 2.00),
(104, '2016-02-07', 14, 3, 2.00),
(105, '2016-02-07', 15, 3, 3.00),
(106, '2016-02-08', 2, 2, 25.00),
(107, '2016-02-08', 3, 2, 12.00),
(108, '2016-02-08', 4, 1, 10.00),
(109, '2016-02-08', 5, 0, 9.00),
(110, '2016-02-08', 6, 4, 6.00),
(111, '2016-02-08', 7, 4, 6.00),
(112, '2016-02-08', 8, 1, 7.00),
(113, '2016-02-08', 9, 1, 30.00),
(114, '2016-02-08', 10, 2, 12.00),
(115, '2016-02-08', 11, 0, 30.00),
(116, '2016-02-08', 12, 1, 6.00),
(117, '2016-02-08', 13, 5, 2.00),
(118, '2016-02-08', 14, 2, 2.00),
(119, '2016-02-08', 15, 9, 3.00),
(120, '2016-02-09', 1, 3, 10.00),
(121, '2016-02-09', 2, 6, 25.00),
(122, '2016-02-09', 3, 7, 12.00),
(123, '2016-02-09', 4, 5, 10.00),
(124, '2016-02-09', 5, 6, 9.00),
(125, '2016-02-09', 6, 3, 6.00),
(126, '2016-02-09', 7, 8, 6.00),
(127, '2016-02-09', 8, 5, 7.00),
(128, '2016-02-09', 9, 2, 30.00),
(129, '2016-02-09', 10, 1, 12.00),
(130, '2016-02-09', 11, 0, 30.00),
(131, '2016-02-09', 12, 0, 6.00),
(132, '2016-02-09', 13, 5, 2.00),
(133, '2016-02-09', 14, 0, 2.00),
(134, '2016-02-09', 15, 3, 3.00),
(135, '2016-02-10', 1, 5, 10.00),
(136, '2016-02-10', 2, 4, 25.00),
(137, '2016-02-10', 3, 2, 12.00),
(138, '2016-02-10', 4, 0, 10.00),
(139, '2016-02-10', 5, 0, 9.00),
(140, '2016-02-10', 6, 1, 6.00),
(141, '2016-02-10', 7, 3, 6.00),
(142, '2016-02-10', 8, 2, 7.00),
(143, '2016-02-10', 9, 1, 30.00),
(144, '2016-02-10', 10, 3, 12.00),
(145, '2016-02-10', 11, 1, 30.00),
(146, '2016-02-10', 12, 0, 6.00),
(147, '2016-02-10', 13, 3, 2.00),
(148, '2016-02-10', 14, 2, 2.00),
(149, '2016-02-10', 15, 7, 2.00),
(150, '2016-02-10', 16, 3, 35.00),
(151, '2016-02-10', 17, 1, 15.00),
(152, '2016-02-11', 1, 5, 10.00),
(153, '2016-02-11', 2, 4, 25.00),
(154, '2016-02-11', 3, 3, 12.00),
(155, '2016-02-11', 4, 2, 10.00),
(156, '2016-02-11', 5, 1, 9.00),
(157, '2016-02-11', 6, 2, 6.00),
(158, '2016-02-11', 7, 3, 6.00),
(159, '2016-02-11', 8, 1, 7.00),
(160, '2016-02-11', 9, 0, 30.00),
(161, '2016-02-11', 10, 2, 12.00),
(162, '2016-02-11', 11, 1, 30.00),
(163, '2016-02-11', 12, 0, 6.00),
(164, '2016-02-11', 13, 4, 2.00),
(165, '2016-02-11', 14, 3, 2.00),
(166, '2016-02-11', 15, 8, 2.00),
(167, '2016-02-11', 16, 5, 35.00),
(168, '2016-02-11', 17, 3, 15.00),
(169, '2016-02-12', 1, 3, 10.00),
(170, '2016-02-12', 2, 9, 25.00),
(171, '2016-02-12', 3, 2, 12.00),
(172, '2016-02-12', 4, 3, 10.00),
(173, '2016-02-12', 5, 1, 9.00),
(174, '2016-02-12', 6, 0, 6.00),
(175, '2016-02-12', 7, 2, 6.00),
(176, '2016-02-12', 8, 1, 7.00),
(177, '2016-02-12', 9, 0, 30.00),
(178, '2016-02-12', 10, 2, 12.00),
(179, '2016-02-12', 11, 0, 30.00),
(180, '2016-02-12', 12, 2, 6.00),
(181, '2016-02-12', 13, 2, 2.00),
(182, '2016-02-12', 14, 3, 2.00),
(183, '2016-02-12', 15, 3, 3.00),
(184, '2016-02-12', 16, 2, 35.00),
(185, '2016-02-12', 18, 6, 4.00),
(186, '2016-02-12', 17, 2, 15.00),
(187, '2016-02-13', 1, 6, 10.00),
(188, '2016-02-13', 2, 6, 25.00),
(189, '2016-02-13', 3, 5, 12.00),
(190, '2016-02-13', 4, 7, 10.00),
(191, '2016-02-13', 5, 15, 9.00),
(192, '2016-02-13', 6, 6, 6.00),
(193, '2016-02-13', 7, 8, 6.00),
(194, '2016-02-13', 8, 4, 7.00),
(195, '2016-02-13', 9, 3, 30.00),
(196, '2016-02-13', 10, 4, 12.00),
(197, '2016-02-13', 11, 4, 30.00),
(198, '2016-02-13', 12, 2, 6.00),
(199, '2016-02-13', 13, 4, 2.00),
(200, '2016-02-13', 14, 2, 2.00),
(201, '2016-02-13', 15, 6, 3.00),
(202, '2016-02-13', 16, 10, 35.00),
(203, '2016-02-13', 18, 5, 4.00),
(204, '2016-02-13', 17, 7, 15.00),
(205, '2016-02-14', 1, 6, 10.00),
(206, '2016-02-14', 2, 5, 25.00),
(207, '2016-02-14', 3, 7, 12.00),
(208, '2016-02-14', 4, 3, 10.00),
(209, '2016-02-14', 5, 4, 9.00),
(210, '2016-02-14', 6, 7, 6.00),
(211, '2016-02-14', 7, 14, 6.00),
(212, '2016-02-14', 8, 8, 7.00),
(213, '2016-02-14', 9, 3, 30.00),
(214, '2016-02-14', 10, 7, 12.00),
(215, '2016-02-14', 11, 0, 30.00),
(216, '2016-02-14', 12, 0, 6.00),
(217, '2016-02-14', 13, 5, 2.00),
(218, '2016-02-14', 14, 9, 2.00),
(219, '2016-02-14', 15, 18, 3.00),
(220, '2016-02-14', 16, 0, 35.00),
(221, '2016-02-14', 18, 3, 4.00),
(222, '2016-02-14', 17, 1, 15.00),
(223, '2016-02-15', 2, 2, 25.00),
(224, '2016-02-15', 3, 1, 12.00),
(225, '2016-02-15', 4, 3, 10.00),
(226, '2016-02-15', 5, 0, 9.00),
(227, '2016-02-15', 6, 5, 6.00),
(228, '2016-02-15', 7, 4, 6.00),
(229, '2016-02-15', 8, 2, 7.00),
(230, '2016-02-15', 9, 0, 30.00),
(231, '2016-02-15', 10, 1, 12.00),
(232, '2016-02-15', 11, 0, 30.00),
(233, '2016-02-15', 12, 1, 6.00),
(234, '2016-02-15', 13, 1, 2.00),
(235, '2016-02-15', 14, 1, 2.00),
(236, '2016-02-15', 15, 3, 3.00),
(237, '2016-02-16', 1, 7, 10.00),
(238, '2016-02-16', 2, 6, 25.00),
(239, '2016-02-16', 3, 4, 12.00),
(240, '2016-02-16', 4, 3, 10.00),
(241, '2016-02-16', 5, 2, 9.00),
(242, '2016-02-16', 6, 2, 6.00),
(243, '2016-02-16', 7, 1, 6.00),
(244, '2016-02-16', 8, 2, 7.00),
(245, '2016-02-16', 9, 2, 30.00),
(246, '2016-02-16', 10, 1, 12.00),
(247, '2016-02-16', 11, 0, 30.00),
(248, '2016-02-16', 12, 2, 6.00),
(249, '2016-02-16', 13, 2, 2.00),
(250, '2016-02-16', 14, 3, 2.00),
(251, '2016-02-16', 15, 5, 3.00),
(252, '2016-02-17', 1, 8, 10.00),
(253, '2016-02-17', 2, 6, 25.00),
(254, '2016-02-17', 3, 3, 12.00),
(255, '2016-02-17', 4, 0, 10.00),
(256, '2016-02-17', 5, 0, 9.00),
(257, '2016-02-17', 6, 0, 6.00),
(258, '2016-02-17', 7, 2, 6.00),
(259, '2016-02-17', 8, 0, 7.00),
(260, '2016-02-17', 9, 1, 30.00),
(261, '2016-02-17', 10, 2, 12.00),
(262, '2016-02-17', 11, 0, 30.00),
(263, '2016-02-17', 12, 1, 6.00),
(264, '2016-02-17', 13, 2, 2.00),
(265, '2016-02-17', 14, 6, 2.00),
(266, '2016-02-17', 15, 5, 2.00),
(267, '2016-02-18', 1, 3, 10.00),
(268, '2016-02-18', 2, 5, 25.00),
(269, '2016-02-18', 3, 5, 12.00),
(270, '2016-02-18', 4, 1, 10.00),
(271, '2016-02-18', 5, 0, 9.00),
(272, '2016-02-18', 6, 0, 6.00),
(273, '2016-02-18', 7, 3, 6.00),
(274, '2016-02-18', 8, 2, 7.00),
(275, '2016-02-18', 9, 1, 30.00),
(276, '2016-02-18', 10, 1, 12.00),
(277, '2016-02-18', 11, 1, 30.00),
(278, '2016-02-18', 12, 1, 6.00),
(279, '2016-02-18', 13, 1, 2.00),
(280, '2016-02-18', 14, 3, 2.00),
(281, '2016-02-18', 15, 2, 2.00),
(282, '2016-02-19', 1, 5, 10.00),
(283, '2016-02-19', 2, 3, 25.00),
(284, '2016-02-19', 3, 5, 12.00),
(285, '2016-02-19', 4, 2, 10.00),
(286, '2016-02-19', 5, 1, 9.00),
(287, '2016-02-19', 6, 1, 6.00),
(288, '2016-02-19', 7, 1, 6.00),
(289, '2016-02-19', 8, 0, 7.00),
(290, '2016-02-19', 9, 0, 30.00),
(291, '2016-02-19', 10, 2, 12.00),
(292, '2016-02-19', 11, 2, 30.00),
(293, '2016-02-19', 12, 0, 6.00),
(294, '2016-02-19', 13, 3, 2.00),
(295, '2016-02-19', 14, 5, 2.00),
(296, '2016-02-19', 15, 4, 3.00),
(297, '2016-02-20', 1, 4, 10.00),
(298, '2016-02-20', 2, 2, 25.00),
(299, '2016-02-20', 3, 3, 12.00),
(300, '2016-02-20', 4, 5, 10.00),
(301, '2016-02-20', 5, 3, 9.00),
(302, '2016-02-20', 6, 3, 6.00),
(303, '2016-02-20', 7, 5, 6.00),
(304, '2016-02-20', 8, 6, 7.00),
(305, '2016-02-20', 9, 0, 30.00),
(306, '2016-02-20', 10, 3, 12.00),
(307, '2016-02-20', 11, 1, 30.00),
(308, '2016-02-20', 12, 3, 6.00),
(309, '2016-02-20', 13, 6, 2.00),
(310, '2016-02-20', 14, 4, 2.00),
(311, '2016-02-20', 15, 8, 3.00),
(312, '2016-02-21', 1, 1, 10.00),
(313, '2016-02-21', 2, 1, 25.00),
(314, '2016-02-21', 3, 3, 12.00),
(315, '2016-02-21', 4, 3, 10.00),
(316, '2016-02-21', 5, 2, 9.00),
(317, '2016-02-21', 6, 3, 6.00),
(318, '2016-02-21', 7, 2, 6.00),
(319, '2016-02-21', 8, 0, 7.00),
(320, '2016-02-21', 9, 0, 30.00),
(321, '2016-02-21', 10, 2, 12.00),
(322, '2016-02-21', 11, 0, 30.00),
(323, '2016-02-21', 12, 0, 6.00),
(324, '2016-02-21', 13, 2, 2.00),
(325, '2016-02-21', 14, 3, 2.00),
(326, '2016-02-21', 15, 2, 3.00),
(327, '2016-02-22', 2, 2, 25.00),
(328, '2016-02-22', 3, 3, 12.00),
(329, '2016-02-22', 4, 0, 10.00),
(330, '2016-02-22', 5, 1, 9.00),
(331, '2016-02-22', 6, 2, 6.00),
(332, '2016-02-22', 7, 0, 6.00),
(333, '2016-02-22', 8, 0, 7.00),
(334, '2016-02-22', 9, 0, 30.00),
(335, '2016-02-22', 10, 0, 12.00),
(336, '2016-02-22', 11, 0, 30.00),
(337, '2016-02-22', 12, 1, 6.00),
(338, '2016-02-22', 13, 0, 2.00),
(339, '2016-02-22', 14, 1, 2.00),
(340, '2016-02-22', 15, 3, 3.00),
(341, '2016-02-23', 1, 8, 10.00),
(342, '2016-02-23', 2, 6, 25.00),
(343, '2016-02-23', 3, 2, 12.00),
(344, '2016-02-23', 4, 2, 10.00),
(345, '2016-02-23', 5, 1, 9.00),
(346, '2016-02-23', 6, 1, 6.00),
(347, '2016-02-23', 7, 3, 6.00),
(348, '2016-02-23', 8, 0, 7.00),
(349, '2016-02-23', 9, 2, 30.00),
(350, '2016-02-23', 10, 1, 12.00),
(351, '2016-02-23', 11, 0, 30.00),
(352, '2016-02-23', 12, 0, 6.00),
(353, '2016-02-23', 13, 2, 2.00),
(354, '2016-02-23', 14, 1, 2.00),
(355, '2016-02-23', 15, 3, 3.00),
(356, '2016-02-24', 1, 4, 10.00),
(357, '2016-02-24', 2, 2, 25.00),
(358, '2016-02-24', 3, 6, 12.00),
(359, '2016-02-24', 4, 1, 10.00),
(360, '2016-02-24', 5, 2, 9.00),
(361, '2016-02-24', 6, 1, 6.00),
(362, '2016-02-24', 7, 2, 6.00),
(363, '2016-02-24', 8, 1, 7.00),
(364, '2016-02-24', 9, 1, 30.00),
(365, '2016-02-24', 10, 2, 12.00),
(366, '2016-02-24', 11, 0, 30.00),
(367, '2016-02-24', 12, 1, 6.00),
(368, '2016-02-24', 13, 5, 2.00),
(369, '2016-02-24', 14, 3, 2.00),
(370, '2016-02-24', 15, 7, 2.00),
(371, '2016-02-25', 1, 8, 10.00),
(372, '2016-02-25', 2, 6, 25.00),
(373, '2016-02-25', 3, 7, 12.00),
(374, '2016-02-25', 4, 5, 10.00),
(375, '2016-02-25', 5, 4, 9.00),
(376, '2016-02-25', 6, 6, 6.00),
(377, '2016-02-25', 7, 8, 6.00),
(378, '2016-02-25', 8, 5, 7.00),
(379, '2016-02-25', 9, 3, 30.00),
(380, '2016-02-25', 10, 7, 12.00),
(381, '2016-02-25', 11, 1, 30.00),
(382, '2016-02-25', 12, 4, 6.00),
(383, '2016-02-25', 13, 2, 2.00),
(384, '2016-02-25', 14, 8, 2.00),
(385, '2016-02-25', 15, 5, 2.00),
(386, '2016-02-26', 1, 8, 10.00),
(387, '2016-02-26', 2, 8, 25.00),
(388, '2016-02-26', 3, 5, 12.00),
(389, '2016-02-26', 4, 3, 10.00),
(390, '2016-02-26', 5, 7, 9.00),
(391, '2016-02-26', 6, 3, 6.00),
(392, '2016-02-26', 7, 7, 6.00),
(393, '2016-02-26', 8, 4, 7.00),
(394, '2016-02-26', 9, 3, 30.00),
(395, '2016-02-26', 10, 8, 12.00),
(396, '2016-02-26', 11, 0, 30.00),
(397, '2016-02-26', 12, 3, 6.00),
(398, '2016-02-26', 13, 2, 2.00),
(399, '2016-02-26', 14, 3, 2.00),
(400, '2016-02-26', 15, 1, 3.00),
(401, '2016-02-27', 1, 8, 10.00),
(402, '2016-02-27', 2, 5, 25.00),
(403, '2016-02-27', 3, 3, 12.00),
(404, '2016-02-27', 4, 12, 10.00),
(405, '2016-02-27', 5, 9, 9.00),
(406, '2016-02-27', 6, 6, 6.00),
(407, '2016-02-27', 7, 18, 6.00),
(408, '2016-02-27', 8, 3, 7.00),
(409, '2016-02-27', 9, 4, 30.00),
(410, '2016-02-27', 10, 12, 12.00),
(411, '2016-02-27', 11, 5, 30.00),
(412, '2016-02-27', 12, 3, 6.00),
(413, '2016-02-27', 13, 1, 2.00),
(414, '2016-02-27', 14, 3, 2.00),
(415, '2016-02-27', 15, 1, 3.00),
(416, '2016-02-28', 1, 3, 10.00),
(417, '2016-02-28', 2, 2, 25.00),
(418, '2016-02-28', 3, 4, 12.00),
(419, '2016-02-28', 4, 5, 10.00),
(420, '2016-02-28', 5, 6, 9.00),
(421, '2016-02-28', 6, 3, 6.00),
(422, '2016-02-28', 7, 4, 6.00),
(423, '2016-02-28', 8, 6, 7.00),
(424, '2016-02-28', 9, 2, 30.00),
(425, '2016-02-28', 10, 9, 12.00),
(426, '2016-02-28', 11, 4, 30.00),
(427, '2016-02-28', 12, 7, 6.00),
(428, '2016-02-28', 13, 6, 2.00),
(429, '2016-02-28', 14, 8, 2.00),
(430, '2016-02-28', 15, 8, 3.00),
(431, '2016-06-01', 1, 8, 5.00);

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
