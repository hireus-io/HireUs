const express = require('express');
const cp = require('child_process');
const util = require('util');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const request = require('request');

require('dotenv').config();

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
  console.log(meta);
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
    uri: `${baseUrl}dms/objects/`,
    headers: {
      Accept: 'application/json',
      'Ocp-Apim-Subscription-Key': process.env.API_KEY,
    },
    formData: createImportFormdata(doc_email, doc_keywords, doc_fileName, cid, doc_contentType),
  };
}


function executeRequest(request_object) {
  request.post(request_object, (err, httpResponse, body) => {
    if (err) throw err;
    else {
      console.log(httpResponse.statusCode);
      console.log(body);
    }
  });
}

const exec = util.promisify(cp.exec);

const app = express();
app.use(require('morgan')('dev')); // Logs all inbound requests to console

app.use(express.static('dist'));

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
app.post('/api/resume', express.json(), (req, res) => {
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

    executeRequest(requestObject);

  });

  fs.writeFile('resume.json', JSON.stringify(req.body.resume, null, 2), () => {
    exec('resume export resume.pdf')
      .then(() => {
        res.download('resume.pdf', 'resume.pdf');
      })
      .catch(() => {
        res.end();
      });
  });

  // const metadata = JSON.stringify(meta);
  // const resumedata = JSON.stringify(data);
  // // console.log(metadata);
  // // console.log(resumedata);
  // const formData = new FormData();
  // const a = path.join(__dirname, '/sample_data/metadata.json')
  // // const b = path.join(__dirname, '/sample_data/resume.json')
  // fs.readFile(a, function(err, data) {
  //   formData.append('data', Buffer.from(data).toString(), 'metadata.json');
  //   formData.append('cid_63apple', Buffer.from(data).toString(), 'resume.json');

  //   axios({
  //     "url": 'https://api.yuuvis.io/dms/objects',
  //     "method": 'POST',
  //     headers: {
  //       "Ocp-Apim-Subscription-Key": "",
  //       "Accept": "application/json"
  //     },
  //     data: formData,
  //   })
  //     .then((x) => {
  //       console.log(x);
  //       res.send(x);
  //     })
  //     .catch((e) => {
  //       console.log('Error:', e);
  //       res.send('Error');
  //     });
  // })




});
app.get('/api/resume/:keyword', (req, res) => {
  const { keywords } = req.params;
  const searches = keywords.split('&');
  let searchString = '';

  for (let i = 0; i < searches.length; i++) {
    searchString += `CONTAINS('${searches[i]}') OR `;
  }
  searchString = searchString.substring(0, searchString.length - 4);
  console.log(searchString);

  axios({
    url: 'https://api.yuuvis.io/dms/objects/search',
    method: 'POST',
    headers: { 'Ocp-Apim-Subscription-Key': process.env.API_KEY },
    data: {
      query: {
        statement: `SELECT * FROM enaio:object WHERE CONTAINS('${keyword}')`,
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
          const resumes = results.map(result => result.data);
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

module.exports = app;
