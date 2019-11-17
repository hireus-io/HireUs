const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  email: String,
  objectId: String,
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
