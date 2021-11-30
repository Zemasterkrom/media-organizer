CREATE DATABASE IF NOT EXISTS TP4;
USE TP4;

DROP TABLE IF EXISTS member;
CREATE TABLE member (
  member int(11) NOT NULL,
  firstName varchar(50) DEFAULT NULL,
  lastName varchar(50) DEFAULT NULL,
  adress varchar(50) DEFAULT NULL,
  PRIMARY KEY (member)
);

DROP TABLE IF EXISTS book;
CREATE TABLE book (
  ISBN varchar(50) NOT NULL,
  title varchar(50) DEFAULT NULL,
  type varchar(50) DEFAULT NULL,
  price float DEFAULT NULL,
  nbExamples int DEFAULT NULL,
  authors varchar(150) DEFAULT NULL,
  PRIMARY KEY (Formateur_ID)
);
