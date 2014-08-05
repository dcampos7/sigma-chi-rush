var express = require('express');
var app = express();
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var basicAuth = require("./middleware/basicAuth");

var routes = require('./routes/index');
var admin = require('./routes/admin');
var logout = require('./routes/logout');
var fetch_students = require('./routes/fetch-students');

var scrape_actives = require('./routes/scrape-actives');
var scrape_students = require('./routes/scrape-students');

var auth = basicAuth(function(user, pass) {     
   return (user == "active" && pass == "UncleRunkle");
},'Super duper secret area');

var admin = basicAuth(function(user, pass) {     
   return (user == "admin" && pass == "constantine");
},'Super duper secret area');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', auth, routes);
app.get('/profile', admin, admin);

app.use('/', routes);
app.use('/admin', admin);
app.use('/logout', logout);

app.use('/fetch-students', fetch_students);
app.use('/scrape-actives', scrape_actives);
app.use('/scrape-students', scrape_students);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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


port = Number(process.env.PORT || 5000);
app.listen(port, function() {
    console.log('Server listening on port ' + port);
})


module.exports = app;
