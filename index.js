// Imports necessary modules. Express used throughout. fs used to write to db for data persistence. Path used for routes.
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');
dbPath = './db/db.json';

// Uses environment port, or 3001 if not environment port not specified.
const PORT = process.env.port || 3001;
const app = express();

// Middleware for parsing application/json and urlencoded data.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// API get route.
app.get('/api/notes', (req, res) => {
    res.json(db);
});

// Post request for new note.
app.post('/api/notes', (req, res) => {
    const genNewNote = newNote(req.body, db);
    res.json(genNewNote);
});

// Function for new note.
function newNote(body, notes) {
    // Set user input and existing notes to variables. Add a unique ID to the new note and push the note to the collected notes array.
    const noteToAdd = body;
    noteToAdd.id = uuidv4();
    const notesArr = notes || [];
    notesArr.push(noteToAdd);

    // Write the collected notes to the db.json and return the added note.
    fs.writeFileSync(path.join(__dirname, dbPath), JSON.stringify(notesArr));
    return noteToAdd;
}

// function to delete note

// delete request

// HTML get routes.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Start the server.
app.listen(PORT, () =>
  console.log(`Note Taker app listening at http://localhost:${PORT} 🚀`)
);
