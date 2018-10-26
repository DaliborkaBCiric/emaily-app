const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// setovanje user id koji treba da ide u cookie
passport.serializeUser((user, done) => {
  // user.id je shortcut za "_id" iz mongodb
  done(null, user.id);
});

// uzimanje iz cookia i provera da li user postoji
passport.deserializeUser((id, done) => {
  User.findById(id).then(
    user => { done(null, user); }
  );
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if(existingUser){
          // user vec postoji, nije potrebno kreirati novog
          // null - sve je u redu, exisingUser - rekord koji je pronadjen
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id })
            .save()
            .then( user => done(null, user));
        }
      })
  })
);
