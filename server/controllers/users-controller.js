const {User} = require('../models/user');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectId} = require('mongodb');

module.exports = (app) => {

// MIDDLEWARE:

  app.use(bodyParser.json());

  const {authenticate} = require('../middleware/authenticate');

// ___________________________

// GET /users/me (PRIVATE)

  app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });

// ___________________________

// POST /users

  app.post('/users', (req, res) => {
    body = _.pick(req.body, ['email', 'password'])
    var newUser = new User(body)
    newUser.save().then(() => {
      return newUser.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(newUser)
    }).catch((e) => {
      res.status(400).send(e);
    })
  })

// POST /users/login
  app.post('/users/login', (req, res) => {
    body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);        
      })
    }).catch((e) => {
      res.status(400).send();
    })
  });
}
