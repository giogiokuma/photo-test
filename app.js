// 'use strict';
// const debug = require('debug');
// const debugInfo = debug('module:info'); 
// setInterval(() => {
//   debugInfo('some information.'); 
// }, 1000);
// const debugError = debug('module:error'); 
// setInterval(() => {
//   debugError('some errors.'); 
// }, 1000); 


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var api = require('instagram-node').instagram();

var routes = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos'); 

var app = express();
app.use(helmet());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/photos', photos); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// instagram api
app.post('/like/:media_id', function(req, res, next) {
  var ig = require('instagram-node').instagram({});
  ig.use({ access_token: '7a00494918fc4fdab03bd335828dfb63' });
 
  ig.add_like(req.param('media_id'), {
    sign_request: {
      client_secret: '6f31f1516f314ec49cf656d6ba5af0a2',
      // Then you can specify the request: 
      client_req: req
      // or the IP on your own: 
     // ip: 'XXX.XXX.XXX.XXX'
    }
  }, function(err) {
    // handle err here 
    return res.send('OK');
  });
});


module.exports = app;
