const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const meta = require('./metaData');


// const db = require('../db/db');

const app = express();
app.use(require('morgan')('dev')); // Logs all inbound requests to console

app.use(express.static('dist'));


/*
  TEST POST

  This post request:
  1) gets json resume from client-side
  2) posts the json to yuuvis
  3) returns yuuvis response body

*/
app.post('/api/resume', express.json(), (req, res) => {
  const formData = new FormData();
  formData.append('data', meta);
  formData.append('resume', req.body);
  axios({
    url: 'https://api.yuuvis.io/dms/objects',
    headers: formData.getHeaders(),
    data: formData,
  })
    .then((x) => {
      console.log(x);
      res.send(x);
    })
    .catch((e) => {
      console.log(e);
      res.send(e);
    });
});

module.exports = app;
