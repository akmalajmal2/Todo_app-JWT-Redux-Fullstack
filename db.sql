-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: todo_app
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `newuser`
--

DROP TABLE IF EXISTS `newuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newuser` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newuser`
--

LOCK TABLES `newuser` WRITE;
/*!40000 ALTER TABLE `newuser` DISABLE KEYS */;
INSERT INTO `newuser` VALUES (1,'akmal','$2b$08$UDULih9LsAQ7IKDRBggwce0vrPyrgLJ7Y0pUBQ88hl5CbIjixWHsW'),(2,'ajmal','$2b$08$ze7gJIHJzUJzpLkQGw0.ROam.iqtGtrWI26QXEpUt5qcYZpinCVze'),(3,'abcd','$2b$08$GWSzIRb2t9AIxHvsYLevVuT9jBWWmrZcvHMA/.WRdh6MxIDeKQnSO'),(4,'aqq','$2b$08$Uks4noJjoShJ6WYSxt.9kezhHa0.dv2auAvgTjwVM73QJGw7az8kO'),(5,'test','$2b$08$UwLibScRODgEJR9./oUZ1OftTZtYOd8nyWXeRtiy36zrvQWXm0AY.'),(6,'w','$2b$08$bbriowlCWPr61ipwVUaPPu6U8qE1mMDxwSO8wske5U.dXmKSMgvhO');
/*!40000 ALTER TABLE `newuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todos`
--

DROP TABLE IF EXISTS `todos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` longtext,
  `status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `todos_ibfk_1` (`user_id`),
  CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_data` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todos`
--

LOCK TABLES `todos` WRITE;
/*!40000 ALTER TABLE `todos` DISABLE KEYS */;
INSERT INTO `todos` VALUES (2,NULL,'www','WORKING',0,'2025-03-05 11:41:34'),(3,5,'we','a',0,'2025-03-05 11:43:33'),(6,5,'hello world','this is description',0,'2025-03-06 08:03:16'),(7,5,'This is Heading','I am working under pressure',0,'2025-03-06 08:04:07'),(9,5,'Workingsss','Helloa',0,'2025-03-06 08:07:14'),(12,5,'New Title','This is the description where used to define',0,'2025-03-06 11:28:27'),(17,13,'abcd','werdef',0,'2025-03-06 11:42:18');
/*!40000 ALTER TABLE `todos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
INSERT INTO `user_data` VALUES (4,'aaa','aws@gmail.com','$2b$10$WVE2vUiSrYKGSYg355kXi.8Mgw0eZ1Nmr05s1xQC2QREWVcxBRsm6'),(5,'akmal','akmal@gmail.com','$2b$10$8G75x4f646yV5QdUbGFpBuNiK7ntN2zIjCJ9catSe6fqDPb80CAkm'),(6,'akmal','akmalajmal@gmail.com','$2b$10$0KXWVBB3wvz3q4ElrNMWAen9RGof/vfsfzvGjzgHXE/k8QcpOLQNO'),(7,'abcd','qqq@gmail.com','$2b$10$kmM5WQ5sh2uOqFeto3guqO/kE1sMkfGZ53lLMr5z0dRKpPdShxp..'),(8,'rrr','rrr@gmail.com','$2b$10$E/UJxUi9nkR78nxAY7//AOzb57VtKc8aIXjCcui6oRO/Z6EGUNp4m'),(9,'rrr','qq@gmail.com','$2b$10$t.TLnMMd1oE.fRdhkW6Ra.7axphdq7XXHe5MVZbhxxJYfc/2JHbw6'),(10,'rrrt','ttt@gmail.com','$2b$10$Ubi1Lhu.Q7dMaD4jjrDNO.VWbockn3QyilY9DCrK3pLX8E7fcYW/e'),(11,'rrr','111@gmail.com','$2b$10$wBywWzm9n4um3tfXLEclPuqR9l4OpvjQ34wEQsJimq2V.TqygL3Cm'),(12,'qwe','qqqs@gmail.com','$2b$10$0RMx/fsc4owH6j8GHwgvn.WOzcwPQcUITw/XnFQAQo75zfL0u34XG'),(13,'Ajmal','ajmal@gmail.com','$2b$10$zmUskXpsC3xCPp7/gJqkquL1rNfdorZ4LPXpPrM6b.1koJ3ko5HQm');
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-06 17:20:36
