CREATE DATABASE  IF NOT EXISTS `photos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `photos`;
-- MySQL dump 10.13  Distrib 5.6.17, for osx10.6 (i386)
--
-- Host: 127.0.0.1    Database: photos
-- ------------------------------------------------------
-- Server version	5.6.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(45) DEFAULT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `postalCode` varchar(45) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  `defaultAddress` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (2,'1','Mini','Mouse2','101 Disney Lane','Orlando','10101','617',0),(3,'1','Micky','Mouse','502 Baker St','London','1010','617',0);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `imgId` varchar(45) NOT NULL,
  `imgSrc` varchar(255) NOT NULL,
  `frameSize` varchar(45) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (8,1,'4ad0ffe0-a0f9-11e5-ba3e-99679b6f6a33','http://localhost:3000/repo/4ad0ffe0-a0f9-11e5-ba3e-99679b6f6a33.jpg','9x13',12,3,7),(9,1,'51d25d70-a0f9-11e5-ba3e-99679b6f6a33','http://localhost:3000/repo/51d25d70-a0f9-11e5-ba3e-99679b6f6a33.jpg','9x13',12,5,7),(10,1,'433c4c10-a132-11e5-9a95-bff477a02d98','http://localhost:3000/repo/433c4c10-a132-11e5-9a95-bff477a02d98.jpg','9x13',12,2,NULL),(11,1,'48525460-a132-11e5-9a95-bff477a02d98','http://localhost:3000/repo/48525460-a132-11e5-9a95-bff477a02d98.jpg','9x13',12,2,NULL),(12,1,'433c4c10-a132-11e5-9a95-bff477a02d98','http://localhost:3000/repo/433c4c10-a132-11e5-9a95-bff477a02d98.jpg','9x13',12,2,NULL),(13,1,'48525460-a132-11e5-9a95-bff477a02d98','http://localhost:3000/repo/48525460-a132-11e5-9a95-bff477a02d98.jpg','9x13',12,2,NULL);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `trackingId` varchar(45) NOT NULL,
  `noOfProduct` int(11) NOT NULL,
  `noOfPrints` int(11) NOT NULL,
  `printCost` int(11) DEFAULT '0',
  `shippingCost` int(11) DEFAULT '0',
  `discount` int(11) DEFAULT '0',
  `finalCost` int(11) DEFAULT '0',
  `shippingMethod` varchar(45) NOT NULL,
  `orderStatus` varchar(45) NOT NULL,
  `orderDate` datetime NOT NULL,
  `addressId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trackingId_UNIQUE` (`trackingId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (6,1,'0412e870-a103-11e5-9073-8746e2e58457',2,8,96,200,0,296,'standard','ORDERED','2015-12-12 19:03:22',1),(7,1,'ec0ab9b0-a111-11e5-af36-b5c9345a7bf2',2,8,96,200,0,296,'standard','ORDERED','2015-12-12 20:50:05',2);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imgId` varchar(45) NOT NULL,
  `imgSrc` varchar(255) NOT NULL,
  `fileName` varchar(100) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `createdOn` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (16,'19da6880-a050-11e5-9a8c-5b324c7f6a10','http://localhost:3000/repo/19da6880-a050-11e5-9a8c-5b324c7f6a10.png','19da6880-a050-11e5-9a8c-5b324c7f6a10.png',NULL,1599,528,'2015-12-11 21:42:39'),(17,'1e4340e0-a050-11e5-9a8c-5b324c7f6a10','http://localhost:3000/repo/1e4340e0-a050-11e5-9a8c-5b324c7f6a10.png','1e4340e0-a050-11e5-9a8c-5b324c7f6a10.png',NULL,1851,964,'2015-12-11 21:42:47'),(18,'5710a0c0-a055-11e5-ac64-afd7bbb0b5ae','http://localhost:3000/repo/5710a0c0-a055-11e5-ac64-afd7bbb0b5ae.png','5710a0c0-a055-11e5-ac64-afd7bbb0b5ae.png',NULL,1599,528,'2015-12-11 22:20:09'),(19,'8b8f1f70-a087-11e5-a44e-b50488f96149','http://localhost:3000/repo/8b8f1f70-a087-11e5-a44e-b50488f96149.png','8b8f1f70-a087-11e5-a44e-b50488f96149.png',NULL,1599,528,'2015-12-12 04:19:32'),(20,'92858080-a087-11e5-a44e-b50488f96149','http://localhost:3000/repo/92858080-a087-11e5-a44e-b50488f96149.png','92858080-a087-11e5-a44e-b50488f96149.png',NULL,1851,964,'2015-12-12 04:19:44'),(21,'a7ec52a0-a087-11e5-a44e-b50488f96149','http://localhost:3000/repo/a7ec52a0-a087-11e5-a44e-b50488f96149.png','a7ec52a0-a087-11e5-a44e-b50488f96149.png',NULL,1851,964,'2015-12-12 04:20:20'),(22,'4ad0ffe0-a0f9-11e5-ba3e-99679b6f6a33','http://localhost:3000/repo/4ad0ffe0-a0f9-11e5-ba3e-99679b6f6a33.jpg','4ad0ffe0-a0f9-11e5-ba3e-99679b6f6a33.jpg',1,828,729,'2015-12-12 17:53:46'),(23,'51d25d70-a0f9-11e5-ba3e-99679b6f6a33','http://localhost:3000/repo/51d25d70-a0f9-11e5-ba3e-99679b6f6a33.jpg','51d25d70-a0f9-11e5-ba3e-99679b6f6a33.jpg',1,1058,1280,'2015-12-12 17:53:58'),(24,'433c4c10-a132-11e5-9a95-bff477a02d98','http://localhost:3000/repo/433c4c10-a132-11e5-9a95-bff477a02d98.jpg','433c4c10-a132-11e5-9a95-bff477a02d98.jpg',1,779,458,'2015-12-13 00:41:35'),(25,'48525460-a132-11e5-9a95-bff477a02d98','http://localhost:3000/repo/48525460-a132-11e5-9a95-bff477a02d98.jpg','48525460-a132-11e5-9a95-bff477a02d98.jpg',1,2460,3444,'2015-12-13 00:41:43');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pricing`
