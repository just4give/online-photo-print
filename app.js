var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var schedule = require('node-schedule');

var routes = require('./server/routes/indexRouter');
var user = require('./server/routes/userRouter');
var photo = require('./server/routes/photoRouter');
var order = require('./server/routes/orderRouter');
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');

var config = require('./server/database/config.json')[app.get('env')];
console.log(config);
// uncomment after placing your favicon in /client
//app.use(favicon(__dirname + '/client/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(config.imageRepo));

app.use(cors());

app.use('/', routes);
app.use('/api/user', user);
app.use('/api/photo', photo);
app.use('/api/order', order);




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
        res.json(err);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
});


module.exports = app;
