pry = require('pryjs')

'use strict'
var express = require('express')
var app = express();
var pg = require('pg');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var connectionString = "postgres://eminekoc:1297@localhost/vacations";

var  session = require('express-session');
var  pgSession= require('connect-pg-simple')(session);

app.use(express.static(path.join(__dirname, 'public')));

var userRoutes = require( path.join(__dirname, '/routes/users'));
var attractionRoutes = require( path.join(__dirname, '/routes/attractions'));


app.use(session({
  store : new pgSession({
    pg : pg,
    conString : connectionString,
    tableName : 'session'
  }),
  secret : 'soooScretanythigWewant',
  saveUninitialized:true,
  resave : false,
  cookie : {maxAge : 30 * 24 * 60 * 60 * 1000 }  //default setting 30*24* 06 * 60 * 1000  => 30 days
}))




app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('short'));
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  console.log("my req.session.user", req.session.user)
  res.render('pages/home_profile', { user: req.session.user})
});

app.use('/users', userRoutes)
app.use('/attractions', attractionRoutes)



var port = process.env.PORT || 3000;
var server = app.listen(port)
