-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 14, 2013 at 02:48 PM
-- Server version: 5.5.24-log
-- PHP Version: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=36 ;

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
  `thumbnail100` text NOT NULL,
  `thumbnail150` text NOT NULL,
  `datecreated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`creator_id`),
  UNIQUE KEY `unique_name` (`unique_name`),
  KEY `creator_id` (`creator_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

-- --------------------------------------------------------

--
-- Table structure for table `community_subscribers`
--

CREATE TABLE IF NOT EXISTS `community_subscribers` (
  `user` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `emailNotif` varchar(3) NOT NULL DEFAULT 'YES',
  `datejoined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `leave_status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user`,`community_id`),
  KEY `community_id` (`community_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `thumbnail45` text NOT NULL,
  `thumbnail50` text NOT NULL,
  `thumbnail75` text NOT NULL,
  `thumbnail150` text NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`,`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=65 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1411 ;

-- --------------------------------------------------------

--
-- Table structure for table `post_image`
--

CREATE TABLE IF NOT EXISTS `post_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `original` text NOT NULL,
  `thumbnail100` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleteStatus` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`post_id`,`community_id`,`sender_id`),
  KEY `post_id` (`post_id`),
  KEY `community_id` (`community_id`),
  KEY `sender_id` (`sender_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=146 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=542 ;

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
-- Table structure for table `tweakwink`
--

CREATE TABLE IF NOT EXISTS `tweakwink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `type` varchar(1) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`,`sender_id`,`receiver_id`),
  UNIQUE KEY `id` (`id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `sender_id` (`sender_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=44 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=42 ;

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
-- Constraints for table `community`
--
ALTER TABLE `community`
  ADD CONSTRAINT `community_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `post_image`
--
ALTER TABLE `post_image`
  ADD CONSTRAINT `post_image_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_image_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `community` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_image_ibfk_3` FOREIGN KEY (`sender_id`) REFERENCES `user_personal_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `tweakwink`
--
ALTER TABLE `tweakwink`
  ADD CONSTRAINT `tweakwink_ibfk_1` FOREIGN KEY (`receiver_id`) REFERENCES `user_login_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tweakwink_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `user_login_details` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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