global.web_url = "localhost";
global.api_url = "ciceron.xyz:5000";




var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();
var proxy = require('express-http-proxy');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', proxy(global.api_url, {
  preserveHostHdr: true,
  forwardPath: function(req, res) {
    console.log(require('url').parse(req.url).path);
    return "/api" + require('url').parse(req.url).path;
  },
  decorateRequest: function(proxyReq, originalReq) {
    // console.log(originalReq.url);
    var ip = (originalReq.headers['x-forwarded-for'] || '').split(',')[0] 
                   || originalReq.connection.remoteAddress;
                   
    // you can update headers 
    // proxyReq.url = "/api" + originalReq.url;
    proxyReq.headers['x-forwarded-for-client-ip'] = ip;
    // you can change the method 
    // proxyReq.method = 'GET';
    // you can munge the bodyContent. 
    // proxyReq.bodyContent = proxyReq.bodyContent.replace(/losing/, 'winning!');
    return proxyReq;
  }
}));

app.use('/', routes);

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
    res.render('error.jade', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.jade', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
