const passport =  require('passport');
const { User } = require('../models/user');
const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const _ = require('lodash');

// Local Strategy

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  User.findOne({ email }, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }

    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if(!isMatch) { return done(null, false) }

      return done(null, user);
    });
  });
});

// Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
};

const jwtLogin = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        done(null, user);
      }
      return done(null, false);
    })
    .catch(e => {
      return done(e, false)
    })
});

passport.use(jwtLogin);
passport.use(localLogin);


// TRY TO REFACTOR WITH PROMISE:
// const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
//   User.findOne({ email })
//     .then((user) =>{
//       if (!user) { return done(null, false) }
//
//       user.comparePassword(password)
//     })
//     .catch(e => return done(e))
//
// });

// THIS SHOULD WORK!
// const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
//   User.findOne({ email })
//     .then((user) => {
//       if (!user) { return done(null, false) }
//
//       user.comparePassword(password, (err, user) => {
//         if (err) { return done(err) }
//         if(!isMatch) { return done(null, false) }
//
//         return done(null, user);
//       })
//     })
//     .catch(e => done(e))
// });
