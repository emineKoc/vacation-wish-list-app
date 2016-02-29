'use strict'
var express = require('express');
var attractions = express.Router();


var bodyParser = require('body-parser');
var db = require('./../db/pgatt');

//all attractions
attractions.route('/')
.get(  db.showAllAttractions, (req, res) =>  {
  var category = req.query.category;
  res.render('pages/attractions/attractions', { allAttractions: res.attractions, category: req.query.category, user: req.session.user } );
})
.post( db.createAttraction, (req, res) =>  {  res.redirect('/attractions')  }) // done

attractions.route('/new')
.get((req, res) => { res.render('pages/attractions/new_attraction'); })  //done

//single attraction page
attractions.route('/:id')
.get( db.attractionDetails, (req, res) => {
  res.render('pages/attractions/attraction', { single_attraction: res.attraction[0], user: req.session.user});
})
.put(db.editAttraction, (req, res) => {
  res.status(303).redirect(`/attractions/${req.params.id}`);
})
.delete( db.deleteAttraction, (req, res) => {
  res.redirect('/attractions');
})

attractions.route('/:id/edit')
.get( db.attractionDetails, (req, res) => {
  res.render('pages/attractions/edit_attraction', { single_attraction: res.attraction[0], user: req.session.user });
})
g
// attractions.route('/user/')
// .get( db.showAllAttractionstoUser, (req, res) =>  {
//   var category = req.query.category;
//   res.render('pages/attractions/attractions', { allAttractions: res.attractions, category: req.query.category, user: req.session.user } );
// })
// .put( db.addWishes, (req, res) => {
//   res.status(303).redirect(`/user`);
// })


module.exports = attractions;
