var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


/*配置路由*/
var routes = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var blogs = require('./routes/blogs');
var addBlogs = require('./routes/addBlogs');
var login = require('./routes/login');
var regist = require('./routes/regist');
var home = require('./routes/home');
var blogList = require('./routes/blogList');
var trash = require('./routes/trash');
var blogAction = require('./routes/blogAction');
var search = require('./routes/search');
var pachong = require('./routes/pachong');

/*定义app*/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));*/
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb',extended: false }));
app.use(cookieParser());
/*静态资源*/
app.use(express.static(path.join(__dirname, 'public')));

/*路由*/
app.use('/', routes);
app.use('/', users);
app.use('/', books);
app.use('/', blogs);
app.use('/', addBlogs);
app.use('/', login);
app.use('/', regist);
app.use('/', home);
app.use('/', blogList);
app.use('/', trash);
app.use('/', blogAction);
app.use('/', search);
app.use('/', pachong);





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



module.exports = app;
