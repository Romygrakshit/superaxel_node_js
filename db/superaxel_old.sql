-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2023 at 12:26 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `superaxel`
--

-- --------------------------------------------------------

--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `car_name` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cars`
--

INSERT INTO `cars` (`id`, `car_name`, `company_id`, `deleted`) VALUES
(2, 'temp2', 2, 0),
(4, 'city', 1, 0),
(5, 'city1', 1, 0),
(6, 'temp1', 2, 0),
(7, 'temp43', 3, 0),
(8, 'temp4', 3, 0),
(11, 'fasdf', 4, 0),
(12, 'bdsf', 4, 0),
(321, '4r12', 5, 0),
(322, 'Enova', 2, 0),
(323, 'i10', 1, 0),
(324, 'i20', 1, 0),
(325, 'Nexon', 8, 0),
(326, 'shift dzire', 2, 0),
(327, 'fufsff', 11, 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(10) NOT NULL,
  `category_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`) VALUES
(6, 'Gear'),
(7, 'Head light'),
(8, 'Wheel'),
(9, 'Engine'),
(11, 'Horn');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `city`, `state_id`) VALUES
(1, 'North and Middle Andaman', 32),
(2, 'South Andaman', 32),
(3, 'Nicobar', 32),
(4, 'Adilabad', 1),
(5, 'Anantapur', 1),
(6, 'Chittoor', 1),
(7, 'East Godavari', 1),
(8, 'Guntur', 1),
(9, 'Hyderabad', 1),
(10, 'Kadapa', 1),
(11, 'Karimnagar', 1),
(12, 'Khammam', 1),
(13, 'Krishna', 1),
(14, 'Kurnool', 1),
(15, 'Mahbubnagar', 1),
(16, 'Medak', 1),
(17, 'Nalgonda', 1),
(18, 'Nellore', 1),
(19, 'Nizamabad', 1),
(20, 'Prakasam', 1),
(21, 'Rangareddi', 1),
(22, 'Srikakulam', 1),
(23, 'Vishakhapatnam', 1),
(24, 'Vizianagaram', 1),
(25, 'Warangal', 1),
(26, 'West Godavari', 1),
(27, 'Anjaw', 3),
(28, 'Changlang', 3),
(29, 'East Kameng', 3),
(30, 'Lohit', 3),
(31, 'Lower Subansiri', 3),
(32, 'Papum Pare', 3),
(33, 'Tirap', 3),
(34, 'Dibang Valley', 3),
(35, 'Upper Subansiri', 3),
(36, 'West Kameng', 3),
(37, 'Barpeta', 2),
(38, 'Bongaigaon', 2),
(39, 'Cachar', 2),
(40, 'Darrang', 2),
(41, 'Dhemaji', 2),
(42, 'Dhubri', 2),
(43, 'Dibrugarh', 2),
(44, 'Goalpara', 2),
(45, 'Golaghat', 2),
(46, 'Hailakandi', 2),
(47, 'Jorhat', 2),
(48, 'Karbi Anglong', 2),
(49, 'Karimganj', 2),
(50, 'Kokrajhar', 2),
(51, 'Lakhimpur', 2),
(52, 'Marigaon', 2),
(53, 'Nagaon', 2),
(54, 'Nalbari', 2),
(55, 'North Cachar Hills', 2),
(56, 'Sibsagar', 2),
(57, 'Sonitpur', 2),
(58, 'Tinsukia', 2),
(59, 'Araria', 4),
(60, 'Aurangabad', 4),
(61, 'Banka', 4),
(62, 'Begusarai', 4),
(63, 'Bhagalpur', 4),
(64, 'Bhojpur', 4),
(65, 'Buxar', 4),
(66, 'Darbhanga', 4),
(67, 'Purba Champaran', 4),
(68, 'Gaya', 4),
(69, 'Gopalganj', 4),
(70, 'Jamui', 4),
(71, 'Jehanabad', 4),
(72, 'Khagaria', 4),
(73, 'Kishanganj', 4),
(74, 'Kaimur', 4),
(75, 'Katihar', 4),
(76, 'Lakhisarai', 4),
(77, 'Madhubani', 4),
(78, 'Munger', 4),
(79, 'Madhepura', 4),
(80, 'Muzaffarpur', 4),
(81, 'Nalanda', 4),
(82, 'Nawada', 4),
(83, 'Patna', 4),
(84, 'Purnia', 4),
(85, 'Rohtas', 4),
(86, 'Saharsa', 4),
(87, 'Samastipur', 4),
(88, 'Sheohar', 4),
(89, 'Sheikhpura', 4),
(90, 'Saran', 4),
(91, 'Sitamarhi', 4),
(92, 'Supaul', 4),
(93, 'Siwan', 4),
(94, 'Vaishali', 4),
(95, 'Pashchim Champaran', 4),
(96, 'Bastar', 36),
(97, 'Bilaspur', 36),
(98, 'Dantewada', 36),
(99, 'Dhamtari', 36),
(100, 'Durg', 36),
(101, 'Jashpur', 36),
(102, 'Janjgir-Champa', 36),
(103, 'Korba', 36),
(104, 'Koriya', 36),
(105, 'Kanker', 36),
(106, 'Kawardha', 36),
(107, 'Mahasamund', 36),
(108, 'Raigarh', 36),
(109, 'Rajnandgaon', 36),
(110, 'Raipur', 36),
(111, 'Surguja', 36),
(112, 'Diu', 29),
(113, 'Daman', 29),
(114, 'Central Delhi', 25),
(115, 'East Delhi', 25),
(116, 'New Delhi', 25),
(117, 'North Delhi', 25),
(118, 'North East Delhi', 25),
(119, 'North West Delhi', 25),
(120, 'South Delhi', 25),
(121, 'South West Delhi', 25),
(122, 'West Delhi', 25),
(123, 'North Goa', 26),
(124, 'South Goa', 26),
(125, 'Ahmedabad', 5),
(126, 'Amreli District', 5),
(127, 'Anand', 5),
(128, 'Banaskantha', 5),
(129, 'Bharuch', 5),
(130, 'Bhavnagar', 5),
(131, 'Dahod', 5),
(132, 'The Dangs', 5),
(133, 'Gandhinagar', 5),
(134, 'Jamnagar', 5),
(135, 'Junagadh', 5),
(136, 'Kutch', 5),
(137, 'Kheda', 5),
(138, 'Mehsana', 5),
(139, 'Narmada', 5),
(140, 'Navsari', 5),
(141, 'Patan', 5),
(142, 'Panchmahal', 5),
(143, 'Porbandar', 5),
(144, 'Rajkot', 5),
(145, 'Sabarkantha', 5),
(146, 'Surendranagar', 5),
(147, 'Surat', 5),
(148, 'Vadodara', 5),
(149, 'Valsad', 5),
(150, 'Ambala', 6),
(151, 'Bhiwani', 6),
(152, 'Faridabad', 6),
(153, 'Fatehabad', 6),
(154, 'Gurgaon', 6),
(155, 'Hissar', 6),
(156, 'Jhajjar', 6),
(157, 'Jind', 6),
(158, 'Karnal', 6),
(159, 'Kaithal', 6),
(160, 'Kurukshetra', 6),
(161, 'Mahendragarh', 6),
(162, 'Mewat', 6),
(163, 'Panchkula', 6),
(164, 'Panipat', 6),
(165, 'Rewari', 6),
(166, 'Rohtak', 6),
(167, 'Sirsa', 6),
(168, 'Sonepat', 6),
(169, 'Yamuna Nagar', 6),
(170, 'Palwal', 6),
(171, 'Bilaspur', 7),
(172, 'Chamba', 7),
(173, 'Hamirpur', 7),
(174, 'Kangra', 7),
(175, 'Kinnaur', 7),
(176, 'Kulu', 7),
(177, 'Lahaul and Spiti', 7),
(178, 'Mandi', 7),
(179, 'Shimla', 7),
(180, 'Sirmaur', 7),
(181, 'Solan', 7),
(182, 'Una', 7),
(183, 'Anantnag', 8),
(184, 'Badgam', 8),
(185, 'Bandipore', 8),
(186, 'Baramula', 8),
(187, 'Doda', 8),
(188, 'Jammu', 8),
(189, 'Kargil', 8),
(190, 'Kathua', 8),
(191, 'Kupwara', 8),
(192, 'Leh', 8),
(193, 'Poonch', 8),
(194, 'Pulwama', 8),
(195, 'Rajauri', 8),
(196, 'Srinagar', 8),
(197, 'Samba', 8),
(198, 'Udhampur', 8),
(199, 'Bokaro', 34),
(200, 'Chatra', 34),
(201, 'Deoghar', 34),
(202, 'Dhanbad', 34),
(203, 'Dumka', 34),
(204, 'Purba Singhbhum', 34),
(205, 'Garhwa', 34),
(206, 'Giridih', 34),
(207, 'Godda', 34),
(208, 'Gumla', 34),
(209, 'Hazaribagh', 34),
(210, 'Koderma', 34),
(211, 'Lohardaga', 34),
(212, 'Pakur', 34),
(213, 'Palamu', 34),
(214, 'Ranchi', 34),
(215, 'Sahibganj', 34),
(216, 'Seraikela and Kharsawan', 34),
(217, 'Pashchim Singhbhum', 34),
(218, 'Ramgarh', 34),
(219, 'Bidar', 9),
(220, 'Belgaum', 9),
(221, 'Bijapur', 9),
(222, 'Bagalkot', 9),
(223, 'Bellary', 9),
(224, 'Bangalore Rural District', 9),
(225, 'Bangalore Urban District', 9),
(226, 'Chamarajnagar', 9),
(227, 'Chikmagalur', 9),
(228, 'Chitradurga', 9),
(229, 'Davanagere', 9),
(230, 'Dharwad', 9),
(231, 'Dakshina Kannada', 9),
(232, 'Gadag', 9),
(233, 'Gulbarga', 9),
(234, 'Hassan', 9),
(235, 'Haveri District', 9),
(236, 'Kodagu', 9),
(237, 'Kolar', 9),
(238, 'Koppal', 9),
(239, 'Mandya', 9),
(240, 'Mysore', 9),
(241, 'Raichur', 9),
(242, 'Shimoga', 9),
(243, 'Tumkur', 9),
(244, 'Udupi', 9),
(245, 'Uttara Kannada', 9),
(246, 'Ramanagara', 9),
(247, 'Chikballapur', 9),
(248, 'Yadagiri', 9),
(249, 'Alappuzha', 10),
(250, 'Ernakulam', 10),
(251, 'Idukki', 10),
(252, 'Kollam', 10),
(253, 'Kannur', 10),
(254, 'Kasaragod', 10),
(255, 'Kottayam', 10),
(256, 'Kozhikode', 10),
(257, 'Malappuram', 10),
(258, 'Palakkad', 10),
(259, 'Pathanamthitta', 10),
(260, 'Thrissur', 10),
(261, 'Thiruvananthapuram', 10),
(262, 'Wayanad', 10),
(263, 'Alirajpur', 11),
(264, 'Anuppur', 11),
(265, 'Ashok Nagar', 11),
(266, 'Balaghat', 11),
(267, 'Barwani', 11),
(268, 'Betul', 11),
(269, 'Bhind', 11),
(270, 'Bhopal', 11),
(271, 'Burhanpur', 11),
(272, 'Chhatarpur', 11),
(273, 'Chhindwara', 11),
(274, 'Damoh', 11),
(275, 'Datia', 11),
(276, 'Dewas', 11),
(277, 'Dhar', 11),
(278, 'Dindori', 11),
(279, 'Guna', 11),
(280, 'Gwalior', 11),
(281, 'Harda', 11),
(282, 'Hoshangabad', 11),
(283, 'Indore', 11),
(284, 'Jabalpur', 11),
(285, 'Jhabua', 11),
(286, 'Katni', 11),
(287, 'Khandwa', 11),
(288, 'Khargone', 11),
(289, 'Mandla', 11),
(290, 'Mandsaur', 11),
(291, 'Morena', 11),
(292, 'Narsinghpur', 11),
(293, 'Neemuch', 11),
(294, 'Panna', 11),
(295, 'Rewa', 11),
(296, 'Rajgarh', 11),
(297, 'Ratlam', 11),
(298, 'Raisen', 11),
(299, 'Sagar', 11),
(300, 'Satna', 11),
(301, 'Sehore', 11),
(302, 'Seoni', 11),
(303, 'Shahdol', 11),
(304, 'Shajapur', 11),
(305, 'Sheopur', 11),
(306, 'Shivpuri', 11),
(307, 'Sidhi', 11),
(308, 'Singrauli', 11),
(309, 'Tikamgarh', 11),
(310, 'Ujjain', 11),
(311, 'Umaria', 11),
(312, 'Vidisha', 11),
(313, 'Ahmednagar', 12),
(314, 'Akola', 12),
(315, 'Amrawati', 12),
(316, 'Aurangabad', 12),
(317, 'Bhandara', 12),
(318, 'Beed', 12),
(319, 'Buldhana', 12),
(320, 'Chandrapur', 12),
(321, 'Dhule', 12),
(322, 'Gadchiroli', 12),
(323, 'Gondiya', 12),
(324, 'Hingoli', 12),
(325, 'Jalgaon', 12),
(326, 'Jalna', 12),
(327, 'Kolhapur', 12),
(328, 'Latur', 12),
(329, 'Mumbai City', 12),
(330, 'Mumbai suburban', 12),
(331, 'Nandurbar', 12),
(332, 'Nanded', 12),
(333, 'Nagpur', 12),
(334, 'Nashik', 12),
(335, 'Osmanabad', 12),
(336, 'Parbhani', 12),
(337, 'Pune', 12),
(338, 'Raigad', 12),
(339, 'Ratnagiri', 12),
(340, 'Sindhudurg', 12),
(341, 'Sangli', 12),
(342, 'Solapur', 12),
(343, 'Satara', 12),
(344, 'Thane', 12),
(345, 'Wardha', 12),
(346, 'Washim', 12),
(347, 'Yavatmal', 12),
(348, 'Bishnupur', 13),
(349, 'Churachandpur', 13),
(350, 'Chandel', 13),
(351, 'Imphal East', 13),
(352, 'Senapati', 13),
(353, 'Tamenglong', 13),
(354, 'Thoubal', 13),
(355, 'Ukhrul', 13),
(356, 'Imphal West', 13),
(357, 'East Garo Hills', 14),
(358, 'East Khasi Hills', 14),
(359, 'Jaintia Hills', 14),
(360, 'Ri-Bhoi', 14),
(361, 'South Garo Hills', 14),
(362, 'West Garo Hills', 14),
(363, 'West Khasi Hills', 14),
(364, 'Aizawl', 15),
(365, 'Champhai', 15),
(366, 'Kolasib', 15),
(367, 'Lawngtlai', 15),
(368, 'Lunglei', 15),
(369, 'Mamit', 15),
(370, 'Saiha', 15),
(371, 'Serchhip', 15),
(372, 'Dimapur', 16),
(373, 'Kohima', 16),
(374, 'Mokokchung', 16),
(375, 'Mon', 16),
(376, 'Phek', 16),
(377, 'Tuensang', 16),
(378, 'Wokha', 16),
(379, 'Zunheboto', 16),
(380, 'Angul', 17),
(381, 'Boudh', 17),
(382, 'Bhadrak', 17),
(383, 'Bolangir', 17),
(384, 'Bargarh', 17),
(385, 'Baleswar', 17),
(386, 'Cuttack', 17),
(387, 'Debagarh', 17),
(388, 'Dhenkanal', 17),
(389, 'Ganjam', 17),
(390, 'Gajapati', 17),
(391, 'Jharsuguda', 17),
(392, 'Jajapur', 17),
(393, 'Jagatsinghpur', 17),
(394, 'Khordha', 17),
(395, 'Kendujhar', 17),
(396, 'Kalahandi', 17),
(397, 'Kandhamal', 17),
(398, 'Koraput', 17),
(399, 'Kendrapara', 17),
(400, 'Malkangiri', 17),
(401, 'Mayurbhanj', 17),
(402, 'Nabarangpur', 17),
(403, 'Nuapada', 17),
(404, 'Nayagarh', 17),
(405, 'Puri', 17),
(406, 'Rayagada', 17),
(407, 'Sambalpur', 17),
(408, 'Subarnapur', 17),
(409, 'Sundargarh', 17),
(410, 'Karaikal', 27),
(411, 'Mahe', 27),
(412, 'Puducherry', 27),
(413, 'Yanam', 27),
(414, 'Amritsar', 18),
(415, 'Bathinda', 18),
(416, 'Firozpur', 18),
(417, 'Faridkot', 18),
(418, 'Fatehgarh Sahib', 18),
(419, 'Gurdaspur', 18),
(420, 'Hoshiarpur', 18),
(421, 'Jalandhar', 18),
(422, 'Kapurthala', 18),
(423, 'Ludhiana', 18),
(424, 'Mansa', 18),
(425, 'Moga', 18),
(426, 'Mukatsar', 18),
(427, 'Nawan Shehar', 18),
(428, 'Patiala', 18),
(429, 'Rupnagar', 18),
(430, 'Sangrur', 18),
(431, 'Ajmer', 19),
(432, 'Alwar', 19),
(433, 'Bikaner', 19),
(434, 'Barmer', 19),
(435, 'Banswara', 19),
(436, 'Bharatpur', 19),
(437, 'Baran', 19),
(438, 'Bundi', 19),
(439, 'Bhilwara', 19),
(440, 'Churu', 19),
(441, 'Chittorgarh', 19),
(442, 'Dausa', 19),
(443, 'Dholpur', 19),
(444, 'Dungapur', 19),
(445, 'Ganganagar', 19),
(446, 'Hanumangarh', 19),
(447, 'Juhnjhunun', 19),
(448, 'Jalore', 19),
(449, 'Jodhpur', 19),
(450, 'Jaipur', 19),
(451, 'Jaisalmer', 19),
(452, 'Jhalawar', 19),
(453, 'Karauli', 19),
(454, 'Kota', 19),
(455, 'Nagaur', 19),
(456, 'Pali', 19),
(457, 'Pratapgarh', 19),
(458, 'Rajsamand', 19),
(459, 'Sikar', 19),
(460, 'Sawai Madhopur', 19),
(461, 'Sirohi', 19),
(462, 'Tonk', 19),
(463, 'Udaipur', 19),
(464, 'East Sikkim', 20),
(465, 'North Sikkim', 20),
(466, 'South Sikkim', 20),
(467, 'West Sikkim', 20),
(468, 'Ariyalur', 21),
(469, 'Chennai', 21),
(470, 'Coimbatore', 21),
(471, 'Cuddalore', 21),
(472, 'Dharmapuri', 21),
(473, 'Dindigul', 21),
(474, 'Erode', 21),
(475, 'Kanchipuram', 21),
(476, 'Kanyakumari', 21),
(477, 'Karur', 21),
(478, 'Madurai', 21),
(479, 'Nagapattinam', 21),
(480, 'The Nilgiris', 21),
(481, 'Namakkal', 21),
(482, 'Perambalur', 21),
(483, 'Pudukkottai', 21),
(484, 'Ramanathapuram', 21),
(485, 'Salem', 21),
(486, 'Sivagangai', 21),
(487, 'Tiruppur', 21),
(488, 'Tiruchirappalli', 21),
(489, 'Theni', 21),
(490, 'Tirunelveli', 21),
(491, 'Thanjavur', 21),
(492, 'Thoothukudi', 21),
(493, 'Thiruvallur', 21),
(494, 'Thiruvarur', 21),
(495, 'Tiruvannamalai', 21),
(496, 'Vellore', 21),
(497, 'Villupuram', 21),
(498, 'Dhalai', 22),
(499, 'North Tripura', 22),
(500, 'South Tripura', 22),
(501, 'West Tripura', 22),
(502, 'Almora', 33),
(503, 'Bageshwar', 33),
(504, 'Chamoli', 33),
(505, 'Champawat', 33),
(506, 'Dehradun', 33),
(507, 'Haridwar', 33),
(508, 'Nainital', 33),
(509, 'Pauri Garhwal', 33),
(510, 'Pithoragharh', 33),
(511, 'Rudraprayag', 33),
(512, 'Tehri Garhwal', 33),
(513, 'Udham Singh Nagar', 33),
(514, 'Uttarkashi', 33),
(515, 'Agra', 23),
(516, 'Allahabad', 23),
(517, 'Aligarh', 23),
(518, 'Ambedkar Nagar', 23),
(519, 'Auraiya', 23),
(520, 'Azamgarh', 23),
(521, 'Barabanki', 23),
(522, 'Badaun', 23),
(523, 'Bagpat', 23),
(524, 'Bahraich', 23),
(525, 'Bijnor', 23),
(526, 'Ballia', 23),
(527, 'Banda', 23),
(528, 'Balrampur', 23),
(529, 'Bareilly', 23),
(530, 'Basti', 23),
(531, 'Bulandshahr', 23),
(532, 'Chandauli', 23),
(533, 'Chitrakoot', 23),
(534, 'Deoria', 23),
(535, 'Etah', 23),
(536, 'Kanshiram Nagar', 23),
(537, 'Etawah', 23),
(538, 'Firozabad', 23),
(539, 'Farrukhabad', 23),
(540, 'Fatehpur', 23),
(541, 'Faizabad', 23),
(542, 'Gautam Buddha Nagar', 23),
(543, 'Gonda', 23),
(544, 'Ghazipur', 23),
(545, 'Gorkakhpur', 23),
(546, 'Ghaziabad', 23),
(547, 'Hamirpur', 23),
(548, 'Hardoi', 23),
(549, 'Mahamaya Nagar', 23),
(550, 'Jhansi', 23),
(551, 'Jalaun', 23),
(552, 'Jyotiba Phule Nagar', 23),
(553, 'Jaunpur District', 23),
(554, 'Kanpur Dehat', 23),
(555, 'Kannauj', 23),
(556, 'Kanpur Nagar', 23),
(557, 'Kaushambi', 23),
(558, 'Kushinagar', 23),
(559, 'Lalitpur', 23),
(560, 'Lakhimpur Kheri', 23),
(561, 'Lucknow', 23),
(562, 'Mau', 23),
(563, 'Meerut', 23),
(564, 'Maharajganj', 23),
(565, 'Mahoba', 23),
(566, 'Mirzapur', 23),
(567, 'Moradabad', 23),
(568, 'Mainpuri', 23),
(569, 'Mathura', 23),
(570, 'Muzaffarnagar', 23),
(571, 'Pilibhit', 23),
(572, 'Pratapgarh', 23),
(573, 'Rampur', 23),
(574, 'Rae Bareli', 23),
(575, 'Saharanpur', 23),
(576, 'Sitapur', 23),
(577, 'Shahjahanpur', 23),
(578, 'Sant Kabir Nagar', 23),
(579, 'Siddharthnagar', 23),
(580, 'Sonbhadra', 23),
(581, 'Sant Ravidas Nagar', 23),
(582, 'Sultanpur', 23),
(583, 'Shravasti', 23),
(584, 'Unnao', 23),
(585, 'Varanasi', 23),
(586, 'Birbhum', 24),
(587, 'Bankura', 24),
(588, 'Bardhaman', 24),
(589, 'Darjeeling', 24),
(590, 'Dakshin Dinajpur', 24),
(591, 'Hooghly', 24),
(592, 'Howrah', 24),
(593, 'Jalpaiguri', 24),
(594, 'Cooch Behar', 24),
(595, 'Kolkata', 24),
(596, 'Malda', 24),
(597, 'Midnapore', 24),
(598, 'Murshidabad', 24),
(599, 'Nadia', 24),
(600, 'North 24 Parganas', 24),
(601, 'South 24 Parganas', 24),
(602, 'Purulia', 24),
(603, 'Uttar Dinajpur', 24);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `company` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `company`) VALUES
(1, 'Honda'),
(2, 'Suzuki'),
(3, 'Supra'),
(5, 'Kia'),
(7, 'temp'),
(8, 'TATA'),
(10, 'Mechanical '),
(11, 'Toyoto');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_boy`
--

