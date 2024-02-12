-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: bienesraices_node_app
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

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
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Casa','2024-01-26 04:03:43','2024-01-26 04:03:43'),(2,'Departamento','2024-01-26 04:03:43','2024-01-26 04:03:43'),(3,'Bodega','2024-01-26 04:03:43','2024-01-26 04:03:43'),(4,'Terreno','2024-01-26 04:03:43','2024-01-26 04:03:43'),(5,'Cabaña','2024-01-26 04:03:43','2024-01-26 04:03:43');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mensaje` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `propiedadId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `propiedadId` (`propiedadId`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`propiedadId`) REFERENCES `propiedades` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `precios`
--

DROP TABLE IF EXISTS `precios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `precios`
--

LOCK TABLES `precios` WRITE;
/*!40000 ALTER TABLE `precios` DISABLE KEYS */;
INSERT INTO `precios` VALUES (1,'0 - $10,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(2,'$10,000 - $30,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(3,'$30,000 - $50,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(4,'$50,000 - $75,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(5,'$75,000 - $100,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(6,'$100,000 - $150,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(7,'$150,000 - $200,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(8,'$200,000 - $300,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(9,'$300,000 - $500,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43'),(10,'+ $500,000 USD','2024-01-26 04:03:43','2024-01-26 04:03:43');
/*!40000 ALTER TABLE `precios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propiedades`
--

DROP TABLE IF EXISTS `propiedades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propiedades` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `habitaciones` int NOT NULL,
  `estacionamiento` int NOT NULL,
  `wc` int NOT NULL,
  `calle` varchar(60) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `publicado` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `precioId` int DEFAULT NULL,
  `categoriaId` int DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `precioId` (`precioId`),
  KEY `categoriaId` (`categoriaId`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `propiedades_ibfk_1` FOREIGN KEY (`precioId`) REFERENCES `precios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `propiedades_ibfk_2` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `propiedades_ibfk_3` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propiedades`
--

LOCK TABLES `propiedades` WRITE;
/*!40000 ALTER TABLE `propiedades` DISABLE KEYS */;
INSERT INTO `propiedades` VALUES ('1a8f4d33-750b-4b8d-9970-96ab2255d759','Casa Independiente','Casa independiente a extrenas',4,2,3,'Buenos Aires','-17.373767357488','-66.159463081481','95e7g1qhn9o1hlsqqmct.jpg',1,'2024-02-05 14:30:15','2024-02-05 14:30:20',7,1,1),('2f87596c-5b37-4b2d-bf80-3c2388050aa6','Terreno al Lado de un Colegio','Terreno al lado de un colegio centrico',2,1,1,'Pasaje Guadalquivir','-17.374525786825','-66.158282873684','m53mo3vk9p1hlsr1tof.jpg',1,'2024-02-05 14:34:07','2024-02-05 14:34:17',3,4,1),('3889a586-35ff-441d-a0ba-cc0e39c8b11e','Terreno Frente al Estadium','Terreno amplio para construncción',2,1,1,'Avenida América','-17.371965991353','-66.171765158934','0vk41kgi0jo1hlsqm0tu.jpg',1,'2024-02-05 14:27:02','2024-02-05 14:27:47',7,4,1),('61b320bd-77a1-4ae3-94e8-995dbd0eca75','Casa en la Playa','Hemosa casa en la plaza',4,2,3,'Teófilo Vargas','-17.375538390375','-66.16365983196','6mm4nqeci61hlsqaos8.jpg',1,'2024-02-05 14:21:06','2024-02-05 14:21:38',6,1,1),('733c116f-1ac2-4e0a-afc4-37faf16e6cfd','Departamento Amplio Zona Sud','Departamento amplio ubicando en la zona sud',4,2,3,'Avenida América','-17.37322','-66.15259','fua1ub18geo1hlsvg7se.jpg',1,'2024-02-05 15:51:50','2024-02-05 15:52:00',9,2,1),('81cc9222-ca9c-46dc-b2ff-9d742f40bf34','Bodega Mediano','Bodega mediano en buena ubicación',1,1,1,'Pasaje Portales','-17.376303301943','-66.152970584846','keatk9c1cb1hlsqva7a.jpg',1,'2024-02-05 14:32:46','2024-02-05 14:32:51',3,3,1),('924345d3-3e2a-4ab2-b42d-7682edb7b387','Bodega Amplia','Bodega amplia en buena ubicación',2,2,1,'Avenida Pando','-17.374476018328','-66.151155762283','rbn7kv2ir981hlsqhbp2.jpg',1,'2024-02-05 14:24:31','2024-02-05 14:25:31',4,3,1),('942da710-b441-4c00-bab9-0a1f6ddc45f0','Departamento en Zona Recidencial','Departamente en una hemora zona recidencial',2,1,1,'Juan Capriles','-17.372130014641','-66.154088973999','25pup2semmg1hlsqtghg.jpg',1,'2024-02-05 14:31:38','2024-02-05 14:31:52',5,2,1),('cd10c537-8496-46a8-8cc4-f8394f74ab64','Casa Familiar','Casa familiar a extrenar frente a la plaza',4,2,3,'General Acha','-17.393286699273','-66.157037305786','7c1kf974voo1hlsvcp7v.jpg',1,'2024-02-05 15:49:56','2024-02-05 15:50:07',8,1,1),('d931a603-1619-49c9-8cf6-bf7ed1a42fa0','Cabaña Frente al Lago','Cabaña frente al lago con hermosa vista ',2,1,1,'Litoral','-17.400295145469','-66.144044259081','g567o0tfppg1hlsqouro.jpg',1,'2024-02-05 14:29:12','2024-02-05 14:29:23',8,5,1),('e6312fe2-ec30-4025-b2c9-f07f273eaa73','Cabaña en el Bosque','Hermosa cabaña en el bosque para relajarse un fin se semana',2,1,2,'Buenos Aires','-17.374235771424','-66.15233815392','opjgflhqa1g1hlsr5aqh.jpg',1,'2024-02-05 14:35:58','2024-02-05 14:36:08',5,5,1),('e96dc56a-f0e4-4a74-ba9e-48fa40721fc1','Departamento frente a la plaza','Departamento confortable frente a la plaza principal',3,1,2,'Pasaje Guadalquivir','-17.374440050238','-66.159476160283','qldbmdb57cg1hlsqcsgo.jpg',1,'2024-02-05 14:22:42','2024-02-05 14:22:47',5,2,1);
/*!40000 ALTER TABLE `propiedades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Adriano','adriano@correo.com','$2b$10$qNq9uCIGnQAwvS2rXGbCPe7xsweFOxPws2S0100TS/Ftu7VuAK8IW',NULL,1,'2024-01-26 04:03:43','2024-01-26 04:03:43'),(2,'Daniela','daniela@correo.com','$2b$10$.cpeq9DSqvfAOlFwAKHA0.N/gmXPicYH6Hx0Q8oIIGFaa94IHnj5y',NULL,1,'2024-02-12 16:27:57','2024-02-12 16:28:30');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-12 19:10:35
