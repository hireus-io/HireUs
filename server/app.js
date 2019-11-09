const express = require('express');
const cp = require('child_process');
const util = require('util');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const request = require('request');
const pug = require('pug');
const puppeteer = require('puppeteer');

const compiledFunction = pug.compileFile(path.join(`${__dirname}/pug/template.pug`));
const cookieSession = require('cookie-session');
const passport = require('passport');
const verifyUser = require('./Middleware/verifyUser');
const sample_data = require('./pug/sample_data');
const { createResume, getResumeByEmail } = require('./db/Controllers/Resume');

require('dotenv').config();
require('./db/config');

function createDocumentMetadata(doc_email, doc_keywords, doc_fileName, cid, doc_contentType) {
  return {
    objects: [
      {
        properties: {
          'enaio:objectTypeId': {
            value: 'resume',
          },
          email: {
            value: doc_email,
          },
          keywords: {
            value: doc_keywords,
          },
        },
        contentStreams: [{
          mimeType: doc_contentType,
          fileName: doc_fileName,
          cid,
        }],
      },
    ],
  };
}

function createImportFormdata(doc_email, doc_keywords, doc_fileName, cid, doc_contentType) {
  const meta = JSON.stringify(createDocumentMetadata(doc_email, doc_keywords, doc_fileName, cid, doc_contentType));
  const formData = {};
  formData.data = {
    value: meta,
    options: {
      contentType: 'application/json',
    },
  };
  formData[cid] = {
    value: fs.createReadStream(doc_fileName),
    options: {
      contentType: doc_contentType,
      filename: doc_fileName,
    },
  };
  return formData;
}

function createRequest(doc_email, doc_keywords, doc_fileName, cid, doc_contentType) {
  const baseUrl = 'https://api.yuuvis.io/';
  return {
    method: 'POST',
    uri: `${baseUrl}dms-core/objects/`,
    headers: {
      Accept: 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.API_KEY,
    },
    formData: createImportFormdata(doc_email, doc_keywords, doc_fileName, cid, doc_contentType),
  };
}


async function executeRequest(request_object) {
  return new Promise((resolve, reject) => {
    request.post(request_object, (err, httpResponse, body) => {
      if (err) reject(err);
      else {
        resolve(body);
      }
    });
  });
}

async function genResume(resume) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const html = compiledFunction({ resume: JSON.parse(resume) });
  await page.goto(`data:text/html,${html}`, { waitUntil: 'domcontentloaded' });
  const buffer = await page.pdf({ format: 'A4' });
  browser.close();
  return buffer;
}

const app = express();
app.use(require('morgan')('dev'));
// Logs all inbound requests to console
app.use(express.static('dist'));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SESSION],
}));
require('./auth');

app.use(passport.initialize());
app.use(passport.session());
// app.post('/api/resume', (req, res) => {

// });

app.get('/api/download/resume', (req, res) => {
  res.download('resume.pdf', 'resume.pdf');
});