CREATE TABLE `delivery_boy` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_boy`
--

INSERT INTO `delivery_boy` (`id`, `name`, `mobile_number`) VALUES
(1, 'Rajesh', '123456789'),
(2, 'Manoj', '9876543210');

-- --------------------------------------------------------

--
-- Table structure for table `enquires`
--

CREATE TABLE `enquires` (
  `id` int(11) NOT NULL,
  `garage_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `company_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `axel` varchar(255) NOT NULL,
  `offered_price` varchar(255) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL,
  `images_id` varchar(255) NOT NULL,
  `delivery_boy` varchar(255) NOT NULL,
  `state` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enquires`
--

INSERT INTO `enquires` (`id`, `garage_id`, `address`, `lat`, `lng`, `company_id`, `car_id`, `axel`, `offered_price`, `date_time`, `status`, `images_id`, `delivery_boy`, `state`) VALUES
(16, 70, 'Jagatpura Road, Jagatpura, Jaipur Municipal Corporation, Sanganer Tehsil, Jaipur District, Rajasthan, 302017, India', '26.835442311150892', '75.83501642887548', 1, 4, 'Right', '50000', '2023-05-05 15:00:37', 'pending', '525-526', '', 'Rajasthan'),
(17, 70, 'Jaipur Municipal Corporation, Sanganer Tehsil, Jaipur District, Rajasthan, 302030, India', '26.820371071947356', '75.79979308757491', 1, 4, 'Right', '50000', '2023-05-05 15:09:49', 'pending', '527-528', '', 'Rajasthan'),
(18, 70, 'Jaipur Municipal Corporation, Sanganer Tehsil, Jaipur District, Rajasthan, 302014, India', '26.8426789361257', '75.81233908349495', 1, 5, 'Left', '5000', '2023-05-06 16:06:49', 'pending', '529-530', '', 'Rajasthan'),
(19, 70, 'Khetpura, Dayalpura, Sanganer Tehsil, Jaipur District, Rajasthan, 303905, India', '26.74464124095312', '75.84518973028817', 1, 5, 'Right', '13697', '2023-05-06 16:08:21', 'Cancel', '532-531', '', 'Rajasthan'),
(20, 70, 'Jagatpura, Jaipur Municipal Corporation, Sanganer Tehsil, Jaipur District, Rajasthan, 302017, India', '26.836196743667912', '75.83668904027438', 1, 5, 'Right', '5000', '2023-05-10 01:53:35', 'pending', '533-534', '', 'Haryana'),
(21, 70, 'Jagatpura, Jaipur Municipal Corporation, Sanganer Tehsil, Jaipur District, Rajasthan, 302017, India', '26.836196743667912', '75.83668904027438', 1, 5, 'Right', '5000', '2023-05-10 01:53:41', 'pending', '536-535', '', 'Haryana'),
(22, 70, 'Airport Service Road, Jagatpura, Jaipur Municipal Corporation, Sanganer Tehsil, Jaipur District, Rajasthan, 302017, India', '26.826713170101883', '75.8319688477513', 1, 5, 'Left', '6446', '2023-05-10 02:33:09', 'Delivered', '539-537-540-538', '', 'Rajasthan'),
(24, 81, '82,PANCAHAVATI COLONY', '20.56', '28.365', 2, 326, 'Right', '15230', '2023-08-01 14:35:40', 'pending', '549', '', NULL),
(25, 81, '82,PANCAHAVATI COLONY', '20.56', '28.365', 2, 326, 'Right', '18530', '2023-08-01 14:37:14', 'pending', '550', '', NULL),
(26, 17, '82,PANCAHAVATI COLONY', '28.56', '26.365', 2, 322, 'Left', '15785', '2023-08-01 14:42:49', 'pending', '552', '', 'HARYANA'),
(27, 1, 'Rampur', '29.56', '22.365', 2, 322, 'Left', '19645', '2023-08-03 13:13:46', 'pending', '555', '', NULL),
(28, 18, '82,PANCAHAVATI COLONY', '28.56', '32.365', 2, 322, 'Right', '19730', '2023-08-03 14:23:31', 'pending', '562', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `garages`
--

CREATE TABLE `garages` (
  `id` int(11) NOT NULL,
  `garage_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_image_id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `mobile_number` varchar(255) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `garages`
--

INSERT INTO `garages` (`id`, `garage_name`, `password`, `profile_image_id`, `address`, `state`, `city`, `deleted`, `mobile_number`, `lat`, `lng`) VALUES
(1, 'The Chess club', '', '', '123 Main Street', 'no drugs', '', 1, '', '', ''),
(2, 'The jai mata di', '', '', '123 Main Street', 'no bitches', '', 1, '', '', ''),
(3, 'diona', '', '', 'teri mummy ', 'chod', '', 1, '', '', ''),
(4, 'diona', '', '', 'teri mummy ', 'chod', '', 1, '', '', ''),
(5, 'diona', '', '', 'teri mummy ', 'chod', '', 1, '', '', ''),
(6, 'diona2', '', '', 'teri mummy ', 'chod', '', 1, '', '', ''),
(7, 'diona2', '', '', 'teri mummy ', 'chod', '', 1, '', '', ''),
(8, 'diona21', '', '', 'teri mummy ', 'chod', '', 1, '', '', ''),
(9, 'diona3', '', '', 'teri mummy ', 'chod', '', 1, '', '', ''),
(10, 'diona3', '', '1', 'teri mummy ', 'chod', '', 1, '', '', ''),
(11, 'diona3', '', '2', 'teri mummy ', 'chod', '', 1, '', '', ''),
(12, 'diona2', '', '4', 'teri mummy ', 'chod', '', 1, '', '', ''),
(13, 'diona', '', '5', 'teri mummy ', 'chod', '', 1, '', '', ''),
(14, 'foresta2', '', '31', 'fffff', 'ff', '', 1, '', '', ''),
(15, 'foresta 3', '', '32', 'teri mummy ', 'ff', '', 1, '', '', ''),
(16, 'diona21fffff', '', '33', 'fffffsfsf', 'sfsf', '', 1, '', '', ''),
(17, 'diona21ffaaa', '', '34', 'ffagdasg', 'afdsfasdf', '', 1, '', '', ''),
(18, 'foresta 4', '', '35', 'fffffsfsf', 'chod1', '', 1, '', '', ''),
(19, 'diona21', '', '36', 'f', 'ff', '', 1, '', '', ''),
(20, 'diona21f', '', '93', 'teri mummy f', 'chodf', '', 1, '', '', ''),
(21, 'diona21f', '', '92', 'teri mummy f', 'chodf', '', 1, '', '', ''),
(22, 'diona21f', '', '94', 'teri mummy f', 'chodf', '', 1, '', '', ''),
(23, 'diona21f', '', '102', 'fffff', 'ff', '0', 1, '', '', ''),
(24, 'diona21f', '', '107', 'fffff', 'ff', '0', 1, '', '', ''),
(25, 'diona21', '', '112', 'fffffsfsf', 'chodf', '0', 1, '', '', ''),
(26, 'diona21', '', '114', 'fffffsfsf', 'chodf', '115', 1, '', '', ''),
(27, 'diona21ff', '', '116', 'fffff', 'chod1', '117', 1, '', '', ''),
(28, 'dggasdga', '', '118', 'fffff', 'ff', '0', 1, '', '', ''),
(29, 'dggasdga', '', '128', 'fffff', 'ff', '0', 1, '', '', ''),
(30, 'dggasdga', '', '133', 'fffff', 'ff', '0', 1, '', '', ''),
(31, 'dggasdga', '', '138', 'fffff', 'ff', '0', 1, '', '', ''),
(32, 'dggasdga', '', '143', 'fffff', 'ff', '0', 1, '', '', ''),
(33, '+918302973384', '$2b$10$XiimkohyIhx3zUvMR//equzXyLWin0WDRm8k67AnM6ZVbgokgBSKu', '148', 'JAISINGHPURA KHOR', 'PUNJAB', 'Nawan Shehar', 0, '+918302973384', '28.56', '26.365'),
(34, 'diona3', '', '150', 'fffff', 'chod1', '0', 1, '', '', ''),
(35, 'dioa3', '$2b$10$9TqPbHb/3UTsPBl1og.O.OtcpIzBcnosnH4GKYoGzwYKJe6L9F7Wq', '155', 'fffeefgwegvwe', 'KARNATAKA', 'Kolar', 0, '54984986164', '65', '26'),
(36, 'diona3', '', '160', 'fffff', 'chod1', '0', 1, '', '', ''),
(37, 'diona3', '', '165', 'fffff', 'chod1', '166-167-168-169', 0, '', '', ''),
(38, 'diona21ff', '', '170', 'fffff', 'chod1', '171', 0, '', '', ''),
(39, 'diona21ff', '', '172', 'fffff', 'chod1', '173', 1, '', '', ''),
(40, 'diona21ff', '', '174', 'fffff', 'chod1', '175-177-176-178', 1, '', '', ''),
(41, 'diona21', '', '179', 'fffffsfsf', 'chodf', '0', 0, '', '', ''),
(42, 'diona21ff', '', '185', 'teri mummy f', 'ff', '0', 1, '', '', ''),
(43, 'diona21', '', '191', 'dsfafa', 'sdfasf', '0', 0, '', '', ''),
(44, 'diona21', '', '191', 'dsfafa', 'sdfasf', '0', 0, '', '', ''),
(45, 'diona21', '', '191', 'dsfafa', 'sdfasf', '0', 0, '', '', ''),
(46, 'diona21', '', '191', 'dsfafa', 'sdfasf', '0', 0, '', '', ''),
(47, 'diona21', '', '191', 'dsfafa', 'sdfasf', '0', 0, '', '', ''),
(48, 'diona21', '', '197', 'dsfafa', 'sdfasf', '0', 0, '', '', ''),
(49, 'diona', 'qxwqu', '203', 'fasfafas', 'afadsfa', '0', 0, '', '', ''),
(50, 'fadfafas', 'afadfasfasdf', '208', 'dfadfadsf', 'chod1', '0', 0, '', '', ''),
(51, 'fadfafas', 'afadfasfasdf', '211', 'dfadfadsf', 'chod1', '0', 0, '', '', ''),
(52, 'fadfafas', 'afadfasfasdf', '214', 'dfadfadsf', 'chod1', '0', 0, '', '', ''),
(53, 'fadfafas', 'afadfasfasdf', '217', 'dfadfadsf', 'chod1', '0', 0, '', '', ''),
(54, 'fadfafas', 'afadfasfasdf', '220', 'dfadfadsf', 'chod1', '0', 0, '', '', ''),
(55, 'fadfafas', 'afadfasfasdf', '223', 'dfadfadsf', 'chod1', '0', 0, '', '', ''),
(56, 'koi club ka naam', 'afadfasfasdf', '18', 'dfadfadsf', 'chod1', '227-368-370-369', 0, '', '', ''),
(57, 'jigya', '$2b$10$PgID4mmYRa7KoVWrX5ckBuoGi3liOApz7frRVz00xoxbU4VAoAaRy', '372', 'amritsar sundar nagar', 'Gujarat', '375-379-373-377-376-374-380', 0, '1234', 'chut mai dal le', 'yeh bhi'),
(58, 'thar', '$2b$10$AHIO/5ZorKkkkgcam3yaF.QrnNQ0ljCYvLjnZlJTOqNe828lfkqsW', '413', 'fffff', 'Andhra Pradesh', 'Jaipur', 0, '+86-123-4567-8905', 'chut mai dal le', 'yeh bhi'),
(59, 'new garage', '$2b$07$SJ3zTq4.areQ8KzFCjMERuAU.bIkTsOcGlf3qGYjmhVGrJIBnUfTq', 'fasdlkfj', ' whatever', 'raj', 'kota', 0, '42342423', '243.234', '324.321'),
(60, 'new garage', '$2b$07$8SxUZnrlmSJLvt4aVPOZpuFJi7ms0j1E5urH3KdJ6dfKhFt.fAxfi', 'fasdlkfj', ' whatever', 'raj', 'kota', 0, '42342423', '243.234', '324.321'),
(61, 'new garage', '$2b$07$.kHqnPTxTIgji/WOlFyB2.BARXpkPXyFHih1oxiaGVWQAyp34dDF6', 'fasdlkfj', ' whatever', 'raj', 'kota', 0, '42342423', '243.234', '324.321'),
(62, 'new garage', '$2b$07$cvR9IAUAgO6SiJIrLvbNwe7WSov7CgtJN7b6mhr8zbYTp2oxeDxYK', 'fasdlkfj', ' whatever', 'raj', 'kota', 0, '42342423', '243.234', '324.321'),
(63, 'new garage', '$2b$07$P2HOcxy6C4mgeZGl3T8k1.IsVbF0yQs4q.Qpt8QL1ofUUQIJtej3e', 'fasdlkfj', ' whatever', 'raj', 'kota', 0, '42342423', '243.234', '324.321'),
(64, 'new garage', '$2b$07$ZixQ/shQTPiisdFAFNRJAeyQv/AVp1sAP8E0YJY.gcR5u5mr/zXUy', 'fasdlkfj', ' whatever', 'raj', 'kota', 0, '42342423', '243.234', '324.321'),
(65, 'new garage', '$2b$07$3fs/R0L6w3bnlEOrqHGXOu8sb4xfCDaKg0lAtx2vJy93g1..1.QeW', 'fasdlkfj', ' whatever', 'raj', 'kota', 0, '42342423', '243.234', '324.321'),
(66, 'new garage', '$2b$07$xnBP.WqkYGJ93Zf4RECmZePZFkNiKbPLWrLwcZEqiAJj6Z4HJ1ikW', 'fasdlkfj', ' whatever', 'raj', 'kota', 0, '42342423', '243.234', '324.321'),
(67, 'rhoan grg', '$2b$10$aOtZQQY5zD45cvGtxho1SeEbVGPZYKJdloUfEoRMXK2VoxJDFQu8S', '472', 'do not know till yet', 'punjab', 'gurgaon', 0, '3213 124', 'fsadf', 'sdfafsda'),
(68, 'rhoan grg', '$2b$10$74o0UgyVscsAUfkBQcogi.Sr3MWEo7gEBFEvBNeft4.A/VQn8QAcS', '473', 'do not know till yet', 'punjab', 'gurgaon', 0, '3213 124', 'fsadf', 'sdfafsda'),
(69, 'rhoan grg', '$2b$10$OqN5lKiY7.s5GcBq9oNZveVsVhx.Um1dcY4f2Qne2gvSutCunsRV2', '474', 'do not know till yet', 'punjab', 'gurgaon', 0, '3213 124', 'fsadf', 'sdfafsda'),
(70, 'rhoan grg', '$2b$10$36Ngw3MwQTjxP1d05T6u4u03NveiEKftxkdnVE8C3EANAxGuO.xHG', '475', 'do not know till yet', 'punjab', 'gurgaon', 0, '8290955338', 'fsadf', 'sdfafsda'),
(71, 'rhoan grg', '$2b$10$ockN9E7X/OLjDcuXTyvRpO63ny0lbCYKSxzmENUQsz8TrKDGEK1B.', '476', 'do not know till yet', 'punjab', 'gurgaon', 0, '8290955338', 'fsadf', 'sdfafsda'),
(72, 'rhoan grg', '$2b$10$m2/wcRTzEeGSXKaCFZ0wIuVGuetJZBVJf3o7upYG4gfiRah9Czw6G', '477', 'do not know till yet', 'punjab', 'gurgaon', 0, '8290955338', 'fsadf', 'sdfafsda'),
(73, 'newest', '$2b$10$KhgVQaI4//U.rNSApHoi8eesETKAzBmNRixP/kSv6zcgsYRWTNRUW', '478', 'near skit', 'Rajasthan', 'jaipur', 0, '8290955338', '26.8236684', '75.8635614'),
(74, 'newest', '$2b$10$Nw8Imr9aavYrlGEfSXNR/.A6f9UQfBqmYaEBLqyWvIOrKhs7YCSuO', '479', 'near skit', 'Rajasthan', 'jaipur', 0, '8290955338', '26.8236684', '75.8635614'),
(75, 'newest', '$2b$10$GJdKLep3lnh.AkeFLjLTbu7PK30Oazw0086oadW.3JQG05xgU1vQK', '480', 'near skit', 'Rajasthan', 'jaipur', 0, '8290955338', '26.8236684', '75.8635614'),
(76, 'jfjddndd', '$2b$10$rIDAw5ZfenIU.nhYUim2cOcRfLBlguJmmImh4XT1Vq8RKfqMe9jmS', '481', 'sknnncc', 'Andhra Pradesh', 'jfjdndd', 0, '8290955339', '26.8236991', '75.8636072'),
(77, 'jdndnxc', '$2b$10$mrjmJ3SLvSZlxjBwdh5jM.QMlZnqb.ObEjbioPBZAsitDTmG08FZ2', '482', 'ndnsnf', 'Haryana', 'fkndd', 0, '8290955332', '26.8237019', '75.863601'),
(78, 'yco ovyvh', '$2b$10$kQISAd6LRdijskMJbOtuS.TzTpwZTLjwGhBTsrTBN/76LOKVAKx/C', '483', 'kgkgg khl', 'Gujarat', 'cbnxnx', 0, '8290955335', '26.8236896', '75.8636081'),
(79, 'Name', '$2b$10$YhIO2TOr2uStbB8SZgjdyuYx3ZQ4zpEfsMveeScPcPqSIBArpPvqO', '543', 'address', 'MANIPUR', 'JAIPUR', 0, '9969969965', '26.98', '56.98'),
(80, '+449588026295', '$2b$10$fxUXHx1X5fLtVJmoYL/JWuJswazQYfUiHbIFYQr6AJ.k0HNRoqnvS', '544', '82,PANCAHAVATI COLONY', 'RAJASTHAN', 'JAIPUR', 0, '+918302973384', '20.56', '26.365'),
(81, '+918302973384', '$2b$10$GBlLFY5P43C/M6l1xhfROuYJxJ2QCHS6DARew8n0nhnFXUIo.B.BG', '545', '82,PANCAHAVATI COLONY', '19', 'Jaipur', 0, '0830 297 3384', '27.56', '28.365'),
(82, '0830 297 3384', '$2b$10$rBG4vr5CGtXz95201MAaDO1.iYxy7jGYLHk.hG/wFN7pW171C20.2', '546', 'Sitapura jaipur', 'RAJASTHAN', 'Jaipur', 0, '+918302973384', '28.56', '32.365'),
(83, '+91839785384', '$2b$10$xhS86KhL.ddwkgQe8JkvNuSgFW2ogM59QmdTRLT0GEZyRkG.3P/9.', '553', '82,PANCH COLONY', '19', 'Jaipur', 0, '07960 297 3384', '19.56', '29.365'),
(84, 'dfuysdcgywsgcu', '$2b$10$pgvvK5CuqqLC0QxhnlmhLuL8d5VAW7ETA0dkNfzFLZIWCTQuxKOQi', '563', 'Sitapura jaipur', '19', 'Jaipur', 0, '0830 4567 3384', '18.56', '18.365'),
(85, 'bd', '$2b$10$hBE.rwFxUn6dOGJdn8Y9..ruDEAyYQEBjbE26.AjnbdDskC/thCn2', '564', 'fcuy COLONY', '19', 'Jaipur', 0, '+918302973384', '29.56', '26.365'),
(86, 'few', '$2b$10$oJxnNvUV1NP6wafK0kOfPukPvZLWH1garwjelJb0uolRg17KpA6Ey', '566', 'wevacs', 'MEGHALAYA', 'South Garo Hills', 0, '7856321490', '28.56', '26.365');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `url` varchar(2083) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `url`) VALUES
(1, '1'),
(2, '1'),
(3, '1'),
(4, '1'),
(5, '1'),
(6, '1'),
(7, '1'),
(8, '1'),
(9, '1'),
(10, '1'),
(11, '1'),
(12, '1'),
(13, '1'),
(14, '1'),
(15, '1'),
(18, '/img/club/banner/1681036670080-142611899.png'),
(19, '/img/club/banner/1680002649497-947677478.jfif'),
(20, '/img/club/banner/1680080867994-182819922.jfif'),
(21, '/img/club/banner/1680080994746-881399562.png'),
(22, '/img/club/banner/1680081253038-866763209.jfif'),
(24, '/img/enquires/1690900540943-691904243.jpg'),
(25, '/img/club/banner/1680082602437-148513767.jfif'),
(26, '/img/club/banner/1680082625010-403235878.jfif'),
(27, '/img/club/banner/1680082645348-200596505.jfif'),
(28, '/img/club/banner/1680082719856-68965477.jfif'),
(29, '/img/club/banner/1680082747570-959038643.jpg'),
(30, '/img/club/banner/1680083030473-150312863.jpg'),
(31, '/img/club/banner/1680083225114-723462640.jpg'),
(32, '/img/club/banner/1680083286329-466421373.jpg'),
(33, '/img/club/banner/1680083729082-743999640.jfif'),
(34, '/img/club/banner/1680084011657-61462162.jfif'),
(35, '/img/club/banner/1680084580076-763425369.jpg'),
(36, '/img/club/banner/1680090479214-918447423.jfif'),
(37, '/img/club/banner/1680091375622-936108648.png'),
(38, '/img/club/banner/1680176904653-979982814.png'),
(39, '/img/club/banner/1680248090562-583034482.jfif'),
(40, '/img/club/banner/1680248105689-975288714.jfif'),
(41, '/img/club/banner/1680248127377-370775027.jfif'),
(42, '/img/club/banner/1680248330476-386049393.jfif'),
(43, '/img/club/banner/1680248352705-753248654.jfif'),
(44, '/img/club/gallery/1680248352709-525806399.jfif'),
(45, '/img/club/gallery/1680248352711-472269087.png'),
(46, '/img/club/gallery/1680248352718-848316330.jfif'),
(47, '/img/club/gallery/1680248352719-114248006.jfif'),
(48, '/img/club/gallery/1680248352724-183194508.jfif'),
(49, '/img/club/banner/1680251485229-29122956.jfif'),
(50, '/img/club/gallery/1680251485238-871124464.jfif'),
(51, '/img/club/gallery/1680251485236-488491396.jfif'),
(52, '/img/club/gallery/1680251485241-957341712.jfif'),
(53, '/img/club/gallery/1680251485242-798692691.png'),
(54, '/img/club/gallery/1680251485249-52102948.jfif'),
(55, '/img/club/banner/1680251794484-461231484.jfif'),
(56, '/img/club/gallery/1680251794488-814857257.jfif'),
(57, '/img/club/gallery/1680251794489-747197163.jfif'),
(58, '/img/garage/profile/1682084431591-198920594.jfif'),
(59, '/img/club/gallery/1680251794490-145535979.png'),
(60, '/img/club/gallery/1680251794494-532957487.jfif'),
(61, '/img/club/banner/1680251818408-72694041.jfif'),
(62, '/img/club/gallery/1680251818412-141218082.jfif'),
(63, '/img/club/gallery/1680251818414-112204109.jfif'),
(64, '/img/club/gallery/1680251818413-447559984.jfif'),
(65, '/img/club/gallery/1680251818415-131999053.png'),
(66, '/img/club/gallery/1680251818418-391949457.jfif'),
(67, '/img/club/banner/1680251859174-203197802.jfif'),
(68, '/img/club/gallery/1680251859179-26035889.jfif'),
(69, '/img/club/gallery/1680251859181-874279832.jfif'),
(70, '/img/club/gallery/1680251859180-76766387.jfif'),
(71, '/img/club/gallery/1680251859181-15589334.png'),
(72, '/img/club/gallery/1680251859188-518229764.jfif'),
(73, '/img/club/banner/1680251980107-738981439.jfif'),
(74, '/img/club/gallery/1680251980113-992249740.jfif'),
(75, '/img/club/gallery/1680251980114-182949252.jfif'),
(76, '/img/club/gallery/1680251980112-372102605.jfif'),
(77, '/img/club/gallery/1680251980114-116265750.png'),
(78, '/img/club/gallery/1680251980118-708470288.jfif'),
(79, '/img/club/banner/1680252029163-159733297.jfif'),
(80, '/img/club/gallery/1680252029168-995360220.jfif'),
(81, '/img/club/gallery/1680252029170-681973353.jfif'),
(82, '/img/club/gallery/1680252029169-439932543.jfif'),
(83, '/img/club/gallery/1680252029170-259541584.png'),
(84, '/img/club/gallery/1680252029174-148224924.jfif'),
(85, '/img/club/banner/1680252094228-358050058.jfif'),
(86, '/img/club/gallery/1680252094233-22408301.jfif'),
(87, '/img/club/gallery/1680252094234-269979251.jfif'),
(88, '/img/club/gallery/1680252094236-377459064.jfif'),
(89, '/img/club/gallery/1680252094236-929872727.png'),
(90, '/img/club/gallery/1680252094239-347640733.jfif'),
(91, '/img/club/banner/1680252111784-890363573.jfif'),
(92, '/img/club/gallery/1680252111788-906156607.jfif'),
(93, '/img/club/gallery/1680252111789-706276618.jfif'),
(94, '/img/club/gallery/1680252111791-35054607.jfif'),
(95, '/img/club/gallery/1680252111791-687003741.png'),
(96, '/img/club/gallery/1680252111795-834094459.jfif'),
(97, '/img/club/banner/1680255052416-529070048.jpg'),
(98, '/img/club/gallery/1680255052423-813251512.jfif'),
(99, '/img/club/gallery/1680255052419-459771225.jfif'),
(100, '/img/club/gallery/1680255052423-204623648.jfif'),
(101, '/img/club/gallery/1680255052423-55476059.jfif'),
(102, '/img/club/banner/1680255134433-539518138.jpg'),
(103, '/img/club/gallery/1680255134438-985250982.jfif'),
(104, '/img/club/gallery/1680255134441-441376332.jfif'),
(105, '/img/club/gallery/1680255134441-45049850.jfif'),
(106, '/img/club/gallery/1680255134441-312484050.jfif'),
(107, '/img/club/banner/1680255156642-628662569.jpg'),
(108, '/img/club/gallery/1680255156650-74922958.jfif'),
(109, '/img/club/gallery/1680255156647-879291624.jfif'),
(110, '/img/club/gallery/1680255156650-743121063.jfif'),
(111, '/img/club/gallery/1680255156650-6003222.jfif'),
(112, '/img/club/banner/1680255176061-145938014.jfif'),
(113, '/img/club/gallery/1680255176068-125329319.jfif'),
(114, '/img/club/banner/1680255306208-502193256.jfif'),
(115, '/img/club/gallery/1680255306214-63054669.jfif'),
(116, '/img/club/banner/1680255332639-389586085.jfif'),
(117, '/img/club/gallery/1680255332640-101817776.png'),
(118, '/img/club/banner/1680255394920-74126651.jfif'),
(119, '/img/club/gallery/1680255394920-905410878.jpg'),
(120, '/img/club/gallery/1680255394940-359349690.jfif'),
(121, '/img/club/gallery/1680255394943-960780297.png'),
(122, '/img/club/gallery/1680255394946-371106737.jfif'),
(123, '/img/club/banner/1680255439825-3164197.jfif'),
(124, '/img/club/gallery/1680255439826-635253709.jpg'),
(125, '/img/club/gallery/1680255439836-563599729.jfif'),
(126, '/img/club/gallery/1680255439837-57132868.png'),
(127, '/img/club/gallery/1680255439839-299481967.jfif'),
(128, '/img/club/banner/1680255456211-639817921.jfif'),
(129, '/img/club/gallery/1680255456222-336965763.jfif'),
(130, '/img/club/gallery/1680255456212-280554179.jpg'),
(131, '/img/club/gallery/1680255456223-939173327.png'),
(132, '/img/club/gallery/1680255456225-267307744.jfif'),
(133, '/img/club/banner/1680255537837-163691102.jfif'),
(134, '/img/club/gallery/1680255537838-556753196.jpg'),
(135, '/img/club/gallery/1680255537847-323211069.jfif'),
(136, '/img/club/gallery/1680255537849-452184521.png'),
(137, '/img/club/gallery/1680255537850-49350641.jfif'),
(138, '/img/club/banner/1680255613666-335065084.jfif'),
(139, '/img/club/gallery/1680255613676-304149655.jfif'),
(140, '/img/club/gallery/1680255613667-137800357.jpg'),
(141, '/img/club/gallery/1680255613678-151743326.png'),
(142, '/img/club/gallery/1680255613679-904970473.jfif'),
(143, '/img/club/banner/1680255655014-742134238.jfif'),
(144, '/img/club/gallery/1680255655015-56849906.jpg'),
(145, '/img/club/gallery/1680255655025-805376588.jfif'),
(146, '/img/club/gallery/1680255655026-972338345.png'),
(147, '/img/club/gallery/1680255655027-473451175.jfif'),
(148, '/img/garage/profile/1682082334615-303540473.jfif'),
(149, '/img/club/gallery/1680255721526-340876698.png'),
(150, '/img/club/banner/1680255750007-103495633.jfif'),
(151, '/img/club/gallery/1680255750008-625013700.jfif'),
(152, '/img/club/gallery/1680255750008-21726221.jfif'),
(153, '/img/club/gallery/1680255750011-923738395.jfif'),
(154, '/img/club/gallery/1680255750011-766820571.jfif'),
(155, '/img/club/banner/1680255820434-701208177.jfif'),
(156, '/img/club/gallery/1680255820435-675115609.jfif'),
(157, '/img/club/gallery/1680255820437-595958415.jfif'),
(158, '/img/club/gallery/1680255820441-818569886.jfif'),
(159, '/img/club/gallery/1680255820442-696900246.jfif'),
(160, '/img/club/banner/1680255867840-615881066.jfif'),
(161, '/img/club/gallery/1680255867846-128965780.jfif'),
(162, '/img/club/gallery/1680255867841-24906674.jfif'),
(163, '/img/club/gallery/1680255867843-184323991.jfif'),
(164, '/img/club/gallery/1680255867846-317939814.jfif'),
(165, '/img/club/banner/1680255944393-498586471.jfif'),
(166, '/img/club/gallery/1680255944393-282421786.jfif'),
(167, '/img/club/gallery/1680255944397-106749913.jfif'),
(168, '/img/club/gallery/1680255944399-178455412.jfif'),
(169, '/img/club/gallery/1680255944400-782419204.jfif'),
(170, '/img/club/banner/1680255980657-216030763.jfif'),
(171, '/img/club/gallery/1680255980659-720018687.png'),
(172, '/img/club/banner/1680256007157-294177185.jfif'),
(173, '/img/club/gallery/1680256007158-190091508.png'),
(174, '/img/club/banner/1680256059232-58955724.jfif'),
(175, '/img/club/gallery/1680256059240-223772091.jfif'),
(176, '/img/club/gallery/1680256059232-423128167.jpg'),
(177, '/img/club/gallery/1680256059241-359210141.png'),
(178, '/img/club/gallery/1680256059243-444735298.jfif'),
(179, '/img/club/banner/1680256176757-989164604.jfif'),
(180, '/img/club/gallery/1680256176766-523639085.jfif'),
(181, '/img/club/gallery/1680256176763-54003978.png'),
(182, '/img/club/gallery/1680256176764-705231102.jfif'),
(183, '/img/club/gallery/1680256176765-213084765.jfif'),
(184, '/img/club/gallery/1680256176767-276450391.jfif'),
(185, '/img/club/banner/1680258056887-74167594.jfif'),
(186, '/img/club/gallery/1680258056892-933888312.jfif'),
(187, '/img/club/gallery/1680258056889-39534539.png'),
(188, '/img/club/gallery/1680258056897-779234664.png'),
(189, '/img/club/gallery/1680258056922-439297956.jfif'),
(190, '/img/club/gallery/1680258056923-59091535.png'),
(191, '/img/club/banner/1680264671452-856994024.jfif'),
(192, '/img/club/gallery/1680264671453-212692376.jfif'),
(193, '/img/club/gallery/1680264671457-405790632.jfif'),
(194, '/img/club/gallery/1680264671457-117109811.jfif'),
(195, '/img/club/gallery/1680264671458-752076117.jfif'),
(196, '/img/club/gallery/1680264671465-669312175.png'),
(197, '/img/club/banner/1680264712679-237892110.jfif'),
(198, '/img/club/gallery/1680264712684-222522607.jfif'),
(199, '/img/club/gallery/1680264712683-96115242.jfif'),
(200, '/img/club/gallery/1680264712680-196076571.jfif'),
(201, '/img/club/gallery/1680264712684-796252117.jfif'),
(202, '/img/club/gallery/1680264712687-432369186.png'),
(203, '/img/club/banner/1680688547839-836210456.jfif'),
(204, '/img/club/gallery/1680688547840-851970270.png'),
(205, '/img/club/gallery/1680688547852-150811692.jfif'),
(206, '/img/club/gallery/1680688547853-302915417.png'),
(207, '/img/club/banner/1680688627033-292809525.jfif'),
(208, '/img/club/banner/1680688671807-726268364.jfif'),
(209, '/img/club/gallery/1680688671813-165152720.jfif'),
(210, '/img/club/gallery/1680688671811-995958463.jfif'),
(211, '/img/club/banner/1680688820282-204803672.jfif'),
(212, '/img/club/gallery/1680688820288-569341279.jfif'),
(213, '/img/club/gallery/1680688820290-697171461.jfif'),
(214, '/img/club/banner/1680688921189-264417084.jfif'),
(215, '/img/club/gallery/1680688921196-192491215.jfif'),
(216, '/img/club/gallery/1680688921193-171811098.jfif'),
(217, '/img/club/banner/1680688936929-224654099.jfif'),
(218, '/img/club/gallery/1680688936936-71907742.jfif'),
(219, '/img/club/gallery/1680688936933-938870542.jfif'),
(220, '/img/club/banner/1680688974721-126903621.jfif'),
(221, '/img/club/gallery/1680688974728-492571158.jfif'),
(222, '/img/club/gallery/1680688974725-8331201.jfif'),
(223, '/img/club/banner/1680689161081-822038299.jfif'),
(224, '/img/club/gallery/1680689161088-544465937.jfif'),
(225, '/img/club/gallery/1680689161085-88774127.jfif'),
(227, '/img/club/gallery/1680855271260-150093955.png'),
(228, '0'),
(229, '/img/club/gallery/1680784848660-891613387.jfif'),
(230, '/img/club/gallery/1680784848663-104386043.jfif'),
(231, '/img/club/gallery/1680784848664-227954956.jfif'),
(232, '/img/club/gallery/1680785376342-166083998.jfif'),
(233, '/img/club/gallery/1680785376337-560980313.jfif'),
(234, '/img/club/gallery/1680785376343-437840442.jfif'),
(235, '/img/club/gallery/1680785506346-694471745.jfif'),
(236, '/img/club/gallery/1680785506347-211784576.jfif'),
(237, '/img/club/gallery/1680785506342-303697506.jfif'),
(238, '/img/club/gallery/1680786249145-760906837.jfif'),
(239, '/img/club/gallery/1680786249152-21727281.jfif'),
(240, '/img/club/gallery/1680786249153-583841839.jfif'),
(241, '/img/club/gallery/1680786429961-104585647.jfif'),
(242, '/img/club/gallery/1680786429966-583464197.jfif'),
(243, '/img/club/gallery/1680786429966-259345389.jfif'),
(244, '/img/club/gallery/1680786608041-64850449.jfif'),
(245, '/img/club/gallery/1680786608047-849628661.jfif'),
(246, '/img/club/gallery/1680786608048-862872372.jfif'),
(247, '/img/club/gallery/1680787043281-157801372.jfif'),
(248, '/img/club/gallery/1680787043286-896983920.jfif'),
(249, '/img/club/gallery/1680787043287-74859842.jfif'),
(250, '/img/club/gallery/1680787094622-254206091.jfif'),
(251, '/img/club/gallery/1680787094618-740588903.jfif'),
(252, '/img/club/gallery/1680787094623-333881338.jfif'),
(253, '/img/club/gallery/1680787573500-841971563.jfif'),
(254, '/img/club/gallery/1680787573506-615085416.jfif'),
(255, '/img/club/gallery/1680787573507-318968428.jfif'),
(256, '/img/club/gallery/1680787878473-202477230.jfif'),
(257, '/img/club/gallery/1680787878478-384623295.jfif'),
(258, '/img/club/gallery/1680787878477-364306542.jfif'),
(259, '/img/club/gallery/1680787893871-762545460.jfif'),
(260, '/img/club/gallery/1680787893877-504754932.jfif'),
(261, '/img/club/gallery/1680787893876-1691390.jfif'),
(262, '/img/club/gallery/1680788389034-821981040.jfif'),
(263, '/img/club/gallery/1680788389038-485341817.jfif'),
(264, '/img/club/gallery/1680788389039-107441152.jfif'),
(265, '/img/club/gallery/1680788436241-118807575.jfif'),
(266, '/img/club/gallery/1680788436245-515867829.jfif'),
(267, '/img/club/gallery/1680788436246-552227031.jfif'),
(268, '/img/club/gallery/1680788453716-187159250.jfif'),
(269, '/img/club/gallery/1680788453710-221964307.jfif'),
(270, '/img/club/gallery/1680788453717-563822809.jfif'),
(271, '/img/club/gallery/1680788493939-871204675.jfif'),
(272, '/img/club/gallery/1680788493935-378799886.jfif'),
(273, '/img/club/gallery/1680788493940-280838724.jfif'),
(274, '/img/club/gallery/1680788594020-305029366.jfif'),
(275, '/img/club/gallery/1680788594016-945545980.jfif'),
(276, '/img/club/gallery/1680788594020-448038436.jfif'),
(277, '/img/club/gallery/1680788733192-712950407.jfif'),
(278, '/img/club/gallery/1680788733196-39170129.jfif'),
(279, '/img/club/gallery/1680788733197-636577740.jfif'),
(280, '0'),
(281, '/img/club/gallery/1680855271258-381444675.gif'),
(282, '/img/club/gallery/1680855271263-398856775.jfif'),
(283, '/img/club/gallery/1680855493284-112460148.gif'),
(284, '/img/club/gallery/1680855493285-226099251.png'),
(285, '/img/club/gallery/1680855493287-405925067.jfif'),
(286, '/img/club/gallery/1680855523729-528938240.jpg'),
(287, '/img/club/gallery/1680855523708-425402146.jpg'),
(288, '/img/club/gallery/1680855523739-16435616.jfif'),
(289, '/img/club/gallery/1680855523741-297699786.png'),
(290, '/img/club/gallery/1680855523743-928706962.jfif'),
(291, '/img/club/gallery/1680855566670-575031905.jpg'),
(292, '/img/club/gallery/1680855566679-453972970.jpg'),
(293, '/img/club/gallery/1680855566685-9079802.jfif'),
(294, '/img/club/gallery/1680855566686-541041611.png'),
(295, '/img/club/gallery/1680855566688-40888013.jfif'),
(296, '/img/club/gallery/1680855602810-609321005.jpg'),
(297, '/img/club/gallery/1680855602837-863681621.jfif'),
(298, '/img/club/gallery/1680855602827-796119520.jpg'),
(299, '/img/club/gallery/1680855602839-371450459.png'),
(300, '/img/club/gallery/1680855602841-159525116.jfif'),
(301, '/img/club/gallery/1680855675782-93806018.jpg'),
(302, '/img/club/gallery/1680855675808-785576215.jfif'),
(303, '/img/club/gallery/1680855675801-239184613.jpg'),
(304, '/img/club/gallery/1680855675809-743836795.png'),
(305, '/img/club/gallery/1680855675810-603500953.jfif'),
(306, '/img/club/gallery/1680855926188-121550891.jpg'),
(307, '/img/club/gallery/1680855926200-900379605.jpg'),
(308, '/img/club/gallery/1680855926204-494113151.jfif'),
(309, '/img/club/gallery/1680855926205-380804536.png'),
(310, '/img/club/gallery/1680855926207-67591435.jfif'),
(311, '/img/club/gallery/1680856203755-199852350.jpg'),
(312, '/img/club/gallery/1680856203765-18337526.jpg'),
(313, '/img/club/gallery/1680856203771-934874397.jfif'),
(314, '/img/club/gallery/1680856203772-752128025.png'),
(315, '/img/club/gallery/1680856203775-113528395.jfif'),
(316, '/img/club/gallery/1680856568236-670815137.jfif'),
(317, '/img/club/gallery/1680856568214-994671336.jpg'),
(318, '/img/club/gallery/1680856568227-423962786.jpg'),
(319, '/img/club/gallery/1680856568238-68153720.png'),
(320, '/img/club/gallery/1680856568239-130558325.jfif'),
(321, '/img/club/gallery/1680856594051-793639156.jpg'),
(322, '/img/club/gallery/1680856594064-643400135.jpg'),
(323, '/img/club/gallery/1680856594068-375845201.jfif'),
(324, '/img/club/gallery/1680856594069-140897855.png'),
(325, '/img/club/gallery/1680856594071-777682365.jfif'),
(326, '/img/club/gallery/1680856909740-111194561.jpg'),
(327, '/img/club/gallery/1680856909747-400312164.jfif'),
(328, '/img/club/gallery/1680856909749-375595343.png'),
(329, '/img/club/gallery/1680856933338-414225664.png'),
(330, '/img/club/gallery/1680856933343-859687044.jfif'),
(331, '/img/club/gallery/1680856933343-651855357.png'),
(332, '0'),
(333, '/img/club/gallery/1680857040893-611833289.png'),
(334, '/img/club/gallery/1680857040898-429482915.jfif'),
(335, '/img/club/gallery/1680857891465-406308303.gif'),
(336, '/img/club/gallery/1680857891467-998668227.png'),
(337, '/img/club/gallery/1680857891469-484390249.jfif'),
(338, '/img/club/gallery/1680859480973-454518758.jfif'),
(339, '/img/club/gallery/1680859480977-593193358.png'),
(340, '/img/club/gallery/1680859480982-103167054.jfif'),
(341, '/img/club/gallery/1680859521053-284068385.jfif'),
(342, '/img/club/gallery/1680859521060-683869884.jfif'),
(343, '/img/club/gallery/1680859521057-529592051.png'),
(344, '/img/club/gallery/1680859541788-934891757.jfif'),
(345, '/img/club/gallery/1680859541793-470911884.png'),
(346, '/img/club/gallery/1680859541800-773808875.jfif'),
(347, '/img/club/gallery/1680859564788-423417395.jfif'),
(348, '/img/club/gallery/1680859564792-646545018.png'),
(349, '/img/club/gallery/1680859564794-855307707.jfif'),
(350, '/img/club/gallery/1680859619249-513374064.png'),
(351, '/img/club/gallery/1680859619245-628903213.jfif'),
(352, '/img/club/gallery/1680859619251-459716956.jfif'),
(353, '/img/club/gallery/1680859839205-121833775.jpg'),
(354, '/img/club/gallery/1680859839226-658733641.jpg'),
(355, '/img/club/gallery/1680859839241-137818644.jfif'),
(356, '/img/club/gallery/1680859839243-634337564.png'),
(357, '/img/club/gallery/1680860131976-423030392.gif'),
(358, '/img/club/gallery/1680860131978-695682058.png'),
(359, '/img/club/gallery/1680860131980-49655178.jfif'),
(360, '/img/club/gallery/1680860131983-900781911.jfif'),
(361, '0'),
(362, '0'),
(363, '0'),
(364, '/img/club/gallery/1680893274510-896491477.jfif'),
(365, '/img/club/gallery/1680893393688-207950084.png'),
(366, '0'),
(367, '0'),
(368, '/img/club/gallery/1681036717013-727359455.jfif'),
(369, '/img/club/gallery/1681036717021-852189692.jfif'),
(370, '/img/club/gallery/1681036717023-722205740.jfif'),
(371, '0'),
(372, '/img/club/banner/1681050003399-215719830.jpg'),
(373, '/img/club/gallery/1681050003418-31638331.png'),
(374, '/img/club/gallery/1681050003424-802646681.jfif'),
(375, '/img/club/gallery/1681050003406-363349395.jpg'),
(376, '/img/club/gallery/1681050003417-430012089.jfif'),
(377, '/img/club/gallery/1681050003419-157907319.png'),
(378, '0'),
(379, '/img/club/gallery/1681050003414-921497882.jpg'),
(380, '/img/club/gallery/1681050003424-951488982.png'),
(381, '/img/vendors/hostImage/1681127031671-264442211.jfif'),
(382, '/img/vendors/banner/1681127031671-264442211.jfif'),
(383, '/img/vendors/gallery/1681127031673-892236235.jfif'),
(384, '/img/vendors/gallery/1681127031676-706547150.jfif'),
(385, '/img/vendors/gallery/1681127031679-901643600.jfif'),
(386, '/img/vendors/hostImage/1681127099862-461121551.jfif'),
(387, '/img/vendors/banner/1681127099862-461121551.jfif'),
(388, '/img/vendors/gallery/1681127099863-802538150.jfif'),
(389, '/img/vendors/gallery/1681127099866-351726252.jfif'),
(390, '/img/vendors/gallery/1681127099864-190896457.jfif'),
(391, '/img/vendors/hostImage/1681131690088-242922587.jfif'),
(392, '/img/vendors/banner/1681131690088-242922587.jfif'),
(393, '/img/vendors/gallery/1681131690089-738297670.jfif'),
(394, '/img/vendors/gallery/1681131690092-632672803.jfif'),
(395, '/img/vendors/gallery/1681131690097-27119410.jfif'),
(396, '/img/vendors/hostImage/1681131699015-381501937.jfif'),
(397, '/img/vendors/banner/1681131699015-381501937.jfif'),
(398, '/img/vendors/gallery/1681131699017-431839151.jfif'),
(399, '/img/vendors/gallery/1681131699018-12585765.jfif'),
(400, '/img/vendors/gallery/1681131699021-633687235.jfif'),
(401, '/img/vendors/hostImage/1681131709153-81950309.jfif'),
(402, '/img/vendors/banner/1681131709153-81950309.jfif'),
(403, '/img/vendors/gallery/1681131709154-893819005.jfif'),
(404, '/img/vendors/gallery/1681131709154-516799981.jfif'),
(405, '/img/vendors/gallery/1681131709157-835726226.jfif'),
(406, '/img/vendors/hostImage/1681131716254-133786429.jfif'),
(407, '/img/vendors/banner/1681131716254-133786429.jfif'),
(408, '/img/vendors/gallery/1681131716255-757949590.jfif'),
(409, '/img/vendors/gallery/1681131716256-472894740.jfif'),
(410, '/img/vendors/gallery/1681131716257-697515731.jfif'),
(411, '/img/garage/profile/1682081852623-867204367.jfif'),
(412, '/img/garage/profile/1682081919274-471712662.jfif'),
(413, '/img/garage/profile/1682084431591-198920594.jfif'),
(414, '/img/enquires1682326308880-414065119.jfif'),
(415, '/img/enquires1682326336803-883776313.jfif'),
(416, '/img/enquires1682326373567-913591084.jfif'),
(417, '/img/enquires/1682326682261-749194053.jfif'),
(418, '/img/garage/profile/undefined'),
(419, '/img/garage/profile/undefined'),
(420, '/img/garage/profile/undefined'),
(421, '/img/garage/profile/undefined'),
(422, '/img/garage/profile/undefined'),
(423, '/img/garage/profile/undefined'),
(424, '/img/garage/profile/undefined'),
(425, '/img/garage/profile/undefined'),
(426, '/img/garage/profile/undefined'),
(427, '/img/garage/profile/undefined'),
(428, '/img/garage/profile/undefined'),
(429, '/img/garage/profile/undefined'),
(430, '/img/garage/profile/undefined'),
(431, '/img/garage/profile/undefined'),
(432, '/img/garage/profile/undefined'),
(433, '/img/garage/profile/undefined'),
(434, '/img/garage/profile/undefined'),
(435, '/img/garage/profile/undefined'),
(436, '/img/garage/profile/undefined'),
(437, '/img/enquires/1683178604036-668797434.jpeg'),
(438, '/img/enquires/1683178661917-284729761.jpeg'),
(439, '/../img/enquires/1683179852661-374060785.jpeg'),
(440, '/../img/enquires/1683179921336-821461147.jpeg'),
(441, '/../img/enquires/1683180006069-484747456.jpeg'),
(442, '/../img/enquires/1683180040826-470873851.jpeg'),
(443, '/../img/enquires/1683180161658-513351552.jpeg'),
(444, '/../img/enquires/1683180203360-454124480.jpeg'),
(445, '/../img/enquires/1683180235977-329198220.jpeg'),
(446, '/../img/enquires/1683182483655-841509422.jpeg'),
(447, '/../img/enquires/1683182511072-432931832.jpeg'),
(448, '/../img/enquires/1683182838549-120646938.jpeg'),
(449, '/../img/enquires/1683182924401-333415896.jpeg'),
(450, '/../img/enquires/1683182966096-236815515.jpeg'),
(451, '/../img/enquires/1683182989838-408195076.jpeg'),
(452, '/../img/enquires/1683183420233-644245683.jpeg'),
(453, '/../img/enquires/1683183450498-185354723.jpeg'),
(454, '/../img/enquires/1683183488581-325739450.jpeg'),
(455, '/../img/enquires/1683183529849-149450989.jpeg'),
(456, '/../img/enquires/1683183545779-757521101.jpeg'),
(457, '/../img/enquires/1683184378297-529735397.jpeg'),
(458, '/../img/enquires/1683184565520-819877036.jpeg'),
(459, '/../img/enquires/1683184590083-222911189.jpeg'),
(460, '/../img/enquires/1683184652910-193675914.jpeg'),
(461, '/../img/enquires/1683184669726-127685579.jpeg'),
(462, '/../img/enquires/1683184702264-67577373.jpeg'),
(463, '/../img/enquires/1683184759490-985014804.jpeg'),
(464, '/../img/enquires/1683184766166-272515970.jpeg'),
(465, '/../img/enquires/1683184802511-208500366.jpeg'),
(466, '/../img/enquires/1683184842703-543908151.jpeg'),
(467, '/../img/enquires/1683184902588-662650159.jpeg'),
(468, '/../img/enquires/1683185171830-838459567.jpeg'),
(469, '/../img/enquires/1683185320875-552836443.jpeg'),
(470, '/../img/enquires/1683188288682-734713677.jpeg'),
(471, '/../img/enquires/1683189638915-969235832.jpeg'),
(472, '../../img/garage/profile/1683189990775-201939376.jpeg'),
(473, '../../img/garage/profile/1683190029441-720193595.jpeg'),
(474, '../../img/garage/profile/1683190084472-387231255.jpeg'),
(475, '../../img/garage/profile/1683190826128-761758280.jpeg'),
(476, '../../img/garage/profile/1683192335198-727626075.jpeg'),
(477, '../../img/garage/profile/1683192726183-998968414.jpeg'),
(478, '../../img/garage/profile/1683227333068-969117452.jpg'),
(479, '../../img/garage/profile/1683227368378-544665626.jpg'),
(480, '../../img/garage/profile/1683227415009-895691822.jpg'),
(481, '../../img/garage/profile/1683260516370-741455237.jpg'),
(482, '../../img/garage/profile/1683260908636-508277823.jpg'),
(483, '../../img/garage/profile/1683261217986-913781111.jpg'),
(484, '/../img/enquires/1683288738409-591757230.jpeg'),
(485, '/../img/enquires/1683288738418-143734524.jpg'),
(486, '/../img/enquires/1683288953782-749716678.jpeg'),
(487, '/../img/enquires/1683288953790-404974473.jpg'),
(488, '/../img/enquires/1683288962278-550845067.jpeg'),
(489, '/../img/enquires/1683288962285-539596960.jpg'),
(490, '/../img/enquires/1683288972131-690957855.jpg'),
(491, '/../img/enquires/1683288972120-608541004.jpeg'),
(492, '/../img/enquires/1683288994128-283298219.jpeg'),
(493, '/../img/enquires/1683288994139-400995454.jpg'),
(494, '/../img/enquires/1683289153449-366509862.jpeg'),
(495, '/../img/enquires/1683289153463-683554364.jpg'),
(496, '/../img/enquires/1683289182867-893450168.jpeg'),
(497, '/../img/enquires/1683289182887-116070441.jpg'),
(498, '/../img/enquires/1683289190799-424803088.jpeg'),
(499, '/../img/enquires/1683289190805-964972797.jpg'),
(500, '/../img/enquires/1683291714150-22676122.jpg'),
(501, '/../img/enquires/1683291714160-970652120.jpg'),
(502, '/../img/enquires/1683291791511-302111276.jpg'),
(503, '/../img/enquires/1683291791515-991834531.jpg'),
(504, '/../img/enquires/1683291881402-94142993.jpg'),
(505, '/../img/enquires/1683291881409-890281903.jpg'),
(506, '/../img/enquires/1683292062974-850343787.jpg'),
(507, '/../img/enquires/1683292675722-193890055.jpg'),
(508, '/../img/enquires/1683292695811-312661949.jpg'),
(509, '/../img/enquires/1683292852130-897265693.jpg'),
(510, '/../img/enquires/1683292898134-614709986.jpg'),
(511, '/../img/enquires/1683292975597-967719019.jpg'),
(512, '/../img/enquires/1683292976264-247779200.jpg'),
(513, '/../img/enquires/1683293065104-789342387.jpg'),
(514, '/../img/enquires/1683293065094-203114180.jpeg'),
(515, '/../img/enquires/1683293073781-914088305.jpeg'),
(516, '/../img/enquires/1683293073792-12693643.jpg'),
(517, '/../img/enquires/1683293145744-742452079.jpeg'),
(518, '/../img/enquires/1683293145750-137568119.jpg'),
(519, '/../img/enquires/1683293198022-729124560.jpeg'),
(520, '/../img/enquires/1683293388209-338331112.jpg'),
(521, '/../img/enquires/1683293412267-488369785.jpg'),
(522, '/../img/enquires/1683293539796-683845224.jpg'),
(523, '/../img/enquires/1683294204203-80203721.jpg'),
(524, '/../img/enquires/1683294204219-604182484.jpg'),
(525, '/../img/enquires/1683298837537-457235828.jpg'),
(526, '/../img/enquires/1683298837549-919665495.jpg'),
(527, '/../img/enquires/1683299387584-913952340.jpg'),
(528, '/../img/enquires/1683299388272-221067161.jpg'),
(529, '/../img/enquires/1683389209380-608902022.jpg'),
(530, '/../img/enquires/1683389209384-339078369.jpg'),
(531, '/../img/enquires/1683389301827-386207424.jpg'),
(532, '/../img/enquires/1683389301835-973453140.jpg'),
(533, '/../img/enquires/1683683615684-910974326.jpg'),
(534, '/../img/enquires/1683683615694-478323067.jpg'),
(535, '/../img/enquires/1683683621664-729981047.jpg'),
(536, '/../img/enquires/1683683621642-95356648.jpg'),
(537, '/../img/enquires/1683685989042-815181198.jpg'),
(538, '/../img/enquires/1683685989097-459013777.jpg'),
(539, '/../img/enquires/1683685989047-25956497.jpg'),
(540, '/../img/enquires/1683685989120-779238666.jpg'),
(541, '/../img/enquires/1683698754151-236810203.jpg'),
(542, '/../img/enquires/1683698754344-913283234.jpg'),
(543, '/img/garage/profile/1690790570441-629969362.jpg'),
(544, '/img/garage/profile/1690871361670-53533101.jpg'),
(545, '/img/garage/profile/1690871503152-371881100.png'),
(546, '/img/garage/profile/1690882209786-512674085.jpg'),
(547, '/img/enquires/1690899872511-263542952.jpg'),
(548, '/img/enquires/1690900138248-957787693.jpg'),
(549, '/img/enquires/1690900540943-691904243.jpg'),
(550, '/img/enquires/1691563336923-91082449.png'),
(551, '/img/enquires/1690900844336-148065425.jpg'),
(552, '/img/enquires/1690900969819-580460558.jpg'),
(553, '/img/garage/profile/1691067561763-945254600.jpg'),
(554, '/img/enquires/1691068305436-39145816.jpg'),
(555, '/img/enquires/1691068426687-360403705.jpg'),
(556, '/img/enquires/1691070023278-935494032.png'),
(557, '/img/enquires/1691070180238-455598492.png'),
(558, '/img/enquires/1691070277171-27301146.png'),
(559, '/img/enquires/1691070375674-384008794.jpg'),
(560, '/img/enquires/1691072377007-127929739.png'),
(561, '/img/enquires/1691072476777-752474240.png'),
(562, '/img/enquires/1691072611799-858515316.png'),
(563, '/img/garage/profile/1691072906152-414122605.jpg'),
(564, '/img/garage/profile/1691576932494-598512687.jpg'),
(565, '/img/garage/profile/1691577140241-495797448.jpg'),
(566, '/img/garage/profile/1691577208947-159848011.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `left_axel_price` int(11) NOT NULL,
  `left_axel_inventory` int(11) NOT NULL,
  `right_axel_price` int(11) NOT NULL,
  `right_axel_inventory` int(11) NOT NULL,
  `subadmin_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `car_id`, `left_axel_price`, `left_axel_inventory`, `right_axel_price`, `right_axel_inventory`, `subadmin_id`, `date`) VALUES
(2, 5, 5000, 2988, 5000, 5060, 2, '2023-08-10 18:06:41'),
(14, 4, 56948, 46468, 46464, 46497, 9, '2023-08-10 18:06:41'),
(15, 9, 588386, 686585, -82, 5868, 11, '2023-08-10 18:06:41'),
(16, 1, 15000, 566, 16000, 500, 4, '2023-08-10 18:06:41'),
(17, 1, 15000, 566, 16000, 500, 9, '2023-08-10 18:06:41'),
(18, 1, 15000, 566, 16000, 500, 4, '2023-08-10 18:06:41'),
(19, 1, 15000, 566, 16000, 500, 4, '2023-08-10 18:06:41'),
(20, 326, 15000, 456, 28000, 500, 12, '2023-08-10 18:06:41'),
(21, 325, 15000, 566, 16000, 500, 16, '2023-08-10 18:06:41'),
(22, 322, 15000, 566, 16000, 500, 1, '2023-08-10 18:06:41'),
(23, 325, 15000, 7166, 16000, 2500, 21, '2023-08-13 18:30:08'),
(24, 324, 15000, 566, 16000, 1100, 14, '2023-08-13 18:58:13');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `category_name` varchar(30) NOT NULL,
  `company_name` varchar(30) NOT NULL,
  `car_name` varchar(30) NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_name`, `company_name`, `car_name`, `price`) VALUES
(15, 'Engine', 'Suzuki', 'shift dzire', 569320),
(16, 'Wheel', 'TATA', 'Nexon', 15896),
(17, 'Head light', 'Honda', 'i20', 2600);

-- --------------------------------------------------------

--
-- Table structure for table `products_enquires`
--

CREATE TABLE `products_enquires` (
  `id` int(11) NOT NULL,
  `garage_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `state` varchar(30) DEFAULT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products_enquires`
--

INSERT INTO `products_enquires` (`id`, `garage_id`, `category_id`, `company_id`, `car_id`, `state`, `price`) VALUES
(1, 82, 8, 8, 325, 'Rajasthan', 1500),
(3, 82, 8, 2, 326, 'Rajasthan', 2600),
(5, 86, 8, 2, 326, 'MEGHALAYA', 3200);

-- --------------------------------------------------------

--
-- Table structure for table `products_inventory`
--

CREATE TABLE `products_inventory` (
  `id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `subadmin_id` int(11) NOT NULL,
  `inventory` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products_inventory`
--

INSERT INTO `products_inventory` (`id`, `company_id`, `car_id`, `subadmin_id`, `inventory`, `date`, `category_id`) VALUES
(2, 2, 326, 19, 150000, '2023-08-09 16:14:31', 9),
(3, 8, 325, 12, 8563, '2023-08-09 16:26:01', 8),
(4, 1, 324, 21, 2800, '2023-08-18 12:32:08', 7),
(5, 8, 325, 20, 2340, '2023-08-18 12:35:42', 8),
(6, 2, 326, 2, 45630, '2023-08-18 12:44:28', 9);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` int(11) NOT NULL,
  `state` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `states`
--

INSERT INTO `states` (`id`, `state`) VALUES
(1, 'ANDHRA PRADESH'),
(2, 'ASSAM'),
(3, 'ARUNACHAL PRADESH'),
(4, 'BIHAR'),
(5, 'GUJRAT'),
(6, 'HARYANA'),
(7, 'HIMACHAL PRADESH'),
(8, 'JAMMU & KASHMIR'),
(9, 'KARNATAKA'),
(10, 'KERALA'),
(11, 'MADHYA PRADESH'),
(12, 'MAHARASHTRA'),
(13, 'MANIPUR'),
(14, 'MEGHALAYA'),
(15, 'MIZORAM'),
(16, 'NAGALAND'),
(17, 'ORISSA'),
(18, 'PUNJAB'),
(19, 'RAJASTHAN'),
(20, 'SIKKIM'),
(21, 'TAMIL NADU'),
(22, 'TRIPURA'),
(23, 'UTTAR PRADESH'),
(24, 'WEST BENGAL'),
(25, 'DELHI'),
(26, 'GOA'),
(27, 'PONDICHERY'),
(28, 'LAKSHDWEEP'),
(29, 'DAMAN & DIU'),
(30, 'DADRA & NAGAR'),
(31, 'CHANDIGARH'),
(32, 'ANDAMAN & NICOBAR'),
(33, 'UTTARANCHAL'),
(34, 'JHARKHAND'),
(35, 'CHATTISGARH');

-- --------------------------------------------------------

--
-- Table structure for table `subadmins`
--

CREATE TABLE `subadmins` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `city` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subadmins`
--

INSERT INTO `subadmins` (`id`, `name`, `state`, `mobile_number`, `password`, `deleted`, `city`) VALUES
(1, 'Select SubAdmin', '', '', '', 0, NULL),
(2, 'user', 'Punjab', '1234567890', '$2b$10$GXx08pcZeFmQQm0rj0wut.hK3a1QSrQjXvhrWscqVlEPFuuddN50y', 0, NULL),
(3, 'baap', 'RAJASTHAN', '6644884188876452', '$2b$10$s1icm3Fn5smEUVI8IRcD3u9jazpd7pAl4CHedS4h07YrvDtjjSjoG', 0, 'Jalore'),
(4, 'Raju', 'Andaman and Nicobar Islands', '1234567890', '$2b$10$iV0fVr11vi7eynb4KmdwguvZ9JJflJYWNIShyIBlkD/RiBBvvp/Pu', 0, NULL),
(5, 'John Doe', 'West Bengal', '1234567890', '', 0, NULL),
(6, 'subbro', 'Assam', '1234567890', '$2b$10$2ceAD.Ao6TerQfu78nLpP.cyJWZnZ8SG9/6CrVFSSmzZe9r0W0J0G', 0, NULL),
(9, 'Rohan', 'Rajasthan', '8290955338', '$2b$10$QlDc1gBXrT.pENghpZfokeedQeHM60e6zaDK8HvXYnTybSmnckaRW', 0, NULL),
(10, 'Shreyansh', 'Rajasthan', '8290955338', '$2b$10$3.PKDWfSB2.0GzLaPBtTJeb56GJBrWpgvw9FkOwiH5heUoGYIXp1a', 0, NULL),
(11, 'we are here', 'Rajasthan', '7220002814', '$2b$10$jKWzMKFDzztoZnqp0h4m2.ynMOPUwDhkkQu8lrRP.ykmYVGM1SzZG', 0, NULL),
(12, 'Hemant Soni', 'RAJASTHAN', '+918302973389', '$2b$10$wnx22cZM.5c5S6TywczET.v4Pi9L7haIFFFN0qo/DSUvLKs3cLeqm', 0, NULL),
(13, 'Hemant Soni', 'RAJASTHAN', '+918302973384', '$2b$10$Gy3nJtdzcmdSpL0LdIz4qOwmS3zOiVLYSR0piq2cht0dsG7DlDHxO', 0, NULL),
(14, 'Mihir', 'RAJASTHAN', '+918302973856', '$2b$10$BM00qIGGGksBPslZ/at5H.ZBaCCOx.1q4ZYn3iDQAwPuNFHx2FxZy', 0, NULL),
(15, 'Hemanhuhu Soni', 'RAJASTHAN', '+918345673384', '$2b$10$o0l8kRD7a1d/pxD5TdwpRuDvXzRJRmdJa7mzlKuPM1tRO7WImKikW', 0, NULL),
(16, 'MihirSoni', 'RAJASTHAN', '+918307873384', '$2b$10$Dxw7l3AcJjqG9Idjmfgm.uMy8HBL7iX7WIxTJgmmpgKh.NE4D5Skq', 0, NULL),
(17, 'ergvb', 'MIZORAM', '+919929665684', '$2b$10$xBhqA1Tngzc/Q8grbc8b4eQoEW49NCXlDbzyvgUM1er49dieZtkDK', 0, NULL),
(18, 'Mihir Hemu', '19', '8963254170', '$2b$10$mpZ.FCAv6Y5tJIkiTVjEVeHAR/BEUpaGCeGUD/2tuy3h8mEnlxsKa', 0, NULL),
(19, 'Hemagwhgfyut Soni', 'RAJASTHAN', '+918302973384', '$2b$10$8kqCof.qkCkfe4K.3fJzLOJ/hC2ebm.xOZ/vdwIk7mDAseEUky4Ci', 0, 'Jaipur'),
(20, 'HTYU', 'ARUNACHAL PRADESH', '6985231470', '$2b$10$Su6L2XdgpBKMDYk2PJgXZ.JC57tMUYNddcGmE/snE8FRbgRVn2Cv2', 0, 'Lohit'),
(21, 'Rajasthan Sub', 'RAJASTHAN', '9856320147', '$2b$10$H2T6anHixgWflCWdMP8DruPFaeQ0j/WCI0dPK6VMiFQuxPD/pPkHO', 0, 'Jaipur');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(11) NOT NULL,
  `enquiry_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `narration` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `username` varchar(10) NOT NULL,
  `password` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `password`) VALUES
('chintu', 12345),
('[value-1]', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery_boy`
--
ALTER TABLE `delivery_boy`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquires`
--
ALTER TABLE `enquires`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `garages`
--
ALTER TABLE `garages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_enquires`
--
ALTER TABLE `products_enquires`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products_inventory`
--
ALTER TABLE `products_inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subadmins`
--
ALTER TABLE `subadmins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=328;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=604;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `delivery_boy`
--
ALTER TABLE `delivery_boy`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enquires`
--
ALTER TABLE `enquires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `garages`
--
ALTER TABLE `garages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=567;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products_enquires`
--
ALTER TABLE `products_enquires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products_inventory`
--
ALTER TABLE `products_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `subadmins`
--
ALTER TABLE `subadmins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
