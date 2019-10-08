-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 27, 2019 at 03:22 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tax_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `tax_id`) VALUES
(1, 'candy', 3),
(2, 'coffee', 3),
(4, 'popcorn', 3),
(5, 'meat', 1),
(6, 'toys', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `total` float NOT NULL,
  `taxes` float NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `status`, `total`, `taxes`, `created_at`) VALUES
(1, 'in progress', 0, 0, '2019-09-10 13:27:13'),
(2, 'pending', 0, 0, '2019-09-10 13:30:18'),
(36897199, 'pending', 104, 12, '2019-09-17 16:14:57'),
(37475664, 'pending', 388, 42, '2019-09-17 16:24:35'),
(95551695, 'pending', 180, 23, '2019-09-18 08:32:31'),
(95762705, 'pending', 12, 1.8, '2019-09-18 08:36:02'),
(96474675, 'pending', 80, 8, '2019-09-18 08:47:54'),
(96682589, 'pending', 111, 0, '2019-09-18 08:51:22');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`) VALUES
(1, 1, 2),
(2, 3, 1),
(2, 7, 1),
(2, 7, 1),
(2, 1, 1),
(36897199, 1, 2),
(36897199, 3, 1),
(37475664, 3, 2),
(37475664, 7, 2),
(37475664, 1, 1),
(95551695, 1, 6),
(95551695, 3, 1),
(95551695, 7, 1),
(95762705, 1, 1),
(96474675, 3, 1),
(96682589, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `category_id`, `type_id`, `created_at`) VALUES
(1, 'chiken', 12, 5, 1, '2019-09-10'),
(2, '16lb bag of Skittles', 111, 1, 2, '2019-09-10'),
(3, 'Lego Pirates', 80, 6, 2, '2019-09-10'),
(7, 'Water pistol', 28, 6, 1, '2019-09-10');

-- --------------------------------------------------------

--
-- Table structure for table `taxes`
--

CREATE TABLE `taxes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `percentage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `taxes`
--

INSERT INTO `taxes` (`id`, `name`, `percentage`) VALUES
(1, 'standard', 10),
(2, 'imported', 5),
(3, 'empty', 0);

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `tax_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `name`, `tax_id`) VALUES
(1, 'imported', 2),
(2, 'standard', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_taxes` (`tax_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `order_items_ibfk_2` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category_id`),
  ADD KEY `types` (`type_id`);

--
-- Indexes for table `taxes`
--
ALTER TABLE `taxes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_tax` (`tax_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96682590;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `category_taxes` FOREIGN KEY (`tax_id`) REFERENCES `taxes` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `types` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`);

--
-- Constraints for table `types`
--
ALTER TABLE `types`
  ADD CONSTRAINT `type_tax` FOREIGN KEY (`tax_id`) REFERENCES `taxes` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
