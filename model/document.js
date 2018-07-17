"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  contributors: {
    type: Array,
  },
  password: {
    type: String,
    required: true
  },
  body: {
    type: String
  }
});


module.exports = mongoose.model('Document', DocumentSchema);
