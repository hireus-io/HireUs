const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const meta = require('./sample_data/meta');
const data = require('./sample_data/data');
//const fs = require("fs");
const path = require("path");
// const metadata = require("./sample_data/metadata.json");
// const resume = require("./sample_data/resume.json");
const request = require('request');

const fs = require('fs');

let key = '';
let baseUrl = 'https://api.yuuvis.io/';

let doc_name = 'resume.json';
let doc_filename = path.join(__dirname, '/resume.json');
let cid = 'cid_63apple';
let doc_mimeType = 'application/json';

function createDocumentMetadata(doc_title, doc_fileName, cid, doc_contentType) {
  return {
    objects: [
      {
        'properties': {
          'enaio:objectTypeId': {
            'value': 'resume',
          },
          'email': {
            'value': "testing@gmail.com",
          },
          'keywords': {
            'value': "testing@gmail.com",
          }
        },
        contentStreams: [{
          'mimeType': doc_contentType,
          'fileName': doc_fileName,
          cid: cid,
        }],
      },
    ],
  };
}

function createImportFormdata(doc_title, doc_fileName, cid, doc_contentType) {
  let formData = {};
  formData.data = {
    value: JSON.stringify(createDocumentMetadata(doc_title, doc_fileName, cid, doc_contentType)),
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

function createRequest(doc_title, doc_fileName, cid, doc_contentType) {
  return {
    method: 'POST',
    uri: `${baseUrl}dms/objects/`,
    headers: {
      Accept: 'application/json',
      'Ocp-Apim-Subscription-Key': key,
    },
    formData: createImportFormdata(doc_title, doc_fileName, cid, doc_contentType),
  };
}


let requestObject = createRequest(doc_name, doc_filename, cid, doc_mimeType);

function executeRequest(request_object) {
  request.post(request_object, (err, httpResponse, body) => {
    if(err) throw err;
    else {
      console.log(httpResponse.statusCode)
      console.log(body)
    }
  });
}

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

  executeRequest(requestObject);
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
// app.post('/api/resume/search', (req, res) => {
//   axios({
//     "url": "https://api.yuuvis.io/dms/objects/search",
//     "method": "POST",
//     headers: {
//       "Ocp-Apim-Subscription-Key": ""},
//     data: {
//       "query": {
//         "statement": "SELECT * FROM enaio:object WHERE CONTAINS('programming')"
//       }
//     }
//   })
//   .then((response) => {
//     console.log(response);
//     res.send('Success');
//   })
//   .catch((error) => {
//     console.log('Error: ', error);
//     res.send('');
//   })
// })

module.exports = app;
