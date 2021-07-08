drop database if exists avoter;
create database avoter;
use avoter;

--
-- Table structure for table `actualites`
--
drop table if exists votant; 
create table votant
(
	id_votant INT PRIMARY KEY NOT NULL auto_increment,
	nom VARCHAR(100),
	prenom VARCHAR(100),
	naissance DATE,
    tel VARCHAR(255),
    email VARCHAR(255),
    mdp VARCHAR(255),
    fichier VARCHAR(255),
    Statut boolean DEFAULT 0,
    A_vote boolean DEFAULT 0
);

--
-- Table structure for table `actualites`
--
DROP TABLE IF EXISTS actualites;
CREATE TABLE actualites (
  id_actualite int NOT NULL AUTO_INCREMENT,
  nom varchar(500) DEFAULT NULL,
  image varchar(500) DEFAULT NULL,
  description text,
  url varchar(500) DEFAULT NULL,
  PRIMARY KEY (id_actualite)
) ;
--
-- Dumping data for table `actualites`
--
INSERT INTO actualites 
VALUES 
(1,'Résultats des élections régionales 2021','https://img.lemde.fr/2021/06/27/0/0/5184/3888/1328/0/45/0/31f92d7_221668703-aj24610.jpg','En duel, avec le soutien d’une partie de la gauche, le président sortant Les Républicains a largement battu Thierry Mariani et les listes du Rassemblement national en Provence-Alpes-Côte d’Azur.','https://www.lemonde.fr/politique/article/2021/06/28/regionales-2021-en-paca-la-victoire-au-bout-du-chemin-de-croix-pour-renaud-muselier_6085984_823448.html'),
(2,'Dans le Nord, un avant-goût de la bataille présidentielle entre Emmanuel Macron et Xavier Bertrand','https://img.lemde.fr/2021/06/28/0/0/3600/2400/1328/0/45/0/0a728c2_857448229-macron-bertrand-douai-02.jpg','Le chef de l’Etat était à Douai, lundi 28 juin, pour vanter l’implantation sur le site de Renault d’une usine de batteries électriques. Il a croisé le président de la région Hauts-de-France, au lendemain du second tour des élections régionales.','https://www.lemonde.fr/politique/article/2021/06/28/dans-le-nord-un-avant-gout-de-la-bataille-presidentielle-entre-emmanuel-macron-et-xavier-bertrand_6086098_823448.html'),
(3,'Changement climatique, inégalités et retraites : les recommandations d’un comité d’économistes à Emmanuel Macron','https://img.lemde.fr/2021/06/23/0/0/3600/2400/1328/0/45/0/da3e073_363611411-macron-blanchard-tirole-rapport-06.jpg','Rédigé sous la houlette d’Olivier Blanchard, ancien du FMI, et de Jean Tirole, prix Nobel d’économie, le rapport sur « les grands défis économiques » de la France tente d’esquisser l’après-crise sanitaire.','https://www.lemonde.fr/politique/article/2021/06/23/sortie-de-crise-des-economistes-internationaux-au-chevet-de-la-politique-de-macron_6085388_823448.html');


--
-- Table structure for table `election`
--
DROP TABLE IF EXISTS election;
CREATE TABLE election (
  ID_election int NOT NULL,
  Type varchar(50) DEFAULT NULL,
  id_gagnant int DEFAULT NULL,
  PRIMARY KEY (ID_election)
) ;
--
-- Dumping data for table `election`
--
INSERT INTO election 
VALUES 
(1,'Présidentielle', null),
(2,'Régionale', null);


--
-- Table structure for table `tour`
--
DROP TABLE IF EXISTS tour;
CREATE TABLE tour (
  ID_tour int NOT NULL,
  Num_tour int DEFAULT NULL,
  début_tour date DEFAULT NULL,
  fin_tour date DEFAULT NULL,
  ID_election int NOT NULL,
  termine boolean,
  PRIMARY KEY (ID_tour),
  KEY ID_election (ID_election),
  CONSTRAINT tour_ibfk_1 FOREIGN KEY (ID_election) REFERENCES election (ID_election)
) ;
--
-- Dumping data for table `tour`
--
INSERT INTO `tour` 
VALUES 
(1,1,'2021-06-28','2021-09-05',1,0),
(2,2,'2022-05-26','2022-05-29',1,0),
(3,1,'2024-09-08','2024-09-11',2,0),
(4,2,'2024-09-18','2024-09-21',2,0);


--
-- Table structure for table `candidat`
--
DROP TABLE IF EXISTS candidat;
CREATE TABLE candidat (
  ID_candidat int NOT NULL,
  Prenom varchar(50) DEFAULT NULL,
  Nom varchar(50) DEFAULT NULL,
  Image varchar(150) DEFAULT NULL,
  Date_naissance varchar(45) DEFAULT NULL,
  Parti varchar(50) DEFAULT NULL,
  Description varchar(100) DEFAULT NULL,
  ID_election int NOT NULL,
  ID_tour int NOT NULL,
  Votes int DEFAULT 0,
  PRIMARY KEY (ID_candidat),
  KEY ID_election (ID_election),
  KEY candidat_ibfk_2_idx (ID_tour),
  CONSTRAINT candidat_ibfk_1 FOREIGN KEY (ID_election) REFERENCES election (ID_election),
  CONSTRAINT candidat_ibfk_2 FOREIGN KEY (ID_tour) REFERENCES tour (ID_tour)
) ;
--
-- Dumping data for table `candidat`
--
INSERT INTO candidat 
VALUES 
(1,'Marine','Lepen','https://www.actusoins.com/wp-content/uploads/2017/04/photo-marine-738x1024.jpg','1968-08-05','Rassemblement National','Extrême droite',1,1,0),
(2,'Nicolas','Sarkozy','https://upload.wikimedia.org/wikipedia/commons/a/a6/Nicolas_Sarkozy_in_2010.jpg','1955-01-28','Républicain','Centre',1,1,0),
(3,'Emmanuel','Macron','https://upload.wikimedia.org/wikipedia/commons/c/c3/Emmanuel_Macron_%28cropped%29.jpg','1977-12-21','La république en marche','Extrême gauche',1,1,0),
(4,'Jean-Luc','Mélenchon','https://pbs.twimg.com/profile_images/1325498865718603780/KNjT2X4U_400x400.jpg','1951-08-19','La France insoumise','Droite',1,1,0),
(5,'Valérie','Pécresse','https://www.affiches-parisiennes.com/content/images/2021/05/03/12248/valerie-precresse.jpg','1967-07-14','Soyons libres !','Centre',2,1,0),
(6,'Julien','Bayou','https://prets.ecologie2021.fr/wp-content/uploads/sites/2/2020/01/julienbayou-idf.png','1980-06-11','Alternative écologiste et sociale','Gauche',2,1,0),
(7,'Clémentine','Autain','https://static.actu.fr/uploads/2021/06/clementine-autain-01.jpg','1973-05-26','Front de gauche','Extrême gauche',2,1,0);

