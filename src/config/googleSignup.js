const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
    clientID: "995051606326-qofa95ttdiic99l0kckrac33p0bpch6q.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));



passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
module.exports=passport;