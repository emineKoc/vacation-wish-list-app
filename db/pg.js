'use strict';
var pg = require('pg');
var connectionString = "postgres://eminekoc:1297@localhost/vacations";
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var session = require('express-session');
var pgSession= require('connect-pg-simple')(session);

// log in user user function
function loginUser(req,res,next) {

  var email = req.body.email;
  var password = req.body.password;

  pg.connect(connectionString, function(err, client, done){
    if (err){
      done()
      console.log(err)
      return res.status(500).json({ success: false, data: err })
    }
    var query = client.query("SELECT * FROM users WHERE email LIKE ($1);", [email],
    function(err,results){
      console.log('result.rows is here:  ' , results.rows);

      done()
      if (err){
        return console.error('error running query' , err)
      }
      if(results.rows.length === 0) {
        res.status(204).json({ success : false, data: 'no content' })
      } else if ( bcrypt.compareSync(password,results.rows[0].password)) {
        res.rows = results.rows[0]
      }
      next()
    })
  })
}

function createSecure(email, password, callback) {
  //hashing the password given by the user at sign up
  bcrypt.genSalt( function(err, salt) {
    bcrypt.hash(password, salt, function(err,hash){
      // this call back saves the user to our datavase
      // with the hashed password
      callback(email, hash)   //this is calling saveUser (email and hashed)
    })
  })
}

// create user user function
function createUser(req, res, next) {
  createSecure(req.body.email, req.body.password, saveUser );
  function saveUser(email, hash) {
    pg.connect(connectionString, function(err, client, done){
      if (err){
        done()
        console.log(err)
        return res.status(500).json({ success: false, data: err })
      }
      var query = client.query("INSERT INTO users (f_name, l_name, current_city, email, password) VALUES ($1, $2, $3, $4, $5);", [req.body.f_name, req.body.l_name, req.body.current_city, email, hash],
      function(err,result){
        done()
        if (err){
          return console.error('error running query' , err)
        }
        next()
      })
    })
  }
}



// show all users function for admin only

function showAllUsers(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }

    var query = client.query("SELECT * FROM users;", function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      res.rows = result.rows
      next()
    });
  });
}


function deleteUser(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("DELETE FROM USERS WHERE ID = $1;",[req.params.id], function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      res.rows = result.rows
      next()
    });
  });
}

function showOneUser(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("SELECT * FROM USERS WHERE id = $1;", [req.params.id] ,function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      res.rows = result.rows
      next()
    });
  });
}

function editUser(req, res, next) {
  pg.connect(connectionString, (err, client, done) => {
      if (err) {
        done();
        console.log(err);
        res.status(500).json({success: false, data: err});
      }
   var query =client.query('UPDATE users SET f_name = $1, l_name = $2, current_city = $3  WHERE id = $4', [req.body.f_name,req.body.l_name,req.body.current_city, req.params.id], (err, results) => {
        done();
        if (err) {
          console.error('Error with query', err);
        }
        next();
      });
    });
  };



module.exports.showOneUser =  showOneUser // for admin only
module.exports.editUser =  editUser // for admin only
module.exports.deleteUser =  deleteUser // for admin only
module.exports.showAllUsers =  showAllUsers   // for admin only
module.exports.loginUser =  loginUser
module.exports.createUser =  createUser
