'use strict'
var express = require('express')
var app = express();
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var massagesRouter = require('./routes/someRoute');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.send('this will be my home page');
});

app.use('/someRoute', massagesRouter);



app.listen(process.env.PORT, function() {
  console.log(`Listening on port ${process.env.PORT}`);
});
Status API Training Shop Blog About Pricing
© 2016 GitHub, Inc. Terms Privacy Security Contact Help
