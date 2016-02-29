'use strict'
var express = require('express');
var embed = express.Router();


var bodyParser = require('body-parser');
var db = require('./../db/pgatt');


embed.route('/')
.get((req, res) =>  {
  res.render('pages/embed/embed_wishlist')
})


// .get( db.showWishes, (req, res) =>  {
//   res.render('pages/embed/embed_wishlist', { } );
// })
