DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
   id        INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT
  ,firstName VARCHAR(8) NOT NULL
  ,lastName  VARCHAR(9) NOT NULL
  ,username  VARCHAR(16) NOT NULL
  ,color     VARCHAR(6) NOT NULL
);
INSERT INTO users(id,firstName,lastName,username,color) VALUES (1,'Zena','Zulauf','Katlynn_Brekke','green');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (2,'Muhammad','Torphy','Martina39','gray');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (3,'Carlee','Tromp','Carmen37','purple');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (4,'Taylor','Shanahan','Doyle_Legros81','red');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (5,'Estell','Reichel','Santiago.Dibbert','red');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (6,'Reece','Stehr','Destany75','red');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (7,'Kiarra','Beier','Edison87','yellow');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (8,'Alberto','Gibson','Marianna_Collins','green');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (9,'Johanna','Bashirian','Mervin.Grant','yellow');
INSERT INTO users(id,firstName,lastName,username,color) VALUES (10,'Thalia','Kozey','Ashley22','yellow');


select * from users;