-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2016 at 06:34 PM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `temp`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `revision_id` int(10) NOT NULL COMMENT 'is unique in the db',
  `id` int(10) NOT NULL COMMENT 'the real item id (not unique: occurs once for each language)',
  `title` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `sequence` int(10) NOT NULL COMMENT 'item order within its parent (numbers do not need to follow, ''holes'' may occur)',
  `occasie_id` int(10) NOT NULL DEFAULT '0',
  `titel` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `afbeelding` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=583 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`revision_id`, `id`, `title`, `sequence`, `occasie_id`, `titel`, `afbeelding`) VALUES
(4, 2, 'double bell 2', 2, 1, 'double bell 2', 'Euphonium_The_Martin_Handcraft_double_bell_2.JPG'),
(8, 4, 'fgt2', 3, 3, 'fgt2', 'Fagot_Artia_2.JPG'),
(10, 5, 'fgt3', 4, 3, 'fgt3', 'Fagot_Artia_3.JPG'),
(14, 7, 'Altsax Cleveland_01', 4, 6, 'Altsax Cleveland_01', 'Altsax_King_Cleveland_1.JPG'),
(194, 89, 'a2', 18, 6, 'a2', 'Altsax_King_Cleveland_2.JPG'),
(18, 9, 'E1', 1, 1, 'E1', 'Euphonium_The_Martin_Handcraft_double_bell_1.JPG'),
(24, 11, 'B2', 5, 10, 'B2', 'Bastuba_Besson_Bb_2.JPG'),
(26, 12, 'B3', 5, 10, 'B3', 'Bastuba_Besson_Bb_3.JPG'),
(30, 14, 'b5', 5, 10, 'b5', 'Bastuba_Besson_Bb_5.JPG'),
(32, 15, 'b6', 5, 10, 'b6', 'Bastuba_Besson_Bb_6.JPG'),
(36, 17, 'A2', 2, 16, 'A2', 'Altklarinet_Selmer_2.JPG'),
(38, 18, 'A3', 1, 16, 'A3', 'Altklarinet_Selmer_7.JPG'),
(40, 19, 'A1', 3, 16, 'A1', 'Altklarinet_Selmer_1.JPG'),
(44, 21, 'A1', 7, 20, 'A1', 'Alto_Kings_Excellent_1.JPG'),
(46, 22, 'A2', 7, 20, 'A2', 'Alto_Kings_Excellent_2.JPG'),
(48, 23, 'A3', 7, 20, 'A3', 'Alto_Kings_Excellent_3.JPG'),
(50, 24, 'A4', 7, 20, 'A4', 'Alto_Kings_Excellent_4.JPG'),
(54, 26, 'S1', 8, 25, 'S1', 'Sopraansax_Borgani_1.JPG'),
(356, 143, 's2', 28, 25, 's2', 'Sopraansax_Borgani_2.JPG'),
(58, 28, 's3', 8, 25, 's3', 'Sopraansax_Borgani_3.JPG'),
(62, 30, 'A1', 9, 29, 'A1', 'Alto_Willson_1.JPG'),
(64, 31, 'A2', 9, 29, 'A2', 'Alto_Willson_2.JPG'),
(66, 32, 'A3', 9, 29, 'A3', 'Alto_Willson_3.JPG'),
(68, 33, 'A4', 9, 29, 'A4', 'Alto_Willson_4.JPG'),
(72, 35, 'b1', 10, 34, 'b1', 'Basklarinet_Bundy_1.JPG'),
(74, 36, 'b2', 10, 34, 'b2', 'Basklarinet_Bundy_2.JPG'),
(80, 39, 'b5', 10, 34, 'b5', 'Basklarinet_Bundy_5.JPG'),
(84, 41, 'b1', 11, 40, 'b1', 'Basklarinet_Vito_1.JPG'),
(86, 42, 'b2', 11, 40, 'b2', 'Basklarinet_Vito_2.JPG'),
(88, 43, 'b3', 11, 40, 'b3', 'Basklarinet_Vito_3.JPG'),
(90, 44, 'b4', 11, 40, 'b4', 'Basklarinet_Vito_4.JPG'),
(92, 45, 'b5', 11, 40, 'b5', 'Basklarinet_Vito_5.JPG'),
(94, 46, 'b6', 11, 40, 'b6', 'Basklarinet_Vito_6.JPG'),
(96, 47, 'b7', 11, 40, 'b7', 'Basklarinet_Vito_7.JPG'),
(98, 48, 'b8', 11, 40, 'b8', 'Basklarinet_Vito_8.JPG'),
(102, 50, 'b1', 12, 49, 'b1', 'Bastrompet_Kanstul_1.JPG'),
(104, 51, 'b2', 12, 49, 'b2', 'Bastrompet_Kanstul_2.JPG'),
(106, 52, 'b3', 12, 49, 'b3', 'Bastrompet_Kanstul_3.JPG'),
(108, 53, 'b4', 12, 49, 'b4', 'Bastrompet_Kanstul_4.JPG'),
(112, 55, 'b1', 13, 54, 'b1', 'Bastuba_Baesson_Sovering_Eb_1.JPG'),
(114, 56, 'b2', 13, 54, 'b2', 'Bastuba_Baesson_Sovering_Eb_2.JPG'),
(116, 57, 'b3', 13, 54, 'b3', 'Bastuba_Baesson_Sovering_Eb_3.JPG'),
(118, 58, 'b4', 13, 54, 'b4', 'Bastuba_Baesson_Sovering_Eb_4.JPG'),
(122, 60, 'b1', 2, 59, 'b1', 'Bastuba_Couesnon_1.JPG'),
(128, 63, 'b5', 3, 59, 'b5', 'Bastuba_Couesnon_5.JPG'),
(126, 62, 'b3', 4, 59, 'b3', 'Bastuba_Couesnon_3.JPG'),
(130, 64, 'b6', 1, 59, 'b6', 'Bastuba_Couesnon_6.JPG'),
(134, 66, 'b1', 15, 65, 'b1', 'Bastuba_Weltklang_1_1.JPG'),
(136, 67, 'b2', 15, 65, 'b2', 'BAstuba_Weltklang_2_1.JPG'),
(138, 68, 'b3', 15, 65, 'b3', 'Bastuba_Weltklang_3.JPG'),
(140, 69, 'b4', 15, 65, 'b4', 'Bastuba_Weltklang_4.JPG'),
(142, 70, 'b5', 15, 65, 'b5', 'Bastuba_Weltklang_5.JPG'),
(146, 72, 'b1', 16, 71, 'b1', 'Bastuba_Yamaha_1.JPG'),
(148, 73, 'b2', 16, 71, 'b2', 'Bastuba_Yamaha_2.JPG'),
(150, 74, 'b3', 16, 71, 'b3', 'Bastuba_Yamaha_3.JPG'),
(152, 75, 'b4', 16, 71, 'b4', 'BAstuba_Yamaha_4.JPG'),
(154, 76, 'b5', 16, 71, 'b5', 'Bastuba_Yamaha_5.JPG'),
(158, 78, 'b1', 17, 77, 'b1', 'Bugel_Getzen_Eterna_1.JPG'),
(160, 79, 'b2', 17, 77, 'b2', 'Bugel_Getzen_Eterna_2.JPG'),
(166, 82, 'b3', 17, 77, 'b3', 'Bugel_Getzen_Eterna_3.JPG'),
(164, 81, 'b4', 17, 77, 'b4', 'Bugel_Getzen_Eterna_4_1.JPG'),
(174, 86, 'b2', 18, 83, 'b2', 'Bugel_Selmer_2.JPG'),
(172, 85, 'b1', 18, 83, 'b1', 'Bugel_Selmer_1_1.JPG'),
(178, 87, 'b3', 18, 83, 'b3', 'Bugel_Selmer_3.JPG'),
(180, 88, 'b4', 18, 83, 'b4', 'Bugel_Selmer_4.JPG'),
(200, 90, 'a3', 18, 6, 'a3', 'Altsax_King_Cleveland_3.JPG'),
(206, 91, 'a4', 18, 6, 'a4', 'Altsax_King_Cleveland_4.JPG'),
(216, 92, 'f1', 2, 3, 'f1', 'Fagot_Artia_1.JPG'),
(218, 93, 'f4', 5, 3, 'f4', 'Fagot_Artia_4.JPG'),
(220, 94, 'f5', 6, 3, 'f5', 'Fagot_Artia_5.JPG'),
(226, 95, 'f6', 7, 3, 'f6', 'Fagot_Artia_6.JPG'),
(230, 96, 'f8', 1, 3, 'f8', 'Fagot_Artia.JPG'),
(246, 98, 'c1', 19, 97, 'c1', 'Cornet_Besson_Sovereign_1.JPG'),
(248, 99, 'c2', 19, 97, 'c2', 'Cornet_Besson_Sovereign_2.JPG'),
(252, 100, 'c3', 19, 97, 'c3', 'Cornet_Besson_Sovereign_3.JPG'),
(256, 101, 'c4', 19, 97, 'c4', 'Cornet_Besson_Sovereign_4.JPG'),
(260, 103, 'c1', 20, 102, 'c1', 'Cornet_King_Cleveland_1.JPG'),
(262, 104, 'c2', 20, 102, 'c2', 'Cornet_King_Cleveland_2.JPG'),
(268, 105, 'c3', 20, 102, 'c3', 'Cornet_King_Cleveland_3.JPG'),
(272, 107, 'd1', 21, 106, 'd1', 'Dwarsfluit_Artley_1.JPG'),
(274, 108, 'd2', 21, 106, 'd2', 'Dwarsfluit_Artley_3.JPG'),
(276, 109, 'd3', 21, 106, 'd3', 'Dwarsfluit_Artley_4.JPG'),
(280, 111, 'd2', 2, 110, 'd2', 'Dwarsfluit_Haynes_Handmade_3.JPG'),
(282, 112, 'd1', 1, 110, 'd1', 'Dwarsfluit_Haynes_Handmade_1.JPG'),
(284, 113, 'd3', 22, 110, 'd3', 'Dwarsfluit_Haynes_Handmade_4.JPG'),
(286, 114, 'd4', 22, 110, 'd4', 'Dwarsfluit_Haynes_Handmade_5.JPG'),
(288, 115, 'd5', 22, 110, 'd5', 'Dwarsfluit_Haynes_Handmade_6.JPG'),
(292, 117, 'd1', 23, 116, 'd1', 'Dwarsfluit_Haynes_1.JPG'),
(294, 118, 'd2', 23, 116, 'd2', 'Dwarsfluit_Haynes_2.JPG'),
(298, 120, 'd1', 24, 119, 'd1', 'Dwarsfluit_Hofinger_1.JPG'),
(300, 121, 'd2', 24, 119, 'd2', 'Dwarsfluit_Hofinger_3.JPG'),
(302, 122, 'd3', 24, 119, 'd3', 'Dwarsfluit_Hofinger_4.JPG'),
(304, 123, 'd4', 24, 119, 'd4', 'Dwarsfluit_Hofinger_5.JPG'),
(306, 124, 'd5', 24, 119, 'd5', 'Dwarsfluit_Hofinger_6.JPG'),
(310, 126, 'd1', 25, 125, 'd1', 'Dwarsfluit_Miyazawa_1.JPG'),
(312, 127, 'd2', 25, 125, 'd2', 'Dwarsfluit_Miyazawa_2.JPG'),
(314, 128, 'd3', 25, 125, 'd3', 'Dwarsfluit_Miyazawa_3.JPG'),
(318, 130, 'e1', 26, 129, 'e1', 'Euphonium_Blasom_1.JPG'),
(320, 131, 'e2', 26, 129, 'e2', 'Euphonium_Blasom_2.JPG'),
(322, 132, 'e3', 26, 129, 'e3', 'Euphonium_Blasom_4.JPG'),
(326, 133, 'e4', 26, 129, 'e4', 'Euphonium_Blasom_5.JPG'),
(330, 134, 'e5', 26, 129, 'e5', 'Euphonium_Blasom_6.JPG'),
(334, 136, 'h1', 27, 135, 'h1', 'Hobo_Hans_Kreul_1.JPG'),
(336, 137, 'h2', 27, 135, 'h2', 'Hobo_Hans_Kreul_2.JPG'),
(340, 139, 'k1', 28, 138, 'k1', 'Klarinet_Buffet_Crampon_E11_1.JPG'),
(344, 140, 'k2', 28, 138, 'k2', 'Klarinet_Buffet_Crampon_E11_2.JPG'),
(348, 141, 'k3', 28, 138, 'k3', 'Klarinet_Buffet_Crampon_E11_3.JPG'),
(352, 142, 'k4', 28, 138, 'k4', 'Klarinet_Buffet_Crampon_E11_4.JPG'),
(360, 145, 'k1', 29, 144, 'k1', 'Klarinet_Buffet_Crampon_E11_A_1.JPG'),
(364, 146, 'k2', 29, 144, 'k2', 'Klarinet_Buffet_Crampon_E11_2_1.JPG'),
(370, 147, 'k6', 29, 144, 'k6', 'Klarinet_Buffet_Crampon_E11_A_6.JPG'),
(372, 148, 'k3', 29, 144, 'k3', 'Klarinet_Buffet_Crampon_E11_A_2.JPG'),
(376, 150, 'k1', 30, 149, 'k1', 'Klarinet_Leblanc_1.JPG'),
(378, 151, 'k2', 30, 149, 'k2', 'Klarinet_Leblanc_2.JPG'),
(380, 152, 'k3', 30, 149, 'k3', 'Klarinet_Leblanc_3.JPG'),
(382, 153, 'k4', 30, 149, 'k4', 'Klarinet_Leblanc_4.JPG'),
(386, 155, 'k1', 31, 154, 'k1', 'Klarinet_Leblanc_Noblet_1.JPG'),
(388, 156, 'k2', 31, 154, 'k2', 'Klarinet_Leblanc_Noblet_2.JPG'),
(390, 157, 'k3', 31, 154, 'k3', 'Klarinet_Leblanc_Noblet_3.JPG'),
(394, 158, 'k4', 31, 154, 'k4', 'Klarinet_Leblanc_Noblet_4.JPG'),
(398, 160, 'k1', 32, 159, 'k1', 'Klarinet_Selmer_Serie_9_1.JPG'),
(400, 161, 'k2', 32, 159, 'k2', 'Klarinet_Selmer_Serie_9_2.JPG'),
(404, 163, 't1', 33, 162, 't1', 'Pistontrombone_Maheu_1.JPG'),
(406, 164, 'p2', 33, 162, 'p2', 'Pistontrombone_Maheu_2.JPG'),
(408, 165, 'p3', 33, 162, 'p3', 'Pistontrombone_Maheu_3.JPG'),
(412, 167, 'p1', 34, 166, 'p1', 'Pistontrombone_Ruyssinck_2.JPG'),
(414, 168, 'p2', 34, 166, 'p2', 'Pistontrombone_Ruyssinck_3.JPG'),
(418, 170, 't1', 35, 169, 't1', 'Tenorsax_Buescher_1.JPG'),
(420, 171, 't2', 35, 169, 't2', 'Tenorsax_Buescher_2.JPG'),
(424, 172, 't3', 35, 169, 't3', 'Tenorsax_Buescher_3.JPG'),
(426, 173, 't4', 35, 169, 't4', 'Tenorsax_Buescher_4.JPG'),
(430, 175, 't1', 36, 174, 't1', 'Tenorsax_Hohner_President_1.JPG'),
(434, 176, 't2', 36, 174, 't2', 'Tenorsax_Hohner_President_2.JPG'),
(436, 177, 't3', 36, 174, 't3', 'Tenorsax_Hohner_President_3.JPG'),
(440, 179, 't1', 37, 178, 't1', 'Tenorsax_Hopf_1.JPG'),
(442, 180, 't2', 37, 178, 't2', 'Tenorsax_Hopf_2.JPG'),
(444, 181, 't3', 37, 178, 't3', 'Tenorsax_Hopf_3.JPG'),
(448, 183, 't1', 38, 182, 't1', 'Tenrosax_Conn_10M_1.JPG'),
(452, 184, 't2', 38, 182, 't2', 'Tenrosax_Conn_10M_2.JPG'),
(454, 185, 't3', 38, 182, 't3', 'Tenrosax_Conn_10M_3.JPG'),
(456, 186, 't4', 38, 182, 't4', 'Tenrosax_Conn_10M_4.JPG'),
(458, 187, 't5', 38, 182, 't5', 'Tenrosax_Conn_10M_5.JPG'),
(460, 188, 't6', 38, 182, 't6', 'Tenrosax_Conn_10M_6.JPG'),
(464, 190, 't1', 39, 189, 't1', 'Trombone_Conn_Director_1.JPG'),
(466, 191, 't2', 39, 189, 't2', 'Trombone_Conn_Director_3.JPG'),
(468, 192, 't3', 39, 189, 't3', 'Trombone_Conn_Director_5.JPG'),
(470, 193, 't4', 39, 189, 't4', 'Trombone_Conn_Director_6.JPG'),
(472, 194, 't5', 39, 189, 't5', 'Trombone_Conn_Director_8.JPG'),
(476, 196, 't1', 40, 195, 't1', 'Trombone_King_2B_1.JPG'),
(478, 197, 't2', 40, 195, 't2', 'Trombone_King_2B_2.JPG'),
(480, 198, 't3', 40, 195, 't3', 'Trombone_King_2B_3.JPG'),
(482, 199, 't4', 40, 195, 't4', 'Trombone_King_2B_4.JPG'),
(484, 200, 't5', 40, 195, 't5', 'Trombone_King_2B_5.JPG'),
(486, 201, 't6', 40, 195, 't6', 'Trombone_King_2B_6.JPG'),
(490, 203, 't1', 41, 202, 't1', 'Trombone_King_3B_1.JPG'),
(492, 204, 't2', 41, 202, 't2', 'Trombone_King_3B_2.JPG'),
(494, 205, 't3', 41, 202, 't3', 'Trombone_King_3B_3.JPG'),
(496, 206, 't4', 41, 202, 't4', 'Trombone_King_3B_4.JPG'),
(498, 207, 't5', 41, 202, 't5', 'Trombone_King_2B_5_1.JPG'),
(500, 208, 't6', 41, 202, 't6', 'Trombone_King_2B_6_1.JPG'),
(504, 210, 't1', 42, 209, 't1', 'Trombone_King_4B_1.JPG'),
(506, 211, 't2', 42, 209, 't2', 'Trombone_King_4B_2.JPG'),
(508, 212, 't3', 42, 209, 't3', 'Trombone_King_4B_3.JPG'),
(510, 213, 't4', 42, 209, 't4', 'Trombone_King_4B_4.JPG'),
(512, 214, 't5', 42, 209, 't5', 'Trombone_King_4B_5.JPG'),
(514, 215, 't6', 42, 209, 't6', 'Trombone_King_4B_6.JPG'),
(518, 217, 't1', 43, 216, 't1', 'Trombone_Meinl_1.JPG'),
(520, 218, 't2', 43, 216, 't2', 'Trombone_Meinl_1_1.JPG'),
(522, 219, 't3', 43, 216, 't3', 'Trombone_Meinl_2.JPG'),
(524, 220, 't4', 43, 216, 't4', 'Trombone_Meinl_4.JPG'),
(528, 222, 't1', 44, 221, 't1', 'Trombone_Yamaha_5.JPG'),
(530, 223, 't2', 44, 221, 't2', 'Trombone_YAmaha_1.JPG'),
(532, 224, 't3', 44, 221, 't3', 'Trombone_YAmaha_2.JPG'),
(534, 225, 't4', 44, 221, 't4', 'Trombone_Yamaha_3.JPG'),
(536, 226, 't5', 44, 221, 't5', 'Trombone_Yamaha_4.JPG'),
(540, 228, 't1', 45, 227, 't1', 'Trompet_Keilwerth_Toneking_Special_1.JPG'),
(542, 229, 't2', 45, 227, 't2', 'Trompet_Keilwerth_Toneking_Special_2.JPG'),
(544, 230, 't3', 45, 227, 't3', 'Trompet_Keilwerth_Toneking_Special_3.JPG'),
(546, 231, 't4', 45, 227, 't4', 'Trompet_Keilwerth_Toneking_Special_4.JPG'),
(548, 232, 't5', 45, 227, 't5', 'Trompet_Keilwerth_Toneking_Special_5.JPG'),
(556, 236, 't3', 4, 233, 't3', 'Trompet_Olds_Recording_1.JPG'),
(554, 235, 't2', 1, 233, 't2', 'Trompet_Olds_Recording_3_1.JPG'),
(558, 237, 't4', 2, 233, 't4', 'Trompet_Olds_Recording_2_2.JPG'),
(560, 238, 't5', 3, 233, 't5', 'Trompet_Olds_Recording_2.JPG'),
(564, 240, 't1', 47, 239, 't1', 'Trompet_SML_1_2.JPG'),
(566, 241, 't2', 47, 239, 't2', 'Trompet_SML_2_2.JPG'),
(568, 242, 't3', 47, 239, 't3', 'Trompet_SML_3.JPG'),
(572, 244, 't1', 48, 243, 't1', 'Trompet_Yamaha_1.JPG'),
(574, 245, 't2', 48, 243, 't2', 'Trompet_Yamaha_2.JPG'),
(576, 246, 't3', 48, 243, 't3', 'Trompet_Yamaha_3.JPG'),
(580, 248, 't1', 49, 247, 't1', 'Trompet_Yamaha_Custom_3.JPG'),
(582, 249, 't2', 49, 247, 't2', 'Trompet_Yamaha_Custom_1.JPG');

