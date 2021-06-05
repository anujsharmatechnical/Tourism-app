var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var flash = require ('connect-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
/*var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized:true,
  resave:true,
  cookie:{ maxage:60000}
}));
app.use(flash());*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

//Front End pages
app.use('/home', indexRouter);
app.use('/destination', indexRouter);
app.use('/singleDest', indexRouter);
app.use('/adventures', indexRouter);
app.use('/booking', indexRouter);
app.use('/bookingForm', indexRouter);
app.use('/travel', indexRouter);
app.use('/hotel1', indexRouter);
app.use('/hotelbook', indexRouter);
app.use('/aboutus', indexRouter);
app.use('/contact', indexRouter);
app.use('/login', indexRouter);
app.use('/signup', indexRouter);
app.use('/users', usersRouter);
app.use('/book1', indexRouter);
app.use('/loginvalid', indexRouter);

//Admin Pages
app.use('/user', indexRouter);
app.use('/userUpdate', indexRouter);
app.use('/addAdventures', indexRouter);
app.use('/adminLogin', indexRouter);
app.use('/delFeedback', indexRouter);
app.use('/delFeedback1', indexRouter);
//app.use('/user1', indexRouter);
app.use('/ajax', indexRouter);
app.use('/table', indexRouter);
app.use('/tableDel', indexRouter);
app.use('/addSubDes', indexRouter);
app.use('/addSubDes1', indexRouter);
app.use('/addHotels', indexRouter);
app.use('/hotelList', indexRouter);
app.use('/addhotel1', indexRouter);
app.use('/adminloginvalid', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
