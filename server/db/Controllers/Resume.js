const Resume = require('../Models/Resume');

const createResume = (email, objectId) => (
  new Promise((resolve, reject) => {
    const resume = new Resume({
      email,
      objectId,
    });

    resume.save((err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  })
);

const getResumeByEmail = email => (
  new Promise((resolve, reject) => {
    Resume.find({ email }, (err, docs) => {
      if (err) {
        reject(err);
      }

      resolve(docs);
    });
  })
);

module.exports = { createResume, getResumeByEmail };