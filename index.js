// Imports to variables. Express used throughout. fs used to write to db for data persistence. Path used for routes.
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('/db/db.json');

// Uses environment port, or 3001 if not environment port not specified.
const PORT = process.env.port || 3001;
const app = express();