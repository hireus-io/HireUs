const express = require('express');
const cp = require('child_process');
const util = require('util');
const fs = require('fs');

const exec = util.promisify(cp.exec);

const app = express();
app.use(require('morgan')('dev')); // Logs all inbound requests to console

app.use(express.json());
app.use(express.static('dist'));

app.post('/api/resume', (req, res) => {
  fs.writeFile('resume.json', JSON.stringify(req.body.resume, null, 2), () => {
    exec('resume export resume.pdf')
      .then(() => {
        res.download('resume.pdf', 'resume.pdf');
      })
      .catch(() => {
        res.end();
      });
  });
});

app.get('/api/resume', (req, res) => {
  res.download('resume.pdf', 'resume.pdf');
});

module.exports = app;
