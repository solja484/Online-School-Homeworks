-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Час створення: Квт 05 2020 р., 12:34
-- Версія сервера: 10.4.11-MariaDB
-- Версія PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `schoolorg`
--

-- --------------------------------------------------------

--
-- Структура таблиці `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `login` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(50) NOT NULL,
  `notes` int(11) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `admins`
--

INSERT INTO `admins` (`id`, `login`, `email`, `password`, `notes`, `name`, `surname`) VALUES
(1, 'nata', 'n.ddd@gmail.com', '61678f95579e47a820713167d4c93b2a', 0, 'sdfghjkl', 'sdfghjuik'),
(2, 'natssa', 'n.shkarsw@gmail.com', '61678f95579e47a820713167d4c93b2a', NULL, '', ''),
(3, 'natertyu', 'n.shkarossw@cdftyujk.com', '61678f95579e47a820713167d4c93b2a', NULL, '', '');

-- --------------------------------------------------------

--
-- Структура таблиці `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `city` varchar(45) NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `cities`
--

INSERT INTO `cities` (`id`, `city`, `notes`) VALUES
(1, 'Kiev', NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `hometasks`
--

CREATE TABLE `hometasks` (
  `hw_id` int(11) NOT NULL,
  `hw_title` varchar(100) NOT NULL,
  `content` varchar(255) NOT NULL,
  `deadline` datetime NOT NULL,
  `subject_id` varchar(15) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `notes` text DEFAULT NULL,
  `remaining_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `hometasks`
--

INSERT INTO `hometasks` (`hw_id`, `hw_title`, `content`, `deadline`, `subject_id`, `active`, `notes`, `remaining_time`) VALUES
(1, 'Розділ 22', 'Використовуючи інструментарій розглянутий в попередній темі провести аудит вразливостей Інформаційних ресурсів НаУКМА \\nВизначити наявні інформаційні ресурси та стан їх вразливостей \\nНадати розширений звіт аудиту безпеки ', '2020-04-23 17:23:36', '7016360186', 0, 'notesnotesnotesnotes', '2020-04-16 17:23:36'),
(7, 'Домашка', 'Зробіть домашку, яку я вам дала на уроці і при перевірці зошитів виставлю оцінку', '2020-04-12 00:57:00', '7016360186', 0, NULL, '0000-00-00 00:00:00'),
(12, 'Домашка', 'Зробіть домашку, яку я вам дала на уроці і при перевірці зошитів виставлю оцінку', '2020-04-12 00:57:00', '7016360186', 0, NULL, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблиці `hometask_hyperlinks`
--

CREATE TABLE `hometask_hyperlinks` (
  `hyper_id` int(11) NOT NULL,
  `hyperlink` varchar(255) NOT NULL,
  `homework_id` int(11) NOT NULL,
  `notes` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `hometask_hyperlinks`
--

INSERT INTO `hometask_hyperlinks` (`hyper_id`, `hyperlink`, `homework_id`, `notes`) VALUES
(1, 'https://my.ukma.edu.ua/profile', 1, ''),
(2, 'https://distedu.ukma.edu.ua/?', 1, ''),
(3, 'https://www.google.com/maps', 1, ''),
(6, 'https://www.w3schools.com/sql/sql_insert.asp', 12, ''),
(7, 'https://ppt-online.org/271020', 12, '');

-- --------------------------------------------------------

--
-- Структура таблиці `pupils`
--

CREATE TABLE `pupils` (
  `student_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `patronymic` varchar(45) DEFAULT NULL,
  `class` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `school_id` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `pupils`
--

INSERT INTO `pupils` (`student_id`, `name`, `surname`, `patronymic`, `class`, `email`, `phone`, `birth_date`, `notes`, `school_id`, `password`) VALUES
(12344478, 'Соломія', 'Андрусів', 'Ігорівна', 11, 'email', '', '0000-00-00', '', '0000000000', '61678f95579e47a820713167d4c93b2a'),
(12345678, 'wsedrftgyhujik', 'awsedrgyhujikol', 'wsedrtfgyhuj', 11, 'hell@gmaid.dd', '', '0000-00-00', NULL, '0000000000', '230ef66572fb3b00faa545b742ac3621');

-- --------------------------------------------------------

--
-- Структура таблиці `schools`
--

CREATE TABLE `schools` (
  `code` char(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `city` int(11) NOT NULL,
  `region` varchar(255) DEFAULT NULL,
  `street` varchar(255) NOT NULL,
  `house_number` varchar(10) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `schools`
--

INSERT INTO `schools` (`code`, `name`, `city`, `region`, `street`, `house_number`, `phone`, `photo`, `notes`) VALUES
('0000000000', 'Technical lyceum', 1, NULL, 'Tampere', '9', '044 559 1939', NULL, NULL),
('6918968008', 'sdftguji', 1, NULL, 'sxdcfghjk', '33', '0337336464', NULL, NULL),
('8165979827', 'wsedrgyhut5redrgyh', 1, NULL, 'dfghjyt543erfgy', '10', '0663775332', NULL, NULL),
('8594394139', 'sedrtgyhjikjhuygt', 1, NULL, 'sdcfgyhuj', '77', '9665774848', NULL, NULL),
('8758939778', 'szxdfghjk', 1, NULL, 'azsdfghjk', '88', '0886775434', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблиці `studying`
--

CREATE TABLE `studying` (
  `student_id` int(11) NOT NULL,
  `subject_id` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `studying`
--

INSERT INTO `studying` (`student_id`, `subject_id`) VALUES
(12344478, '7016360186');

-- --------------------------------------------------------

--
-- Структура таблиці `subjects`
--

CREATE TABLE `subjects` (
  `sub_id` varchar(15) NOT NULL,
  `title` varchar(100) NOT NULL,
  `class_num` int(11) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `subjects`
--

INSERT INTO `subjects` (`sub_id`, `title`, `class_num`, `notes`, `teacher_id`) VALUES
('1868974364', 'Логічне програмування', 8, 'Курс по прологу, де ми самі все вчимо', 123456338),
('7016360186', 'Бази даних', 6, 'Nотатки', 123456338);

-- --------------------------------------------------------

--
-- Структура таблиці `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `patronymic` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `education` varchar(255) NOT NULL,
  `phd` tinyint(1) NOT NULL DEFAULT 0,
  `notes` varchar(255) DEFAULT NULL,
  `school_id` varchar(10) NOT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп даних таблиці `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `name`, `surname`, `patronymic`, `email`, `phone`, `education`, `phd`, `notes`, `school_id`, `password`) VALUES
(12345678, 'wsedrftgyhujik', 'awsedrgyhujikol', 'wsedrtfgyhuj', 'hell@g666m2aid.dd', '', '', 0, NULL, '0000000000', '230ef66572fb3b00faa545b742ac3621'),
(123456338, 'Наталія', 'Шкаровська', 'Сергіївна', 'email', '', 'НаУКМА', 0, NULL, '0000000000', '61678f95579e47a820713167d4c93b2a');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_uindex` (`email`),
  ADD UNIQUE KEY `admins_login_uindex` (`login`);

--
-- Індекси таблиці `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cities_city_uindex` (`city`);

--
-- Індекси таблиці `hometasks`
--
ALTER TABLE `hometasks`
  ADD PRIMARY KEY (`hw_id`),
  ADD KEY `subject_id` (`subject_id`),
  ADD KEY `hw_id` (`hw_id`);

--
-- Індекси таблиці `hometask_hyperlinks`
--
ALTER TABLE `hometask_hyperlinks`
  ADD PRIMARY KEY (`hyper_id`),
  ADD KEY `homework_id` (`homework_id`);

--
-- Індекси таблиці `pupils`
--
ALTER TABLE `pupils`
  ADD PRIMARY KEY (`student_id`),
  ADD UNIQUE KEY `UNIQUE` (`email`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Індекси таблиці `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`code`(9)),
  ADD KEY `code` (`code`),
  ADD KEY `schools_cities_id_fk` (`city`);

--
-- Індекси таблиці `studying`
--
ALTER TABLE `studying`
  ADD PRIMARY KEY (`student_id`,`subject_id`),
  ADD KEY `student_id` (`student_id`,`subject_id`),
  ADD KEY `student_id_2` (`student_id`,`subject_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Індекси таблиці `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`sub_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `subject_id` (`sub_id`);

--
-- Індекси таблиці `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`),
  ADD UNIQUE KEY `UNIQUE` (`email`),
  ADD KEY `school_id` (`school_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблиці `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблиці `hometasks`
--
ALTER TABLE `hometasks`
  MODIFY `hw_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблиці `hometask_hyperlinks`
--
ALTER TABLE `hometask_hyperlinks`
  MODIFY `hyper_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблиці `pupils`
--
ALTER TABLE `pupils`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12345679;

--
-- AUTO_INCREMENT для таблиці `teachers`
--
ALTER TABLE `teachers`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123456339;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `hometasks`
--
ALTER TABLE `hometasks`
  ADD CONSTRAINT `hometasks_ibfk_1` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`sub_id`),
  ADD CONSTRAINT `hometasks_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`sub_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `hometask_hyperlinks`
--
ALTER TABLE `hometask_hyperlinks`
  ADD CONSTRAINT `hometask_hyperlinks_ibfk_1` FOREIGN KEY (`homework_id`) REFERENCES `hometasks` (`hw_id`),
  ADD CONSTRAINT `hometask_hyperlinks_ibfk_2` FOREIGN KEY (`homework_id`) REFERENCES `hometasks` (`hw_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hometask_hyperlinks_ibfk_3` FOREIGN KEY (`homework_id`) REFERENCES `hometasks` (`hw_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `hometask_hyperlinks_ibfk_4` FOREIGN KEY (`homework_id`) REFERENCES `hometasks` (`hw_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `pupils`
--
ALTER TABLE `pupils`
  ADD CONSTRAINT `pupils_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`) ON DELETE CASCADE,
  ADD CONSTRAINT `pupils_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`) ON DELETE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `schools_cities_id_fk` FOREIGN KEY (`city`) REFERENCES `cities` (`id`);

--
-- Обмеження зовнішнього ключа таблиці `studying`
--
ALTER TABLE `studying`
  ADD CONSTRAINT `studying_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `pupils` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `studying_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`sub_id`) ON DELETE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`teacher_id`) ON DELETE CASCADE;

--
-- Обмеження зовнішнього ключа таблиці `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`school_id`) REFERENCES `schools` (`code`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
