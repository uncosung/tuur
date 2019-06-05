-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 05, 2019 at 01:44 AM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tuur_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `tuuristId` mediumint(8) UNSIGNED NOT NULL,
  `packageId` mediumint(8) UNSIGNED NOT NULL,
  `bookedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `package`
--

CREATE TABLE `package` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `tags` json NOT NULL,
  `location` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `timeRange` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `dates` json NOT NULL,
  `mainImage` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `images` json NOT NULL,
  `profileEmail` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `package`
--

INSERT INTO `package` (`id`, `title`, `description`, `tags`, `location`, `timeRange`, `dates`, `mainImage`, `images`, `profileEmail`) VALUES
(3, 'Coding bootcamp!', 'Come learn to code with some of the best and brightest programmers in all of Southern California! Pizza will be provided whether you want it or not.', '[]', 'Irvine, California', '8', '\"[\'2019/01/01\', \'2019/12/31\']\"', 'https://s.newsweek.com/sites/www.newsweek.com/files/styles/lg/public/2016/08/24/profile-graphic-final.jpg', '[]', 'dPaschal@gmail.com'),
(4, 'Board Games!', 'Come play some board games that you will definitely NOT have to recreate during a hackathon. With such classics like Chariot Races, FrogRiders, The River, Spice Road, and many more! ', '[]', 'Irvine, California', '8', '\"[\'2019/01/01\', \'2019/12/31\']\"', 'https://www.sciencenews.org/sites/default/files/2018/11/main/articles/112418_reviews_feat.jpg', '[]', 'dPaschal@gmail.com'),
(5, 'XTREME JAZZ', 'LEARN JAZZ THE XTREME WAY', '[]', 'Irvine, California', '8', '\"[\'2019/01/01\', \'2019/12/31\']\"', 'https://i.kym-cdn.com/photos/images/facebook/001/319/290/e30.jpg', '[]', 'dPaschal@gmail.com'),
(9, 'Underwater Basket Weaving', 'Do you like water? Do you like baskets? Combine both of your greatest loves in this amazing tuur!', '[\"Activities\"]', 'Under the sea', '12 hours', '[]', 'https://i.ytimg.com/vi/Z6tf5l_6zJw/maxresdefault.jpg', '[\"https://i.ytimg.com/vi/Z6tf5l_6zJw/maxresdefault.jpg\"]', 'dPaschal@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `location` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `bio` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `isGuide` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `name`, `email`, `location`, `bio`, `image`, `isGuide`) VALUES
(1, 'Tim Davis', 'timD@gmail.com', 'Irvine, CA, USA', 'Hi, I\'m Tim and I like to code things. My brain is very big.', 'https://learningfuze.com/blog/wp-content/uploads/2019/04/tim-davis-768x511.jpg', 1),
(2, 'Dan Paschal', 'dPaschal@gmail.com', 'Irvine, California', 'I like coding. My brain very BIG', 'https://media.licdn.com/dms/image/C5603AQFiKTbjzrtv9w/profile-displayphoto-shrink_800_800/0?e=1564617600&v=beta&t=Ha2WaiFztxfCyO6qJI4mdfUIpR2JhqBFicdHZFtn-U8', 1),
(3, 'Tim Horist', 'timH@gmail.com', 'Irvine, CA', 'I like to code. My brain big.', 'https://media.licdn.com/dms/image/C5603AQFCMXpqJ3VSSw/profile-displayphoto-shrink_800_800/0?e=1564617600&v=beta&t=BPCCBPKyERexc5bFATlMWv7ohsiYerNKSqCUlxc3vFs', 0),
(24, 'Big Jim', 'bigjim@gmail.com', 'Kentucky', 'I like moonshine', 'http://www.hillbillysillyscience.com/resources/ohio.jpg.opt424x442o0%2C0s424x442.jpg', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `package`
--
ALTER TABLE `package`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `package`
--
ALTER TABLE `package`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` mediumint(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
