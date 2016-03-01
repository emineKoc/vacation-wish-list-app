'use strict';
var pg = require('pg');
if(process.env.NODE_ENV ==="production") {
  var connectionString = process.env.DATABASE_URL;
}else{
  var connectionString = process.env.DB_URL;
}
//heroku logs.set the environment production


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
    var query = client.query("SELECT id, name, location, besttimetodo, category, description, image from attractions",
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

  function showAllAttractionstoUser(req, res, next) {
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }
      var query = client.query("SELECT helper.name, helper.location, helper.description, helper.besttimetodo,  helper.category,  helper.image, helper.wish, helper.haveBeen from (SELECT id, name, location, description, besttimetodo,category, image , wishlist.user_id, wishlist.wish, wishlist.haveBeen from attractions inner join wishlist on attractions.id = wishlist.attraction_id ) as helper inner join users on helper.user_id = users.id where helper.wish = false and helper.haveBeen = false and users.id = $1;", [req.session.user.id],
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
        var query = client.query("DELETE from wishlist where attraction_id = $1;", [req.params.id ],
        function(err, result) {
          done()
          if(err) {
            return console.error('error, running query', err);
          }
          next()
        });
        var query1 = client.query("DELETE from attractions where id = $1;", [req.params.id ],
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
        var query = client.query("UPDATE wishlist set wish = true where user_id = $1 and attraction_id = $2;", [req.session.user.id, req.params.id],
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

    function showWishes(req, res, next) {
      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("SELECT helper.name, helper.location, helper.description, helper.besttimetodo,  helper.category,  helper.image, helper.wish, helper.haveBeen from (SELECT id, name, location, description, besttimetodo,category, image , wishlist.user_id, wishlist.wish, wishlist.haveBeen from attractions left join wishlist on attractions.id = wishlist.attraction_id ) as helper left join users on helper.user_id = users.id where helper.wish = true and helper.haveBeen = false and users.id = $1;", [req.session.user.id],
        function(err, result) {
          done()
          if(err) {
            return console.error('error, running query', err);
          }
          res.userWishes = result.rows
          next()
        });
      });
    }


    function addHaveBeen(req, res, next) {
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

    function showHaveBeen(req, res, next) {
      // Get a Postgres client from the connection pool
      pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        var query = client.query("SELECT helper.name, helper.location, helper.description, helper.besttimetodo,  helper.category,  helper.image, helper.wish, helper.haveBeen from (SELECT id, name, location, description, besttimetodo,category, image , wishlist.user_id, wishlist.wish, wishlist.haveBeen from attractions left join wishlist on attractions.id = wishlist.attraction_id ) as helper left join users on helper.user_id = users.id where helper.wish = false and helper.haveBeen = true and users.id = $1;", [req.session.user.id],
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



module.exports.showHaveBeen = showHaveBeen
module.exports.showWishes = showWishes
module.exports.showAllAttractionstoUser = showAllAttractionstoUser
module.exports.addWishes = addWishes
module.exports.deleteAttraction = deleteAttraction
module.exports.editAttraction =  editAttraction // for admin only
module.exports.attractionDetails =  attractionDetails // for admin only
module.exports.showAllAttractions =  showAllAttractions // for admin only
module.exports.createAttraction =  createAttraction // for admin only
