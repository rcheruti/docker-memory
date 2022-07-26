
CREATE DATABASE IF NOT EXISTS `docker-memory` ;

USE `docker-memory` ;

CREATE TABLE IF NOT EXISTS pessoa (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(150) DEFAULT NULL,
  PRIMARY KEY (id)
)
;

CREATE TABLE IF NOT EXISTS carro (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(150) DEFAULT NULL,
  cor varchar(80) DEFAULT NULL,
  ano numeric(5) DEFAULT NULL,
  pessoa_id int DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_carro_pessoa_id FOREIGN KEY (pessoa_id) REFERENCES pessoa (id)
)
;

