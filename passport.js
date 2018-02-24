var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var UserStore = require('../stores/user-store');

passport.use(new BearerStrategy(
  function(token, done) {
    request('https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=' + token, function(err, response, body) {
      if(err) {
        console.error(err);
        done(err);
        return;
      }

      var user = JSON.parse(body);
      var email = user["email"];

      if(!email) {
        console.error(user.error_description);
        done(user.error_description);
        return;
      }

      UserStore.findOrCreate(email, function(err, user) {
        if(err !== null) {
          console.error(err);
        }

        done(err, user);
      });
    });
  }
));