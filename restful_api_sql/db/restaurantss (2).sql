-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2023 at 04:10 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurantss`
--

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `imageURL` varchar(255) NOT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`id`, `name`, `type`, `imageURL`, `createdAt`, `updatedAt`) VALUES
(1, 'McDonald\'s (แมคโดนัลด์) - ราชดำเนิน', 'แฮมเบอร์เกอร์, ไก่ทอด, ฟาสต์ฟู้ด', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/AWh64KYIZXYdMpch2Zem/hero/f193b34375f84a0fb1b2b58e4320be3f_1688317413588921068.webp', NULL, NULL),
(2, 'Subway (ซับเวย์) - ท่ามหาราช', 'ฟาสต์ฟู้ด', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CZCFHAATNRDJCN/hero/cf9cde3520c44514a6b4cf9e18593be5_1690738298283118585.webp', NULL, '2023-08-13'),
(3, 'KFC (เคเอฟซี) - คลองถม', 'ไก่ทอด, ฟาสต์ฟู้ด', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CY2UVUWFHBUUAJ/hero/274382d3fbe34db4879377541b4f1252_1690738233226265227.webp', NULL, '2023-08-13'),
(4, 'Burger King (เบอร์เกอร์ คิง) - จักรพงษ์', 'แฮมเบอร์เกอร์, สเต็ก, ไก่ทอด', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2DKRBKGC3B3MA/hero/1ddc503777ca4c3bbcbbd41917d6186f_1688317420468055794.webp', NULL, NULL),
(5, 'Shinkanzen Sushi (ชินคันเซ็น ซูชิ) - เมเจอร์ ปิ่นเกล้า', 'อาหารตามสั่ง', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C34HVY4HJGDWL2/hero/dcd1568122b842da980f3224449f4ff7_1688317407364289751.webp', NULL, NULL),
(6, 'The Pizza Company (เดอะพิซซ่า คอมปะนี) - ถนนราชบพิธ', 'Coupon, พิซซ่า, ไก่ทอด, ฟาสต์ฟู้ด', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CYVZR7JCBFLWCE/hero/d4e4e7b724e64c62998d98a52e47bd1d_1690738314417110585.webp', NULL, '2023-08-13'),
(7, 'Potato Corner (โปเตโต้ คอร์เนอร์) - ถนนข้าวสาร', 'ทานเล่น/ขนมขบเคี้ยว, ไก่ทอด', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CZLJEVDYC3JFL6/hero/6d978d05b18440d5b61b7a51da47ac9c_1690996190458861088.webp', '2023-07-19', '2023-08-13'),
(8, 'Yayoi Japanese Restaurant (ยาโยอิ) - สยามเซ็นเตอร์', 'สเต็ก, อาหารตามสั่ง, ราเมน', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CZCUANVECNMWLE/hero/06279e06eeba46f393d8403307f16571_1690738324265824825.webp', '2023-08-13', '2023-08-13'),
(9, 'MK Restaurants (เอ็มเค เรสโตรองต์) - เอ็มเคโกลด์ สยามพารากอน', 'ชาบู/สุกี้', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-C2TCV6C2VTB3AE/hero/3ea4b89cac7544b1ba8a70730fe68f01_1690738290817931048.webp', '2023-08-13', '2023-08-13'),
(10, 'Sukishi Korean Charcoal Grill (ซูกิชิ) - เซ็นทรัลเวิลด์', 'ปิ้งย่าง/บาร์บีคิว, Coupon', 'https://d1sag4ddilekf6.cloudfront.net/compressed_webp/merchants/3-CYKURAMHL36EEA/hero/38cb3c66103d464b980ab0673cfdd087_1690738284123254456.webp', '2023-08-13', '2023-08-13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
