// USER MODEL:

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema =  new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email must be present'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },

  password: {
    type: String,
    require: true,
    minlength: 8
  },

  tokens: [{
    access: {
      type: String,
      required: true
    },

    token: {
      type: String,
      required: true
    }
  }]
});

// INSTANCE METHODS:

  UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email'])
  };

  UserSchema.methods.generateAuthToken = function () {
    user = this;
    const access =  'auth';
    const timestamp =  new Date().getTime();
    const token = jwt.sign({
      sub: user.id,
      iat: timestamp
    }, process.env.JWT_SECRET).toString();

    user.tokens = user.tokens.concat([{ access, token}]);
    return token;
  };

  UserSchema.methods.removeToken = function (token) {
    var user = this;
    return user.update({
      $pull: {
        tokens: {token}
      }
    })
  }


  UserSchema.methods.comparePassword = function(password, callback) {
    // const body = _.pick(req.body, ['email', 'password'])
    bcrypt.compare(password, this.password, (err, isMatch) => {
      if (err) { return callback(err); }

      callback(null, isMatch);
    });
  }

// TRY TO REFACTOR AS PROMISE
  // UserSchema.method.comparePassword = function(password) {
  //   return new Promise(resolve, reject) => {
  //     bcrypt.compare(password, this.password, (err, isMatch) => {
  //       if (err) { return reject() }
  //
  //       resolve(null, isMatch);
  //     })
  //   }
  // }

// Before Actions:

  UserSchema.pre('save', function (next) {
    user = this;
    if (user.isModified('password')) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) { return next(err); }

          user.password = hash
          next();
        });
      });
    } else {
      next();
    }
  });

const User = mongoose.model('User', UserSchema);

module.exports = {User};



// ____________________________________________________________________________
// WITHOUT PASSPORT:
// THIS IS HOW AUTHENTICATION IS DONE MANUALLY(WITH BRCYPT AND JWT):

// STEP 1: SALT AND HASH PASSWORD ON SIGNUP:

        // UserSchema.pre('save', function (next) {
        //   user = this;
        //   if (user.isModified('password')) {
        //     bcrypt.genSalt(10, (err, salt) => {
        //       bcrypt.hash(user.password, salt, (err, hash) => {
        //         if (err) { return next(err); }
        //
        //         user.password = hash
        //         next();
        //       });
        //     });
        //   } else {
        //     next();
        //   }
        // });

// STEP 2: HAVE AN INSTANCE METHOD TO GENERATE A TOKEN ON SIGNUP/LOGIN:

        // UserSchema.methods.generateAuthToken = function () {
        //   user = this;
        //   const access =  'auth';
        //   const timestamp =  new Date().getTime();
        //   const token = jwt.sign({
        //     sub: user.id,
        //     access,
        //     iat: timestamp
        //   }, process.env.JWT_SECRET).toString();
        //
        //   user.tokens = user.tokens.concat([{ access, token }]);
        //   return token;
        // };

// STEP 3: HAVE A CLASS METHOD TO COMPARE REQUEST PASSWORD WITH DB PASSWORD
        // ON LOGIN - FIND USER BY CREDENTIALS:

        // UserSchema.statics.findByCredentials = function (email, password) {
        //   var User =  this;
        //
        //   return User.findOne({ email }).then((user) => {
        //     if (!user) {
        //       return Promise.reject();
        //     }
        //
        //     return new Promise((resolve, reject) => {
        //       bcrypt.compare(password, user.password, (err, res) => {
        //         if (res) {
        //           resolve(user);
        //         } else {
        //           reject();
        //         }
        //       })
        //     });
        //   });
        // };

// STEP 4: HAVE A CLASS METHOD THAT QUERIES DB TO FIND A USER BY TOKEN:

        // UserSchema.statics.findByToken = function (token) {
        //   var User = this;
        //   var decoded;
        //   try {
        //     decoded = jwt.verify(token, process.env.JWT_SECRET);
        //   } catch (e) {
        //     return Promise.reject();
        //   }
        //   return User.findOne({
        //     '_id': decoded._id,
        //     'tokens.token': token,
        //     'tokens.access': 'auth'
        //   });
        // };

// STEP 5: CREATE AN AUTHENTICATION MIDDLEWARE THAT IMPLEMENTS
        // THE FIND BY TOKEN CLASS METHOD AND IF IT FINDS A USER WITH THE TOKEN
        // USED IN THE REQUEST HEADER, IT SETS THE REQ USER TO THE DB USER
        // AND THE REQ TOKEN TO THE DB USER'S TOKEN:

        // var { User } = require('../models/user');
        // var authenticate = (req, res, next) => {
        //   var token = req.header('x-auth');
        //   User.findByToken(token).then((user) => {
        //     if (!user) {
        //       return Promise.reject();
        //     }
        //
        //     req.user = user;
        //     req.token = token;
        //     next();
        //   }).catch((e) => {
        //     res.status(401).send('not logged in');
        //   });
        // };
        //
        // module.exports = { authenticate };

// ON ROUTER, THE EXPRESS REQUEST MUST BE PASSED THROUGH THE AUTHENTICATE
// MIDDLEWARE (THE AUTHENTICATE IS SET AS AN ARGUEMENT TO THE EXPRESS ROUTE)
// AND THE MIDDLEWARE DETERMINES WHETHER OR NOT THE PARTICULAR REQUEST USER
// CAN ACCESS THE REQUESTED ROUTE
