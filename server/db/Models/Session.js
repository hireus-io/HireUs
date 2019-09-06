const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  email: String,
  userId: String,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
