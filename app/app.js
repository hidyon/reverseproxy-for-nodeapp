const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const session = require('express-session')
const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

// https setup
const fs = require('fs')
const https = require('https')
const optionsHttps = {
  key: fs.readFileSync('./cert/server.key'),
  cert: fs.readFileSync('./cert/server.crt')
}
const server = https.createServer(optionsHttps, app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session and user authentication
app.use(session(
  { resave: false, 
    saveUninitialized: false, 
    secret: 'mysecret',
    cookie: {
      secure: true,
      httpOnly: true,
    }
  }))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true,
  session: false,
}, (req, username, password, done) =>{
  process.nextTick( () => {
    if(username === "test" && password === "test"){
      return done(null, username)
    } else {
      console.log("login error")
      return done(null, false, {message: "パスワードが正しくありません"})
    }
  })
}))
passport.serializeUser( (user, done) => {
  done(null, user)
})
passport.deserializeUser( (user, done) => {
  done(null, user)
})


// routes setup
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
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


module.exports = server;
