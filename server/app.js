const express = require('express');

// const db = require('../db/db');

const app = express();
app.use(require('morgan')('dev')); // Logs all inbound requests to console

app.use(express.json());
app.use(express.static('dist'));

app.get('/api/hello', (req, res) => {
  res.send('Hello');
})

module.exports = app;