/*
  TEST POST

  This post request:
  1) gets json resume from client-side
  2) posts the json to yuuvis
  3) returns yuuvis response body

*/
app.get('/api/resume', verifyUser, express.json(), (req, res) => {
  console.log('Received get request for user', req.user.email);
  getResumeByEmail(req.user.email)
    .then((results) => {
      if (results) {
        const url = `https://api.yuuvis.io/dms-core/objects/${results[0].objectId}/contents/file`;
        const key = process.env.API_KEY;
        const headers = { headers: { 'Ocp-Apim-Subscription-Key': key } };
        console.log(url, headers);
        axios.get(url, headers)
          .then((response) => {
            console.log('Client previously submitted resume: ', response.data);
            res.json(response.data);
          });
      } else {
        res.send({});
      }
    });
});
app.post('/api/resume', verifyUser, express.json(), (req, res) => {
  let { email, keywords, resume } = req.body;
  // we need to add a function that writes to resume.json
  resume = JSON.stringify(resume);
  fs.writeFile(path.join(__dirname, '/resume.json'), resume, (err) => {
    if (err) throw err;
    const key = process.env.API_KEY;
    const baseUrl = 'https://api.yuuvis.io/';
    const doc_name = 'resume.json';
    const doc_fileName = path.join(__dirname, '/resume.json');
    const cid = 'cid_63apple';
    const doc_mimeType = 'application/json';
    const requestObject = createRequest(email, keywords, doc_fileName, cid, doc_mimeType);

    executeRequest(requestObject)
      .then((responseBody) => {
        const response = JSON.parse(responseBody);
        const objectId = response.objects[0].properties['enaio:objectId'].value;
        return createResume(req.user.email, objectId);
        // return genResume(resume);
      })
      .then(() => {
        res.send(201);
      })
      // .then((pugResume) => {
      //   res.type('application/pdf');
      //   res.send(pugResume)
      // })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.get('/api/pug', (req, res) => {
  res.send(pug.renderFile(path.join(`${__dirname}/pug/template.pug`), sample_data));
});
// TODO: Refactor Puppeteer function to its own file
app.get('/api/resume/download', express.json(), (req, res) => {
  const { resume } = sample_data;
  genResume(resume).then((pugResume) => {
    res.type('application/pdf');
    res.send(pugResume);
  });
});
app.post('/api/resume/download', express.json(), (req, res) => {
  const { resume } = req.body;
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const html = pug.renderFile(path.join(`${__dirname}/pug/template.pug`), sample_data);
    await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle2' });
    const buffer = await page.pdf({ format: 'A4' });
    res.type('application/pdf');
    res.send(buffer);
    browser.close();
  })();
});

app.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: true }),
  (req, res) => {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/auth/test', verifyUser, (req, res) => {
  res.send(`User authenitcated. Welcome back ${req.user.email}`);
});

app.get('/auth/user', (req, res) => {
  if (req.user) {
    res.send({
      isLoggedIn: true,
      email: req.user.email,
    });
  } else {
    res.send({
      isLoggedIn: false,
    });
  }
});

app.get('/api/resume/:keywords', (req, res) => {
  const { keywords } = req.params;
  const searches = keywords.split('&');
  let searchString = '';

  for (let i = 0; i < searches.length; i++) {
    searchString += `CONTAINS('${searches[i]}') OR `;
  }
  searchString = searchString.substring(0, searchString.length - 4);
  axios({
    url: 'https://api.yuuvis.io/dms/objects/search',
    method: 'POST',
    headers: { 'Ocp-Apim-Subscription-Key': process.env.API_KEY },
    data: {
      query: {
        statement: `SELECT * FROM enaio:object WHERE ${searchString}`,
      },
    },
  })
    .then((response) => {
      const promises = response.data.objects.map((entry) => {
        const objectId = entry.properties['enaio:objectId'].value;
        const contentType = entry.contentStreams[0].mimeType;
        if (contentType === 'application/pdf') {
          return;
        }
        const headers = { headers: { 'Ocp-Apim-Subscription-Key': process.env.API_KEY } };
        return axios.get(`https://api.yuuvis.io/dms/objects/${objectId}/contents/file`, headers);
      });
      Promise.all(promises)
        .then((results) => {
          const resumes = results.map((result) => {
            const resume = result.data;
            const objectId = result.request.path.split('/')[3];
            resume.objectId = objectId;
            return resume;
          });
          res.send(resumes);
        })
        .catch((err) => {
          throw (err);
          res.send();
        });
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.send('');
    });
});

app.post('/api/resumeupdate', express.json(), (req, res) => {
  let {
    email, keywords, resume, objectId,
  } = req.body;
  // we need to add a function that writes to resume.json
  resume = JSON.stringify(resume);
  fs.writeFile(path.join(__dirname, '/resume.json'), resume, (err) => {
    if (err) throw err;
    const key = process.env.API_KEY;
    const baseUrl = 'https://api.yuuvis.io/';
    const doc_name = 'resume.json';
    const doc_fileName = path.join(__dirname, '/resume.json');
    const cid = 'cid_63apple';
    const doc_mimeType = 'application/json';
    const requestObject = createRequest(email, keywords, doc_fileName, cid, doc_mimeType);
    const headers = { headers: { 'Ocp-Apim-Subscription-Key': process.env.API_KEY } };
    executeRequest(requestObject);
    axios.delete(`https://api.yuuvis.io/dms/objects/${objectId}`, headers);
    console.log('Deleted');
    res.send(201);
  });
});
module.exports = app;
