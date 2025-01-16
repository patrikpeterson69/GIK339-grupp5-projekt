DROP TABLE IF EXISTS cars;
CREATE TABLE IF NOT EXISTS cars(
   id         INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
   carbrand       VARCHAR(15) NOT NULL, -- Bilmärke, ex: Volvo, BMW
   model      VARCHAR(15) NOT NULL, -- Bilmodell, ex: XC90, i8
   year       INTEGER NOT NULL,     -- Tillverkningsår
   color      VARCHAR(10) NOT NULL  -- Färg, ex: röd, blå
);

INSERT INTO cars(id, carbrand, model, year, color) VALUES (1, 'Volvo', 'XC90', 2022, 'green');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (2, 'BMW', 'i8', 2020, 'gray');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (3, 'Audi', 'A6', 2021, 'purple');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (4, 'Tesla', 'Model 3', 2023, 'red');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (5, 'Ford', 'Focus', 2019, 'red');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (6, 'Toyota', 'Camry', 2021, 'red');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (7, 'Honda', 'Civic', 2020, 'yellow');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (8, 'Kia', 'Sportage', 2022, 'green');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (9, 'Hyundai', 'Tucson', 2023, 'yellow');
INSERT INTO cars(id, carbrand, model, year, color) VALUES (10, 'Mazda', 'CX-5', 2022, 'yellow');

SELECT * FROM cars;