const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Express alkalmazás
const app = express();
const port = 3000;

// MySQL kapcsolat beállítása
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,        // A MySQL felhasználóneved
  password: '',        // A MySQL jelszavad
  database: 'pizza'
});

db.connect(err => {
  if (err) {
    console.error('Hiba a kapcsolódásnál: ' + err.stack);
    return;
  }
  console.log('Kapcsolódás sikeres a MySQL adatbázishoz.');
});

// Middleware
app.use(bodyParser.json());

// 1. futar lista lekérése
app.get('/futar', (req, res) => {
  db.query('SELECT * FROM futar', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Hiba a futar lista lekérésekor' });
    }
    res.json(results);
  });
});

// 2. Új futar hozzáadása
app.post('/futar', (req, res) => {
  const { fazon, fnev, ftel } = req.body;

  if (!fazon || !ftel) {
    return res.status(400).json({ error: 'Név és ár kötelező!' });
  }

  db.query('INSERT INTO futar (fazon, fnev, ftel) VALUES (?, ?, ?)', [fazon, fnev, ftel], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Hiba a futar hozzáadásakor' });
    }
    res.status(201).json({ id: result.insertId, fazon, fnev, ftel });
  });
});

// 3. futar módosítása
app.put('/futar/:id', (req, res) => {
  const { id } = req.params;
  const { fazon, fnev, ftel } = req.body;

  if (!fazon || !ftel) {
    return res.status(400).json({ error: 'Azonosító és telefonszám!' });
  }

  db.query('UPDATE futar SET fazon = ?, fnev = ?, ftel = ? WHERE id = ?', [fazon, fnev, ftel, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Hiba a futar módosításakor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'futar nem található' });
    }

    res.json({ id, fazon, fnev, ftel });
  });
});

// 4. futar törlése
app.delete('/futar/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM futar WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Hiba a futar törlésekor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'futar nem található' });
    }

    res.json({ message: 'futar sikeresen törölve' });
  });
});

// Alkalmazás indítása
app.listen(port, () => {
  console.log(`API elérhető a http://localhost:${port}`);
});