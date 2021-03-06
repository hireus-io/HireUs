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
  keys: [process.env.COOKIE_SESSION],
}));

// this require must be before passport initializes and after the cooke session middleware
require('./auth');

app.use(passport.initialize());
app.use(passport.session());


app.get('/api/resume', verifyUser, express.json(), (req, res) => {
  getResumeByEmail(req.user.email)
    .then((results) => {
      if (results) {
        const url = `https://api.yuuvis.io/dms-core/objects/${results[0].objectId}/contents/file`;
        const key = process.env.API_KEY;
        const headers = { headers: { 'Ocp-Apim-Subscription-Key': key } };
        axios.get(url, headers)
          .then((response) => {
            res.json(response.data);
          });
      } else {
        res.send({});
      }
    });
});

app.post('/api/resume', verifyUser, express.json(), (req, res) => {
  const { email, keywords } = req.body;
  // we need to add a function that writes to resume.json
  const resume = JSON.stringify(req.body.resume);

  fs.writeFile(path.join(__dirname, '/resume.json'), resume, (err) => {
    if (err) throw err;
    const docFileName = path.join(__dirname, '/resume.json');
    const cid = 'cid_63apple';
    const docMimeType = 'application/json';
    const requestObject = yuuvis.createRequest(email, keywords, docFileName, cid, docMimeType);

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

app.get('/api/pug', (req, res) => {
  res.send(pug.renderFile(path.join(`${__dirname}/pug/template.pug`), sample_data));
});

app.get('/api/resume/download/', express.json(), (req, res) => {
  const encodedResume = (req.query.r) ? req.query.r : undefined;
  let resume = (encodedResume) ? Buffer.from(encodedResume, 'base64').toString('ascii') : JSON.stringify(sample_data.resume);
  resume = JSON.parse(resume);
  console.log(resume);
  resume.work.map((exp) => {
    exp.highlights = exp.highlights.split(',');
    return exp;
  });
  resume.keywords = resume.keywords.split(',');
  resume = JSON.stringify(resume);
  genResume(resume).then((pugResume) => {
    res.type('application/pdf');
    res.send(pugResume);
  });
});

app.post('/api/resume/download', express.json(), (req, res) => {
  const { resume } = req.body;
  genResume(resume)
    .then((pugResume) => {
      res.send(pugResume);
    });
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
