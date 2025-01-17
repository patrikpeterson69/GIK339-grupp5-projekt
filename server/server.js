/* Importera npm-paket sqlite3 */
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./server/gik339.db');
const express = require('express');
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

// Här skapar vi upp en hantering av get req till endpointen cars 
server.get('/cars', (req, res) => {
  // sql fråga som hämtar alla bilar ur databasen. */
  const sql = 'SELECT * FROM cars';
  // Anrop till db objektets funktion .all som används till att hämta upp rader ur vår tabell cars
  db.all(sql, (err, rows) => {
    // Callbackfunktion som har parametern err för att lagra eventuella fel 
    if (err) {
      // Om det finns något i det objektet skickar vi ett svar tillbaka att något gick fel och info om vad som gick fel 
      res.status(500).send(err);
    } else {
      // Om allt gick bra skickar vi de rader om bilarna som hämtades upp.  
      res.send(rows);
    }
  });
});

// Server hanterar GET requests till endpointen "/cars/:id"
// och hämtar en specifik bil baserat på det ID som skickas med i URL:en
server.get('/cars/:id', (req, res) => {
  // Hämtar ID  från URL-parametern ":id"
  const id = req.params.id;

  // har skapar vi upp en SQL fråga för att hämta bilen med det angivna ID
  const sql = `SELECT * FROM cars WHERE id=${id}`;

  // Anropar databasens .all metod för att utföra SQL-frågan
  db.all(sql, (err, rows) => {
    // Kontrollera om det uppstår ett fel vid databasanropet
    if (err) {
      // Skickar tillbaka en statuskod 500 och detaljer om felet
      res.status(500).send(err);
    } else {
      // Om ingen fel uppstår skicka tillbaka den första bilen
      res.send(rows[0]);
    }
  });
});

/* Hanterar POST requests till endpointen "/cars"
och lägger till en ny bil i databasen */
server.post('/cars', (req, res) => {
  // Hämtar bilens data från requestens body
  const car = req.body;

  // SQL-fråga för att lägga till en ny bil i databasen
  // Använder platshållare (?) för att förhindra SQL-injektion
  const sql = `INSERT INTO cars(carbrand, model, year, color) VALUES (?,?,?,?)`;

  // Utför SQL query och skickar bilens data som värden
  db.run(sql, Object.values(car), (err) => {
    // Om det uppstår ett fel vid insättning i databasen
    if (err) {
      // Loggar vi felet och skickar tillbaka en statuskod 500 samt detaljer om felet
      console.log(err);
      res.status(500).send(err);
    } else {
      // Om insättningen lyckas skicka tillbaka ett meddelande
      res.send('Bilen sparades');
    }
  });
});


server.put('/cars', (req, res) => {
  const bodyData = req.body;

  const id = bodyData.id;
  const car = {
    carbrand: bodyData.carbrand,
    model: bodyData.model,
    year: bodyData.year,
    color: bodyData.color
  };

  let updateString = '';
  const columnsArray = Object.keys(car);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${car[column]}"`;
    if (i !== columnsArray.length - 1) updateString += ',';
  });
  const sql = `UPDATE cars SET ${updateString} WHERE id=${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Bilen uppdaterades');
    }
  });
  //UPDATE users SET firstName="Mikaela",lastName="Hedberg" WHERE id=1
});

server.delete('/cars/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM cars WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send('Bilen är borttagen');
    }
  });
});