--

DROP TABLE IF EXISTS `pricing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pricing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `frameSize` varchar(45) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pricing`
--

LOCK TABLES `pricing` WRITE;
/*!40000 ALTER TABLE `pricing` DISABLE KEYS */;
INSERT INTO `pricing` VALUES (1,'9x13',12),(2,'10x15',18),(3,'13x19',24),(4,'15x23',36),(5,'20x30',120),(6,'25x38',200);
/*!40000 ALTER TABLE `pricing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_method`
--

DROP TABLE IF EXISTS `shipping_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_method` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `method` varchar(45) NOT NULL,
  `label` varchar(100) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_method`
--

LOCK TABLES `shipping_method` WRITE;
/*!40000 ALTER TABLE `shipping_method` DISABLE KEYS */;
INSERT INTO `shipping_method` VALUES (1,'standard','Standard 5 business days','5 business days after print is ready',200),(2,'priority','Priority shipping','2 business days after print is ready',400),(3,'overnight','Overnight shipping','1 business day after print is ready',800);
/*!40000 ALTER TABLE `shipping_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(45) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `facebookId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'52f8b9d8-c3f6-48b1-8d58-4978350812d7','Micky','Mouse','micky@gmail.com','password',NULL),(2,'57572df5-2b5d-4658-acfd-5cf883905cd7','Donald','Duck','donald@gmail.com','password',NULL),(3,'25669663-0e09-4d4c-9b83-9ffb9d521a82','Donald','Duck','donald2@gmail.com1','password',NULL),(4,'7271fc9d-5482-4954-85d2-0755f207d431','Donald','Duck','donald3@gmail.com1','password',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-12 22:20:32
