'use strict'
var express = require('express');
var users = express.Router();

var bodyParser = require('body-parser');
var db = require('./../db/pg');


//users.route('/')
users.route('/')
.get( db.showAllUsers, (req, res) => {
  res.render('pages/allusers.ejs', { allUsers: res.rows , user: req.session.user})
})
.post( db.createUser, function(req, res){
  res.redirect('/');
})
// .put( function(req,res){
//  res.send('Here I will edit my profile page so I need a edit form')
// })
// .delete( function(req,res){
//  res.send('Admin can delete the accounts from here')
// })



// users.route('/new')
users.get('/new', function(req, res) {
  res.render('pages/new')
})


users.route('/login')
.get(function(req, res) {
  res.render('pages/login');
})
.post(db.loginUser, function(req, res) {
  req.session.user = res.rows

  // when you redirect you must force a save due to asynchronisity
  // https://github.com/expressjs/session/issues/167 **
  // "modern web browsers ignore the body of the response and so start loading
  // the destination page well before we finished sending the response to the client."

req.session.save(function() {
    res.redirect('/hello');
  });
})


users.delete('/logout', function(req, res) {
  req.session.destroy(function(err){
    res.redirect('/');
  })
})




users.route('/:id')
.get( db.showOneUser, (req, res) => {
  res.render('pages/each_user', { oneUser: res.rows[0] , user: req.session.user });
})
.put( db.editUser, (req, res) => {
  res.status(303).redirect(`/users/${req.params.id}`);
})
.delete( db.deleteUser, (req, res) => {
  res.redirect('/users');
})


users.route('/:id/edit')
.get( db.showOneUser, (req, res) => {
  res.render('pages/editUser', { oneUser: res.rows[0] , user: req.session.user});
})




module.exports = users;
