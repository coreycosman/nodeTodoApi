const {User} = require('../models/user');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectId} = require('mongodb');

module.exports = (app, publicPath) => {

// MIDDLEWARE:

  app.use(bodyParser.json());

  const {authenticate} = require('../middleware/authenticate');

// ___________________________


// GET /

  app.get('/', (req,res) => {
    res.render(publicPath + '/views/enter')
  })

// GET /users/me (PRIVATE)

  app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });

// ___________________________

// POST /users

  app.post('/users', (req, res) => {
    debugger
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

// DELETE /users/me/token
  app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
      res.status(200).send();
    }), () => {
      res.satus(400).send();
    }
  });
}
