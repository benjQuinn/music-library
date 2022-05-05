const express = require('express');
const artistRoutes = require('./routes/artist');

const app = express();

app.use(express.json());

// Artist Routes
app.use('/artist', artistRoutes);

module.exports = app;
