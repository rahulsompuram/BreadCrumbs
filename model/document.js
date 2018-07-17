"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  title: {
    type: String,
    default: "Untitled"
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "users"
  },
  collaboratorList: {
    type: [{
      type:  mongoose.Schema.ObjectId,
      ref: 'users'
    }],
    default: [],
  },
  password: {
    type: String,
    required: true
  },
  content: {
    type: Array,
    default: []
  },
  createdTime: {
    type: Date
  },
  lastEditTime: {
    type: Date
  }
},
  {
    minimize: false
  }
);


module.exports = mongoose.model('Document', DocumentSchema);
