'use strict';
var pg = require('pg');
var connectionString = "postgres://eminekoc:1297@localhost/vacations";

function createAttraction(req, res, next) {
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("INSERT INTO attractions (name,location,besttimetodo,category,description,image) VALUES ($1, $2, $3, $4,$5, $6);",
    [req.body.name, req.body.location, req.body.besttimetodo,req.body.category, req.body.description, req.body.image ],
    function(err, result) {
      done()
      if(err) {
        return console.error('error, running query', err);
      }
      next()
    });
  });
}


function showAllAttractions(req, res, next) {
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
    var query = client.query("SELECT * FROM  attractions;",
    function(err, result) {
      done()
          if(err) {
            return console.error('error, running query', err);
          }
          res.attractions = result.rows
          next()
        });
    });
  }

  function attractionDetails(req, res, next) {
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }
      var query = client.query("SELECT * FROM attractions WHERE id = $1;", [req.params.id],
      function(err, result) {
        done()
            if(err) {
              return console.error('error, running query', err);
            }
            res.attraction = result.rows
            next()
          });
      });
    }

    function editAttraction(req, res, next) {
      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("UPDATE attractions SET name = $1, location = $2, besttimetodo = $3,  category = $4, description = $5, image = $6 WHERE id = $7;",
        [req.body.name, req.body.location, req.body.besttimetodo,req.body.category, req.body.description, req.body.image, req.params.id ],
        function(err, result) {
          done()
          if(err) {
            return console.error('error, running query', err);
          }
          next()
        });
      });
    }

    function deleteAttraction(req, res, next) {
      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("DELETE FROM attractions WHERE id = $1;", [req.params.id ],
        function(err, result) {
          done()
          if(err) {
            return console.error('error, running query', err);
          }
          next()
        });
      });
    }

    function addWishes(req, res, next) {
      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("INSERT INTO wishlist ( user_id, attraction_id, wish ) VALUES ($1, $2, $3);",
        [req.session.user.id, req.params.id, 'true' ],
        function(err, result) {
          done()
          if(err) {
            return console.error('error, running query', err);
          }
          res.wishes = result.rows
          next()
        });
      });
    }

    function haveBeenList(req, res, next) {
      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("INSERT INTO wishlist ( user_id, attraction_id, haveBeen ) VALUES ($1, $2, $3);",
        [req.session.user.id, req.params.id, 'true' ],
        function(err, result) {
          done()
          if(err) {
            return console.error('error, running query', err);
          }
          res.haveBeen = result.rows
          next()
        });
      });
    }





module.exports.addWishes = addWishes
module.exports.deleteAttraction = deleteAttraction
module.exports.editAttraction =  editAttraction // for admin only
module.exports.attractionDetails =  attractionDetails // for admin only
module.exports.showAllAttractions =  showAllAttractions // for admin only
module.exports.createAttraction =  createAttraction // for admin only
