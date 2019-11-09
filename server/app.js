const express = require('express');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const passport = require('passport');

const verifyUser = require('./middleware/verifyUser');
const sample_data = require('./pug/sample_data');
const yuuvis = require('./helper_functions/yuuvis');
const { createResume, getResumeByEmail } = require('./db/Controllers/Resume');
const { genResume } = require('./helper_functions/pug');

require('dotenv').config();
require('./db/config');

const app = express();
app.use(morgan('dev')); // Logs all inbound requests to console
app.use(express.static('dist'));
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_SESSION]
}))

//this require must be before passport initializes and after the cooke session middleware
require('./auth');
app.use(passport.initialize());
app.use(passport.session());


app.get('/api/resume', verifyUser, express.json(), (req, res) => {
  console.log('Received get request for user', req.user.email);
  getResumeByEmail(req.user.email)
    .then((results) => {
      if (results) {
        const url = `https://api.yuuvis.io/dms-core/objects/${results[0].objectId}/contents/file`
        const key = process.env.API_KEY;
        const headers = { headers: { "Ocp-Apim-Subscription-Key": key } }
        console.log(url, headers);
        axios.get(url, headers)
          .then((response) => {
            console.log('Client previously submitted resume: ', response.data);
            res.json(response.data);
          })
      }
      else {
        res.send({});
      }
    }
    );
});

app.post('/api/resume', verifyUser, express.json(), (req, res) => {
  let { email, keywords, resume } = req.body;
  // we need to add a function that writes to resume.json
  resume = JSON.stringify(resume);
  fs.writeFile(path.join(__dirname, '/resume.json'), resume, (err) => {
    if (err) throw err;
    const doc_fileName = path.join(__dirname, '/resume.json');
    const cid = 'cid_63apple';
    const doc_mimeType = 'application/json';
    const requestObject = yuuvis.createRequest(email, keywords, doc_fileName, cid, doc_mimeType);

    yuuvis.executeRequest(requestObject)
      .then((responseBody) => {
        const response = JSON.parse(responseBody);
        const objectId = response.objects[0].properties['enaio:objectId'].value;
        return createResume(req.user.email, objectId);
      })
      .then(() => {
        res.send(201);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

app.get('/api/resume/download', express.json(), (req, res) => {
  const resume = sample_data.resume;
  genResume(resume).then((pugResume) => {
    res.type('application/pdf');
    res.send(pugResume);
  });
});

app.post('/api/resume/download', express.json(), (req, res) => {
  const resume = req.body.resume;
  genResume(resume)
    .then((pugResume) => {
      res.type('application/pdf');
      res.send(pugResume);
    });
});

app.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: true }),
  function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

app.get('/auth/test', verifyUser, (req, res) => {
  res.send(`User authenitcated. Welcome back ${req.user.email}`);
});

app.get('/auth/user', (req, res) => {
  if (req.user) {
    res.send({
      isLoggedIn: true,
      email: req.user.email,
    })
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
    url: 'https://api.yuuvis.io/dms-core/objects/search',
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
        const headers = { headers: { 'Ocp-Apim-Subscription-Key': process.env.API_KEY } };
        if (contentType === 'application/pdf') {
          return;
        }

        return axios.get(`https://api.yuuvis.io/dms-core/objects/${objectId}/contents/file`, headers);
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
          console.log(err);
          res.send();
        });
    })
    .catch((error) => {
      console.log('Error: ', error);
      res.send('');
    });
});

module.exports = app;
