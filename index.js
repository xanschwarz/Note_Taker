// Imports to variables. Express used throughout. fs used to write to db for data persistence. Path used for routes.
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

// Uses environment port, or 3001 if not environment port not specified.
const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing application/json and urlencoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// HTML get routes.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// API get route.
// For below, is db.slice(1) necessary?
app.get('/api/notes', (req, res) => {
    res.json(db);
});

// function for generating a new note

// post request for new note

// function to delete note

// delete request

// Start the server.
app.listen(PORT, () =>
  console.log(`Note Taker app listening at http://localhost:${PORT} 🚀`)
);
