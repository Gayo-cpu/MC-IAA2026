-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2026 at 11:58 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mciaa_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_logs`
--

CREATE TABLE `admin_logs` (
  `log_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donation`
--

CREATE TABLE `donation` (
  `donation_id` int(11) NOT NULL,
  `user_id` int(21) DEFAULT NULL,
  `is_guest` tinyint(1) NOT NULL DEFAULT 0,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `transaction_reference` varchar(100) DEFAULT NULL,
  `donation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `donation_title` varchar(200) DEFAULT NULL,
  `donor_name` varchar(300) DEFAULT NULL,
  `donor_email` varchar(300) DEFAULT NULL,
  `donor_phone` varchar(20) DEFAULT NULL,
  `donor_type` varchar(60) DEFAULT NULL,
  `messages` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donation`
--

INSERT INTO `donation` (`donation_id`, `user_id`, `is_guest`, `amount`, `payment_method`, `transaction_reference`, `donation_date`, `donation_title`, `donor_name`, `donor_email`, `donor_phone`, `donor_type`, `messages`) VALUES
(1, 1, 0, 50000.00, 'M-Pesa', 'MPK987654321', '2026-06-14 06:20:56', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 4, 0, 35000.00, 'M-Pesa', 'TXN2026A01', '2026-06-21 04:30:27', 'Sadaka ya Ijumaa', 'Athumani Mkufya', 'athumanboy03@gmail.com', '0655112233', 'Mwanafunzi', 'Inshallah malengo yatatimia.'),
(3, 5, 0, 50000.00, 'Tigo Pesa', 'TXN2026A02', '2026-06-21 04:30:27', 'Mchango wa Simu', 'Safina Mshengeli', 'safinamshengeli@gmail.com', '0712345678', 'Uongozi', 'Kutoka kamati ya amirat.'),
(4, NULL, 1, 150000.00, 'Airtel Money', 'TXN2026A03', '2026-06-21 04:30:27', 'Ujenzi wa Maktaba', 'Juma Omari', 'jumaomari@gmail.com', '0784998877', 'Mzazi', 'Nawaunga mkono vijana wangu.'),
(5, 3, 0, 20000.00, 'NMB Bank', 'TXN2026A04', '2026-06-21 04:30:27', 'Mfuko wa Dharura', 'Sonia Shabani', 'soniashabani@gmail.com', '0677554433', 'Mweka Hazina', 'Mchango wa mwezi huu.'),
(6, NULL, 1, 500000.00, 'CRDB Bank', 'TXN2026A05', '2026-06-21 04:30:27', 'Ukarabati Mkuu', 'Khadija Ally', 'khadija.ally@outlook.com', '0754112233', 'Mdau wa Nje', 'Kazi njema.');

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `reg_no` varchar(100) NOT NULL,
  `course` varchar(150) NOT NULL,
  `year_of_study` int(11) NOT NULL,
  `loan_category` varchar(50) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `reason` text NOT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`id`, `full_name`, `phone`, `reg_no`, `course`, `year_of_study`, `loan_category`, `amount`, `reason`, `status`, `created_at`) VALUES
(1, 'fauzaani', '+255625361571', 'BCS-01-0064-2024', 'BCS', 2, '0', 20000.00, 'FEES', 'Rejected', '2026-07-10 19:10:22'),
(4, 'juma', '0746326271', 'BCS-01-0333-2024', 'BDA', 2, '0', 20000.00, 'tuition fee', 'Approved', '2026-07-10 21:18:37'),
(5, 'said', '0756453452', 'BCS-01-0455-2024', 'HAD', 2, '0', 10000.00, 'SICK', 'Pending', '2026-07-10 21:27:03'),
(6, 'azlan', '0756453423', 'BCS-01-0233-2024', 'AZL', 3, '0', 13000.00, 'sick for medication', 'Pending', '2026-07-10 21:48:12');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `sender_id` int(21) DEFAULT NULL,
  `message_text` text NOT NULL,
  `reply_text` text DEFAULT NULL,
  `replied_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `guest_name` varchar(200) DEFAULT NULL,
  `guest_email` varchar(200) DEFAULT NULL,
  `mobile_number` int(15) DEFAULT NULL,
  `asked_for` varchar(30) NOT NULL DEFAULT 'imamu',
  `is_answered` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `subject` text DEFAULT NULL,
  `replied_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `author_id` int(21) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `fullname` varchar(200) NOT NULL,
  `phonenumber` varchar(15) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `role` enum('student','admin','member') DEFAULT 'member',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(200) DEFAULT NULL,
  `academic_year` varchar(100) NOT NULL,
  `registration_no` varchar(100) NOT NULL,
  `role_description` enum('super admin','dean of student','amir','amirat','secretary','fedha','habari') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `fullname`, `phonenumber`, `email`, `password`, `gender`, `role`, `created_at`, `status`, `academic_year`, `registration_no`, `role_description`) VALUES
(1, 'tariki hashimu', '0745168940', 'tariki@gmail.com', '12345', 'male', '', '2004-02-09 18:00:00', 'active', '', '', NULL),
(2, 'fawzan suleiman', '0625361571', 'fawzansuleiman@gmail.com', '12345', 'male', 'student', '2026-06-21 03:50:57', 'active', '2024', 'BCS-01-0064-2024', NULL),
(3, 'haji mwinyimsa', NULL, 'hajiboy04@gmail.com', '13579', 'male', 'admin', '2026-06-21 03:56:28', 'active', '2024', 'BCS-01-0050-2024', 'super admin'),
(4, 'athumani mkufya', NULL, 'athumanboy03@gmail.com', '24689', 'male', 'admin', '2026-06-21 04:01:01', 'active', '2024', 'BCS-01-0080-2024', 'dean of student'),
(5, 'safina mshengeli', NULL, 'safinamshengeli@gmail.com', '24689', 'female', 'admin', '2026-06-21 04:04:56', 'active', '2024', 'BCS-01-0049-2024', ''),
(6, 'sonia shabani', NULL, 'soniashabani@gmail.com', '12345', 'female', '', '2026-06-21 04:15:07', 'active', '2024', 'BCS-01-0076-2024', 'fedha'),
(7, 'zahynab', NULL, 'zahynab@gmail.com', '12345', 'female', 'admin', '2026-06-21 04:20:01', 'active', '2024', 'BCS-O1-0013-2024', 'habari'),
(8, 'hamisi risasi', NULL, 'hamisirisasi@gmail.com', '23456', 'male', 'member', '2026-06-21 04:23:01', 'active', '2024', 'BCS-01-0145-2024', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
