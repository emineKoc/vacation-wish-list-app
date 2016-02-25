'use strict';
var env = require('dotenv');
var pg = require('pg');

var connectionString = "postgres://eminekoc:"+ process.env.DB_PASSWPRD+"@localhost/vacations_wish";
