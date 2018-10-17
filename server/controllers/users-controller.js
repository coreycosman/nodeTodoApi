const {User} = require('../models/user');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectId} = require('mongodb');

module.exports = (app, publicPath) => {
  const views = publicPath + '/views'
// MIDDLEWARE:

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const {authenticate} = require('../middleware/authenticate');

// ___________________________


// GET ROOT /

  app.get('/', (req,res) => {
    res.render(views + '/enter')
  })

// GET /users/me (PRIVATE)

  app.get('/users/me', authenticate, (req, res) => {
    var userName = req.user
    res.render(views + '/user', {name: userName});
  });

// ___________________________

// POST /users

  app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password'])
    var newUser = new User(body)
    newUser.save().then(() => {
      res.render(views + '/todos')
      return newUser.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send.redirect('./users/me')
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
