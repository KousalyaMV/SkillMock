
  //  RedisStore = require('connect-redis')(session),
  var  GoogleStrategy = require('passport-google-oauth2').Strategy;
//app.use(require('morgan')('combined'));
var GoogleUser = require('../models/GoogleUser');

var GOOGLE_CLIENT_ID = "260731960798-6v81lvm03pkv1oe83g0d9vhjp95sfaso.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET = "hkO69DPyqiVuTooqleReBCvj";

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (obj, done) {
        GoogleUser.findById(id, function(err, user){
            done(err, user);
        });
    });


    passport.use(new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/google/callback",
            passReqToCallback: true
        },
        function (request, accessToken, refreshToken, profile, done) {
            // asynchronous verification, for effect...
            process.nextTick(function () {

                GoogleUser.findOne({
                    'id': profile.id
                }, function (err, user) {
                    console.log(profile);
                    console.log(user);
                    if (err)
                        return done(err);
                    if (user)
                        return done(null, user);
                    else {

                        var newUser = new GoogleUser();
                        newUser.id = profile.id;
                        newUser.name = profile.displayName;
                        newUser.email = profile.emails[0].value;

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        })

                    }
                });
                return done(null, profile);
            });
        }
    ));


}
    