var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var db = require('./mongoose'),
  express = require('express');
// note that I'm leaving out the other things like 'http' or 'path'
var app = express();

// get the routes
require('./routes')(app);
// I just require routes, without naming it as a var, & that I pass (app)

// Facebook authentication with Facebook passport strategy
// Facebook client secret and clientId provided from facebook app
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new FacebookStrategy({
        clientID: '399575120226034',
        clientSecret: '64001edce7887cab6578136f0dae3e06',
        callbackURL: "http://localhost:3000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
      //check user table for anyone with a facebook ID of profile.id
      User.findOne({
          'facebook.id': profile.id 
      }, function(err, user) {
          if (err) {
              return done(err);
          }
          //No user was found... so create a new user with values from Facebook (all the profile. stuff)
          if (!user) {
              user = new User({
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  username: profile.username,
                  provider: 'facebook',
                  //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                  facebook: profile._json
              });
              user.save(function(err) {
                  if (err) console.log(err);
                  return done(err, user);
              });
          } else {
              //found user. Return
              return done(err, user);
          }
      });
    }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
// module.exports = function(passport){
//   var router = espress.Router()
  app.get('/auth/facebook', passport.authenticate('facebook', { scope:['read_stream', 'manage_pages']}));
// }


// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

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
