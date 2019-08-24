const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/<FILL_ME_IN>',);

module.exports = {};
