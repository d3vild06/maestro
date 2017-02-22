const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config();
const User = require('./models/user');
const Question = require('./models/question');
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
// { userId: googleId, questions: []}
app.post('/api/batchanswers', passport.authenticate('bearer', {session: false}), (req, res) => {
  const { userId, questions } = req.body;
  if (!userId || !questions) {
    res.status(400).json({success: false, message: 'missing fields'})
  }
  User.find({googleId: userId})
});

app.get('/api/questions', passport.authenticate('bearer', {session: false}), (req, res) => {
      Question.find({})
      .exec()
      .then(questions => res.status(200).json({success: true, questions: questions.map(question => question)}))
      .catch(error => res.status(500).json({success: false, message: 'Oops. Unable to retrieve questions'}))
});

app.post('/api/questions', passport.authenticate('bearer', {session: false}), (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    res.status(400).json({success: false, message: 'missing fields'});
  }
  Question.create({
    question,
    answer
  })
  .then(question => res.json({success: true, question: question}))
  .catch(error => res.status(500).json({success: false, message: 'Internal Server Error'}));
});

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
