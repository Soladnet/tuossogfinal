-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 06, 2013 at 06:27 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gossoutdb`
--
CREATE DATABASE `gossoutdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `gossoutdb`;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `post_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` varchar(9) NOT NULL DEFAULT 'show',
  `deleteStatus` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`post_id`,`sender_id`),
  UNIQUE KEY `id` (`id`),
  KEY `post_id` (`post_id`),
  KEY `sender_id` (`sender_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `comment`, `post_id`, `sender_id`, `time`, `status`, `deleteStatus`) VALUES
(40, 'yeah...I know you''re dude!', 1325, 11, '2013-04-06 18:08:45', 'show', 0);

-- --------------------------------------------------------

--
-- Table structure for table `community`
--

CREATE TABLE IF NOT EXISTS `community` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_name` varchar(90) NOT NULL,
  `name` varchar(120) NOT NULL,
  `category` text NOT NULL,
  `type` varchar(7) NOT NULL DEFAULT 'Public',
  `description` text NOT NULL,
  `pix` text NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name` (`unique_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `community`
--

INSERT INTO `community` (`id`, `unique_name`, `name`, `category`, `type`, `description`, `pix`, `datecreated`) VALUES
(1, 'abu', 'Ahmadu Bello University, Zaria, Nigeria', '', 'Private', 'Ahmadu bello university is the leading university in the northern part of Nigeria. It was established in the year 2000 in zaria Kaduna with six (6) faculty ready for degree programme', 'upload/images/abusite.jpg', '2013-03-19 22:12:34'),
(2, 'nou', 'National Open University of Nigeria, NOUN, Lagos', '', 'Public', 'Open University in Lagos state, Nigeria', 'upload/images/community2.jpg', '2013-03-19 22:43:51');

-- --------------------------------------------------------

--
-- Table structure for table `community_subscribers`
--

CREATE TABLE IF NOT EXISTS `community_subscribers` (
  `user` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `emailNotif` varchar(3) NOT NULL DEFAULT 'YES',
  `datejoined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user`,`community_id`),
  KEY `community_id` (`community_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `community_subscribers`
--

INSERT INTO `community_subscribers` (`user`, `community_id`, `emailNotif`, `datejoined`) VALUES
(11, 1, 'YES', '2013-04-05 16:49:41'),
(12, 1, 'YES', '2013-03-20 12:30:44'),
(13, 1, 'YES', '2013-03-29 14:29:54'),
(13, 2, 'YES', '2013-03-29 14:30:46');

-- --------------------------------------------------------

--
-- Table structure for table `password_recovery`
--

CREATE TABLE IF NOT EXISTS `password_recovery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(120) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `responded` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `pictureuploads`
--

CREATE TABLE IF NOT EXISTS `pictureuploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `original` text NOT NULL,
  `thumbnail` text NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `pictureuploads`
--

INSERT INTO `pictureuploads` (`id`, `user_id`, `original`, `thumbnail`, `date_added`) VALUES
(42, 11, 'upload/images/136370561711.jpg', 'upload/images/136378895711.jpg', '2013-03-19 15:06:57'),
(43, 12, 'upload/images/136378229312.jpg', 'upload/images/136378911712.jpg', '2013-03-20 12:24:53'),
(44, 13, 'upload/images/136405793313.jpg', 'upload/images/136405796513.jpg', '2013-03-23 16:58:53'),
(45, 17, 'upload/images/136498748317.jpg', 'upload/images/136498840117.jpg', '2013-04-03 11:11:23');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post` text NOT NULL,
  `community_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(10) NOT NULL DEFAULT 'Show',
  `deleteStatus` int(11) NOT NULL DEFAULT '0',
  UNIQUE KEY `id` (`id`),
  KEY `community_id` (`community_id`),
  KEY `sender_id` (`sender_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1326 ;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `post`, `community_id`, `sender_id`, `time`, `status`, `deleteStatus`) VALUES
(1323, 'Welcome to ABU Zaria', 1, 11, '2013-04-06 18:07:07', 'Show', 0),
(1324, 'This is what is called renovation! ', 1, 11, '2013-04-06 18:07:31', 'Show', 0),
(1325, 'I''m seeing things', 1, 11, '2013-04-06 18:08:13', 'Show', 0);

-- --------------------------------------------------------

--
-- Table structure for table `privatemessae`
--

CREATE TABLE IF NOT EXISTS `privatemessae` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`,`sender_id`,`receiver_id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=537 ;

--
-- Dumping data for table `privatemessae`
--

INSERT INTO `privatemessae` (`id`, `sender_id`, `receiver_id`, `message`, `time`, `status`) VALUES
(1, 12, 11, 'Hello World!', '2013-03-22 01:55:04', 'R'),
(463, 12, 11, 'Whats up?', '2013-03-23 17:07:21', 'R'),
(465, 11, 12, 'cool', '2013-03-26 16:09:12', 'R'),
(466, 13, 11, 'how are u doin today?', '2013-03-26 22:18:12', 'R'),
(467, 13, 11, 'Tesing this for real...Please check the Messages on the nav-user...it has a fix hight: the hight is not dynamic with respect to the hight', '2013-03-31 16:15:58', 'R'),
(468, 12, 11, 'guy', '2013-03-31 16:50:57', 'R'),
(469, 11, 12, 'this is a test!\nNow!', '2013-04-04 11:59:19', 'R'),
(488, 12, 11, 'sup dude....\naw are u doin\n\n\ncheers', '2013-04-04 17:05:00', 'R'),
(489, 11, 17, 'sending to test if its array', '2013-04-04 22:31:38', 'D'),
(526, 11, 13, 'Hello guy\n\n\nI''m here', '2013-04-05 10:33:02', 'N'),
(527, 11, 13, 'debug  this &lt;/div&gt;', '2013-04-05 10:33:22', 'N'),
(528, 11, 13, '&lt;strong&gt;HELLO&lt;/strong&gt;', '2013-04-05 10:33:59', 'N'),
(529, 11, 13, '&lt;strong&gt;hello&lt;/strong&gt;', '2013-04-05 10:35:59', 'N'),
(530, 11, 13, '&amp;', '2013-04-05 10:36:20', 'N'),
(531, 11, 12, 'i''m fine', '2013-04-05 10:43:00', 'N'),
(532, 11, 12, 'hey sup', '2013-04-06 12:15:25', 'N'),
(533, 11, 13, 'Hi sir,\nApplicaion for the post of secretary\ni''m pleased to apply for the post of secrestry in your organization...\n\n\nwaye mutu waye tashi\n\nThsnk\nYours'' sincerely', '2013-04-06 12:16:53', 'N'),
(534, 11, 17, 'Hey wale houe are u doing', '2013-04-06 12:22:13', 'D'),
(535, 11, 17, 'Hey wale houe are u doing', '2013-04-06 12:22:27', 'D'),
(536, 17, 11, 'i''m doing good', '2013-04-06 12:25:50', 'D');

-- --------------------------------------------------------

--
-- Table structure for table `profile_pix`
--

CREATE TABLE IF NOT EXISTS `profile_pix` (
  `pix_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  UNIQUE KEY `pix_id` (`pix_id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_login_details`
--

CREATE TABLE IF NOT EXISTS `user_login_details` (
  `id` int(11) NOT NULL,
  `password` varchar(100) NOT NULL,
  `activated` varchar(1) NOT NULL DEFAULT 'N',
  `token` text NOT NULL,
  `theme_id` int(11) NOT NULL DEFAULT '1',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_login_details`
--

INSERT INTO `user_login_details` (`id`, `password`, `activated`, `token`, `theme_id`) VALUES
(11, 'c59f6373c60b995970fd4acdc6ea9cb4', 'N', 'b8b0e32f4b987ce54f3b61b25fc1e244', 1),
(12, 'c59f6373c60b995970fd4acdc6ea9cb4', 'N', '602d4aba33b480eb2af805d99b75845a', 1),
(13, 'c59f6373c60b995970fd4acdc6ea9cb4', 'N', 'ec57ea4ed58b739475d2a47632ae3bf8', 1),
(17, 'c59f6373c60b995970fd4acdc6ea9cb4', 'N', 'c26935d1260e1c3a768dd30a732faacc', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_personal_info`
--

CREATE TABLE IF NOT EXISTS `user_personal_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(70) NOT NULL,
  `username` varchar(40) NOT NULL,
  `gender` varchar(1) NOT NULL,
  `dob` date NOT NULL,
  `dateJoined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` varchar(30) NOT NULL,
  `url` text NOT NULL,
  `relationship_status` varchar(50) NOT NULL,
  `bio` text NOT NULL,
  `favquote` text NOT NULL,
  `location` text NOT NULL,
  `likes` text NOT NULL,
  `dislikes` text NOT NULL,
  `works` text NOT NULL,
  `agreement` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`email`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `user_personal_info`
--

INSERT INTO `user_personal_info` (`id`, `firstname`, `lastname`, `email`, `username`, `gender`, `dob`, `dateJoined`, `phone`, `url`, `relationship_status`, `bio`, `favquote`, `location`, `likes`, `dislikes`, `works`, `agreement`) VALUES
(11, 'Soladoye', 'Abdulrasheed', 'soladnet@gmail.com', 'soladnet', 'M', '1988-01-30', '2013-03-20 12:53:29', '', '', '', '', '', '', '', '', '', 0),
(12, 'Kori', 'Muhammad', 'soladnet2006@gmail.com', 'soladnet2006', 'M', '1960-02-01', '2013-03-20 12:53:37', '', '', '', '', '', '', '', '', '', 0),
(13, 'Abdulkarim', 'Usman', 'usman@gmail.com', 'usman', 'M', '2000-06-06', '2013-03-26 17:57:55', '', '', '', '', '', '', '', '', '', 0),
(17, 'Wale', 'Owoyomi', 'soladnet@abc.com', 'soladnet1', 'M', '1963-04-07', '2013-04-03 11:09:15', '', '', '', '', '', '', '', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `usercontacts`
--

CREATE TABLE IF NOT EXISTS `usercontacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username1` int(11) NOT NULL,
  `username2` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`username1`,`username2`,`sender_id`),
  KEY `username1` (`username1`),
  KEY `username2` (`username2`),
  KEY `sender_id` (`sender_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `usercontacts`
--

INSERT INTO `usercontacts` (`id`, `username1`, `username2`, `sender_id`, `status`, `time`) VALUES
(1, 11, 12, 11, 'Y', '2013-03-21 10:36:19'),
(2, 11, 13, 11, 'Y', '2013-04-04 10:38:57'),
(3, 11, 17, 11, 'Y', '2013-04-04 10:44:59');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `user_login_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `community_subscribers`
--
ALTER TABLE `community_subscribers`
  ADD CONSTRAINT `community_subscribers_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `community_subscribers_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `password_recovery`
--
ALTER TABLE `password_recovery`
  ADD CONSTRAINT `password_recovery_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_login_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pictureuploads`
--
ALTER TABLE `pictureuploads`
  ADD CONSTRAINT `pictureuploads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `user_login_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `privatemessae`
--
ALTER TABLE `privatemessae`
  ADD CONSTRAINT `privatemessae_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `user_login_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `privatemessae_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user_login_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `profile_pix`
--
ALTER TABLE `profile_pix`
  ADD CONSTRAINT `profile_pix_ibfk_1` FOREIGN KEY (`pix_id`) REFERENCES `pictureuploads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `profile_pix_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_login_details`
--
ALTER TABLE `user_login_details`
  ADD CONSTRAINT `user_login_details_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `usercontacts`
--
ALTER TABLE `usercontacts`
  ADD CONSTRAINT `usercontacts_ibfk_1` FOREIGN KEY (`username1`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usercontacts_ibfk_2` FOREIGN KEY (`username2`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usercontacts_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
