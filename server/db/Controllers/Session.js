const Session = require('../Models/Session');


const createSession = (email, userId) => (
  new Promise((resolve, reject) => {
    const session = new Session({
      email,
      userId,
    });

    session.save((err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  })
);

const getSessionById = userId => (
  new Promise((resolve, reject) => {
    Session.find({ userId }, (err, docs) => {
      if (err) {
        reject(err);
      }

      resolve(docs);
    });
  })
);

const findOrCreateSession = (email, userId) => (
  new Promise((resolve, reject) => {
    getSessionById(userId)
      .then((results) => {
        if (!results.length) {
          return results;
        }

        resolve();
      })
      .then(() => createSession(email, userId))
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  })
);

module.exports = { createSession, getSessionById, findOrCreateSession };
