const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const config = require('./config');
const app = express();

const database = {
};

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.CLIENT_ROOT);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use(passport.initialize());

passport.use(
    new GoogleStrategy({
        clientID:  process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${config.ROOT}/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log('google profile: ', profile);
      User.findOrCreate({ googleId: profile.id, firstName: profile.name.givenName, lastName: profile.name.familyName, displayName: profile.displayName, token: accessToken },
        function(err, user) {
          if (err) {
            return cb(err)
          }
          return cb(null, user);
        });
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
          User.findOne({token: token}, function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user) { return done(null, false); }
            return done(null, user, { scope: 'all'});
          });
        }
    )
);

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${config.CLIENT_ROOT}`,
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.token, {expires: 0});
        res.redirect(`${config.CLIENT_ROOT}`);
    }
);

app.get('/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2'])
);

let server;
function runServer(dbUrl, host, port) {
    return new Promise((resolve, reject) => {
      mongoose.connect(dbUrl, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, host, () => {
            console.log(`Server running on ${host}:${port}`);
            resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
    runServer(config.DB_URL, config.HOST, config.PORT);
}

module.exports = {
    app, runServer, closeServer
};
