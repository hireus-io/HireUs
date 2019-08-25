const express = require('express');
const fs = require('fs');

// const db = require('../db/db');

const app = express();
app.use(require('morgan')('dev')); // Logs all inbound requests to console

app.use(express.json());
app.use(express.static('dist'));

app.get('/api/hello', (req, res) => {
  res.send('Hello');
})

const puppeteer = require('puppeteer');
 


const program = require('commander');
program.version('0.0.1');

app.get('/submit', (req, res) => {
  //create a resume.json file with the request

  fs.writeFile('resume.json', '{req.body} again', err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  (async () => {
    try {
    console.log('puppeteer')
    const browser = await puppeteer.launch();
    console.log('browser')
    const page = await browser.newPage();
    console.log('page')
    await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
    await page.pdf({path: 'hn.pdf', format: 'A4'});
   
    await browser.close();
    }
    catch (err) {
      console.log(err);
    }
  })();

  program
    .command('echo hello world');
    //.command(`nano resume.json, ${req.body}`)
  //make pdf version of resume and send to yuuvis'  
    //.command(`resume export [filePath/fileName] --format pdf --theme flat`)
    res.send('nope');
})


 

module.exports = app;