-- --------------------------------------------------------

--
-- Table structure for table `occasies`
--

CREATE TABLE IF NOT EXISTS `occasies` (
  `id` int(10) NOT NULL COMMENT 'the real item id (not unique: occurs once for each language)',
  `title` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `sequence` int(10) NOT NULL COMMENT 'item order within its parent (numbers do not need to follow, ''holes'' may occur)',
  `titel` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `beschrijving` text COLLATE utf8_unicode_ci,
  `type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subtype` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `afbeelding` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `occasies`
--

INSERT INTO `occasies` (`id`, `title`, `sequence`, `titel`, `beschrijving`, `type`, `subtype`, `afbeelding`) VALUES
(1, 'Euphonium The Martin Handcraft Double Bell', 34, 'Euphonium The Martin Handcraft Double Bell', '<p>\r\n	Collector''s item.</p>\r\n<p>\r\n	Prachtig instrument in uitmuntende staat.</p>\r\n', 'koperblazer', 'Euphonium', 'Euphonium_The_Martin_Handcraft_double_bell_2.JPG'),
(3, 'Fagot Artia', 10, 'Fagot Artia', '<p>\r\n	Studie-instrument in goede staat.</p>\r\n<p>\r\n	Ideaal voor een beginner!</p>\r\n', 'houtblazer', 'Fagot', 'Fagot_Artia_1.JPG'),
(6, 'Altsax King Cleveland', 2, 'Altsax King Cleveland', '<p>\r\n	Echte Amerikaanse vintage.</p>\r\n<p>\r\n	Fantastisch geluid.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'houtblazer', 'Altsax', 'Altsax_King_Cleveland_1.JPG'),
(10, 'Bastuba Besson in Bb', 24, 'Bastuba Besson in Bb', '<p>\r\n	Prachtige verzilverde bastuba met 3 ventielen.</p>\r\n<p>\r\n	Gecompenseerd.</p>\r\n<p>\r\n	Goede intonatie.</p>\r\n<p>\r\n	Uitstekende staat, amper blutsen.</p>\r\n<p>\r\n	Zilver voor 95% aanwezig.</p>\r\n', 'koperblazer', 'Bastuba', 'Bastuba_Besson_Bb_1.JPG'),
(16, 'Altklarinet Selmer', 1, 'Altklarinet Selmer', '<p>\r\n	Altklarinet Selmer van de jaren'' 50.</p>\r\n', 'houtblazer', 'Altklarinet', 'Altklarinet_Selmer_1_3.JPG'),
(20, 'Alto Kings Excellent', 22, 'Alto Kings Excellent', '<p>\r\n	Althoorn</p>\r\n', 'koperblazer', 'Alto', 'Alto_Kings_Excellent_1.JPG'),
(25, 'Sopraansax Borgani', 16, 'Sopraansax Borgani', '<p>\r\n	Italiaanse makelij.</p>\r\n', 'houtblazer', 'Sopraansax', 'Sopraansax_Borgani_1.JPG'),
(29, 'Alto Willson', 23, 'Alto Willson', '<p>\r\n	Verzilverde alto Willson</p>\r\n<p>\r\n	Ouder model en goede staat.</p>\r\n', 'koperblazer', 'Alto', 'Alto_Willson_1.JPG'),
(34, 'Basklarinet Selmer Bundy', 3, 'Basklarinet Selmer Bundy', '<p>\r\n	Kunststof basklarinet Bundy</p>\r\n<p>\r\n	Tot lage Eb.</p>\r\n', 'houtblazer', 'Basklarinet', 'Basklarinet_Bundy_1.JPG'),
(97, 'Cornet Besson Sovereign', 31, 'Cornet Besson Sovereign', '<p>\r\n	Cornet Besson Sovereign.</p>\r\n<p>\r\n	Goudlak.</p>\r\n<p>\r\n	Uitmutende staat.</p>\r\n<p>\r\n	Klein blutsje in leadpipe.</p>\r\n', 'koperblazer', 'Cornet', 'Cornet_Besson_Sovereign_1.JPG'),
(40, 'Basklarinet Vito', 4, 'Basklarinet Vito', '<p>\r\n	Kunststof basklarinet Vito.</p>\r\n<p>\r\n	Amper bespeeld, in nieuwstaat.</p>\r\n<p>\r\n	Tot lage Eb.</p>\r\n', 'houtblazer', 'Basklarinet', 'Basklarinet_Vito_1.JPG'),
(49, 'Bastrompet Kanstul Custom Class', 43, 'Bastrompet Kanstul Custom Class', '<p>\r\n	Verzilverde bastrompet Kanstul</p>\r\n<p>\r\n	Zeer goede staat.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'koperblazer', 'Trompet', 'Bastrompet_Kanstul_1.JPG'),
(54, 'Bastuba Besson Sovereign in Eb', 25, 'Bastuba Besson Sovereign in Eb', '<p>\r\n	Verzilverde bastuba Besson Sovereign in Eb.</p>\r\n<p>\r\n	3 + 1.</p>\r\n<p>\r\n	Gecompenseerd.</p>\r\n<p>\r\n	Uitmuntende staat, amper blutsen.</p>\r\n<p>\r\n	Zilver voor 90% aanwezig.</p>\r\n', 'koperblazer', 'Bastuba', 'Bastuba_Baesson_Sovering_Eb_1.JPG'),
(59, 'Bastuba Couesnon in Eb', 26, 'Bastuba Couesnon in Eb', '<p>\r\n	Verzilverde bastuba Couesnon.</p>\r\n<p>\r\n	3 ventielen.</p>\r\n<p>\r\n	Vernikkeld.</p>\r\n', 'koperblazer', 'Bastuba', 'Bastuba_Couesnon_1.JPG'),
(65, 'Bastuba Weltklan in Bb', 27, 'Bastuba Weltklan in Bb', '<p>\r\n	Bastuba Weltklang.</p>\r\n<p>\r\n	3 ventielen.</p>\r\n<p>\r\n	Vernikkeld.</p>\r\n<p>\r\n	Heel wat blutsen.</p>\r\n', 'koperblazer', 'Bastuba', 'Bastuba_Weltklang_1_1.JPG'),
(71, 'Bastuba Yamaha in Bb', 28, 'Bastuba Yamaha in Bb', '<p>\r\n	Bastuba Yamaha in Bb.</p>\r\n<p>\r\n	Frontaction.</p>\r\n<p>\r\n	4 ventielen.</p>\r\n<p>\r\n	Goudlak.</p>\r\n<p>\r\n	Uitmuntende staat.</p>\r\n', 'koperblazer', 'Bastuba', 'Bastuba_Yamaha_1.JPG'),
(77, 'Bugel Getzen Eterna', 29, 'Bugel Getzen Eterna', '<p>\r\n	Bugel Getzen Eterna.</p>\r\n<p>\r\n	4 pistons.</p>\r\n<p>\r\n	Verzilverd.</p>\r\n<p>\r\n	Goede staat.</p>\r\n', 'koperblazer', 'Bugel', 'Bugel_Getzen_Eterna_1.JPG'),
(83, 'Bugel Selmer', 30, 'Bugel Selmer', '<p>\r\n	Professionele bugel Selmer.</p>\r\n<p>\r\n	Goudlak.</p>\r\n<p>\r\n	Goede staat.</p>\r\n', 'koperblazer', 'Bugel', 'Bugel_Selmer_1.JPG'),
(102, 'Cornet King Cleveland', 32, 'Cornet King Cleveland', '<p>\r\n	Cornet King Cleveland</p>\r\n<p>\r\n	Verzilverd.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'koperblazer', 'Cornet', 'Cornet_King_Cleveland_1.JPG'),
(106, 'Dwarsfluit Artley', 5, 'Dwarsfluit Artley', '<p>\r\n	Dwarsfluit Artley</p>\r\n<p>\r\n	Open kleppen.</p>\r\n<p>\r\n	Inline.</p>\r\n<p>\r\n	B-voet.</p>\r\n<p>\r\n	Volledig massief zilver.</p>\r\n', 'houtblazer', 'Dwarsfluit', 'Dwarsfluit_Artley_1.JPG'),
(110, 'Dwarsluit Haynes', 6, 'Dwarsluit Haynes', '<p>\r\n	Dwarsfluit Haynes</p>\r\n<p>\r\n	Handmade.</p>\r\n<p>\r\n	Gesloten kleppen.</p>\r\n<p>\r\n	Offset sol.</p>\r\n<p>\r\n	E-mechaniek.</p>\r\n<p>\r\n	Volledig massief zilver.</p>\r\n', 'houtblazer', 'Dwarsfluit', 'Dwarsfluit_Haynes_Handmade_1.JPG'),
(116, 'Dwarsluit Haynes', 7, 'Dwarsluit Haynes', '<p>\r\n	Dwarsfluit Haynes</p>\r\n<p>\r\n	Volledig massief zilver.</p>\r\n<p>\r\n	Gesloten kleppen.</p>\r\n<p>\r\n	Offset sol.</p>\r\n', 'houtblazer', 'Dwarsfluit', 'Dwarsfluit_Haynes_1.JPG'),
(119, 'Dwarsfluit Hofinger', 8, 'Dwarsfluit Hofinger', '<p>\r\n	Dwarsfluit Hofinger</p>\r\n<p>\r\n	Gesloten kleppen.</p>\r\n<p>\r\n	Offset sol.</p>\r\n', 'houtblazer', 'Dwarsfluit', 'Dwarsfluit_Hofinger_1.JPG'),
(125, 'Dwarsfluit Miyazawa', 9, 'Dwarsfluit Miyazawa', '<p>\r\n	Dwarsfluit Miyazawa</p>\r\n<p>\r\n	Massief zilveren kopstuk.</p>\r\n<p>\r\n	Gesloten kleppen.</p>\r\n<p>\r\n	Offset sol.</p>\r\n<p>\r\n	E-mechaniek.</p>\r\n', 'houtblazer', 'Dwarsfluit', 'Dwarsfluit_Miyazawa_1.JPG'),
(129, 'Euphonium Blasom', 33, 'Euphonium Blasom', '<p>\r\n	Euphonium Blasom</p>\r\n<p>\r\n	4 ventielen inline.</p>\r\n<p>\r\n	Verzilverd.</p>\r\n', 'koperblazer', 'Euphonium', 'Euphonium_Blasom_1.JPG'),
(135, 'Hobo Hans Kreul', 11, 'Hobo Hans Kreul', '<p>\r\n	Hobo Hans Kreul.</p>\r\n<p>\r\n	Hout in goede staat.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'houtblazer', 'Hobo', 'Hobo_Hans_Kreul_1.JPG'),
(138, 'Klarinet Buffet Crampon E11', 12, 'Klarinet Buffet Crampon E11', '<p>\r\n	Klarinet Buffet Crampon E11 in Bb.</p>\r\n<p>\r\n	Zo goed als nieuw, amper bespeeld.</p>\r\n<p>\r\n	Inclusief Vandoren mondstuk.</p>\r\n', 'houtblazer', 'Klarinet', 'Klarinet_Buffet_Crampon_E11_1.JPG'),
(144, 'Klarinet Buffet Crampon E11 in A', 13, 'Klarinet Buffet Crampon E11 in A', '<p>\r\n	Klarinet Buffet Crampon E11 in A.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'houtblazer', 'Klarinet', 'Klarinet_Buffet_Crampon_E11_A_1.JPG'),
(149, 'Klarinet Leblanc', 14, 'Klarinet Leblanc', '<p>\r\n	Klarinet Leblanc.</p>\r\n<p>\r\n	Professionele klarinet.</p>\r\n', 'houtblazer', 'Klarinet', 'Klarinet_Leblanc_1.JPG'),
(154, 'Klarinet Leblanc Noblet', 15, 'Klarinet Leblanc Noblet', '<p>\r\n	Klarinet Leblanc Noblet.</p>\r\n<p>\r\n	Extra gat in klankbeker voor betere intonatie.</p>\r\n', 'houtblazer', 'Klarinet', 'Klarinet_Leblanc_Noblet_1.JPG'),
(159, 'Klarinet Selmer Serie 9', 17, 'Klarinet Selmer Serie 9', '<p>\r\n	Klarinet Selmer Serie 9.</p>\r\n<p>\r\n	Goede klarinet, ideaal voor Jazz en lichte muziek.</p>\r\n', 'houtblazer', 'Klarinet', 'Klarinet_Selmer_Serie_9_1.JPG'),
(162, 'Pistitrombone Maheu', 35, 'Pistitrombone Maheu', '<p>\r\n	Pistontrombone Maheu.</p>\r\n<p>\r\n	Goudlak.</p>\r\n', 'koperblazer', 'Trombone', 'Pistontrombone_Maheu_1.JPG'),
(166, 'Pistontrombone Ruyssinck', 36, 'Pistontrombone Ruyssinck', '<p>\r\n	Pistontrombone Ruyssinck.</p>\r\n<p>\r\n	Vernikkeld.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'koperblazer', 'Trombone', 'Pistontrombone_Ruyssinck_2.JPG'),
(169, 'Tenorsax Buescher', 18, 'Tenorsax Buescher', '<p>\r\n	Tenorsax Buescher.</p>\r\n<p>\r\n	Echte Amerikaanse vintage.</p>\r\n<p>\r\n	Geen originele hals.</p>\r\n<p>\r\n	Fantastisch geluid.</p>\r\n', 'houtblazer', 'Tenorsax', 'Tenorsax_Buescher_1_3.JPG'),
(174, 'Tenorsax Hohner President', 20, 'Tenorsax Hohner President', '<p>\r\n	Tenorsax Hohner President.</p>\r\n<p>\r\n	Verzilverd.</p>\r\n<p>\r\n	Goede Duitse kwaliteit.</p>\r\n', 'houtblazer', 'Tenorsax', 'Tenorsax_Hohner_President_1.JPG'),
(178, 'Tenorsax Hopf', 21, 'Tenorsax Hopf', '<p>\r\n	Tenorsax Hopf.</p>\r\n<p>\r\n	Stencil Julius Keilwerth.</p>\r\n<p>\r\n	Goudlak met vernikkelde kleppen.</p>\r\n', 'houtblazer', 'Tenorsax', 'Tenorsax_Hopf_1.JPG'),
(182, 'Tenorsax Conn 10M', 19, 'Tenorsax Conn 10M', '<p>\r\n	Tenorsax Conn 10M.</p>\r\n<p>\r\n	Octaafsysteem met underslung.</p>\r\n<p>\r\n	Goede Amerikaanse Vintage.</p>\r\n<p>\r\n	Fantastisch geluid.</p>\r\n', 'houtblazer', 'Tenorsax', 'Tenrosax_Conn_10M_1.JPG'),
(189, 'Trombone Conn Director', 37, 'Trombone Conn Director', '<p>\r\n	Trombone Conn Director.</p>\r\n<p>\r\n	Goede conditie.</p>\r\n<p>\r\n	Schuif in perfecte staat.</p>\r\n', 'koperblazer', 'Trombone', 'Trombone_Conn_Director_1.JPG'),
(195, 'Trombone King 2B', 38, 'Trombone King 2B', '<p>\r\n	Trombone King 2B.</p>\r\n<p>\r\n	Model 2102 Legend.</p>\r\n<p>\r\n	Roodkoperen beker.</p>\r\n<p>\r\n	Schuif in perfecte staat.</p>\r\n', 'koperblazer', 'Trombone', 'Trombone_King_2B_1.JPG'),
(202, 'Trombone King 3B', 39, 'Trombone King 3B', '<p>\r\n	Trombone King 3B.</p>\r\n<p>\r\n	Model 2103 Legend.</p>\r\n<p>\r\n	Roodkoperen beker.</p>\r\n<p>\r\n	Schuif in nieuwstaat.</p>\r\n', 'koperblazer', 'Trombone', 'Trombone_King_3B_1.JPG'),
(209, 'Trombone King 4B', 40, 'Trombone King 4B', '<p>\r\n	Trombone King 4B.</p>\r\n<p>\r\n	Geen kwartventiel.</p>\r\n<p>\r\n	Verzilvering voor 99% aanwezig.</p>\r\n<p>\r\n	Schuif in nieuwstaat.</p>\r\n', 'koperblazer', 'Trombone', 'Trombone_King_4B_1.JPG'),
(216, 'Trombone Meinl', 41, 'Trombone Meinl', '<p>\r\n	Trombone Meinl.</p>\r\n<p>\r\n	Duitse makelij.</p>\r\n', 'koperblazer', 'Trombone', 'Trombone_Meinl_1_1.JPG'),
(221, 'Trombone Yamaha', 42, 'Trombone Yamaha', '<p>\r\n	Trombone Yamaha model YSL 354.</p>\r\n<p>\r\n	Kwartventiel.</p>\r\n<p>\r\n	Amper bespeeld.</p>\r\n', 'koperblazer', 'Trombone', 'Trombone_Yamaha_5.JPG'),
(227, 'Trompet Julius Keilwerth Toneking Special', 44, 'Trompet Julius Keilwerth Toneking Special', '<p>\r\n	Trompet Julius Keilwerth Toneking Special.</p>\r\n<p>\r\n	Prachtige trompet.</p>\r\n<p>\r\n	Fantastisch geluid.</p>\r\n<p>\r\n	Ideaal voor Jazz en lichte muziek.</p>\r\n', 'koperblazer', 'Trompet', 'Trompet_Keilwerth_Toneking_Special_1.JPG'),
(233, 'Trompet Olds Recording', 45, 'Trompet Olds Recording', '<p>\r\n	Trompet Olds Recording.</p>\r\n<p>\r\n	Verzilvering voor 95% aanwezig.</p>\r\n<p>\r\n	Pistons niet in lijn.</p>\r\n<p>\r\n	Collectors item.</p>\r\n', 'koperblazer', 'Trompet', 'Trompet_Olds_Recording_1.JPG'),
(239, 'Trompet SML', 46, 'Trompet SML', '<p>\r\n	Trompet SML model TP500.</p>\r\n<p>\r\n	Amper bespeeld.</p>\r\n<p>\r\n	Nieuwstaat.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'koperblazer', 'Trompet', 'Trompet_SML_1_2.JPG'),
(243, 'Trompet Yamaha', 47, 'Trompet Yamaha', '<p>\r\n	Trompet Yamaha YTR 4435.</p>\r\n<p>\r\n	Stemcoulisse in C en in Bb.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'koperblazer', 'Trompet', 'Trompet_Yamaha_1.JPG'),
(247, 'Trompet Yamaha Custom', 48, 'Trompet Yamaha Custom', '<p>\r\n	Trompet Yamaha model YTR 934.</p>\r\n<p>\r\n	&nbsp;</p>\r\n', 'koperblazer', 'Trompet', 'Trompet_Yamaha_Custom_1.JPG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`revision_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `revision_id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'is unique in the db',AUTO_INCREMENT=583;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
