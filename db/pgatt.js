'use strict';
var pg = require('pg');
var connectionString = "postgres://eminekoc:1297@localhost/vacations";
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');
var pgSession= require('connect-pg-simple')(session);
