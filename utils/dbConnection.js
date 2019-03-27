var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/vote";
var db = mongoose.connect(url);