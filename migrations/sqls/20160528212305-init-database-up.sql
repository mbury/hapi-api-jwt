DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(60) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `admin` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;

INSERT INTO `user` VALUES (1,'mbury','$2a$10$rwUrbH.5MLDEoEKnWVYJxeuZ7L/vQEkZlKfUMEAa0BPJ1PBw.uT7a','mbury@mail.com',1);

UNLOCK TABLES;
