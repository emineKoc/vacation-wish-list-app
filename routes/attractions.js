'use strict'
var express = require('express');
var attractions = express.Router();

var bodyParser = require('body-parser');
var db = require('./../db/pgatt');

var dummyFunction = function(req,res) =>  { res.send( res.method ,' is not implemented yet') }

attractions.route('/')
.get(



module.exports = attractions;
