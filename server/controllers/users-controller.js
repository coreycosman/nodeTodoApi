const { User } = require('../models/user');
const _ = require('lodash');
// const { ObjectId } = require('mongodb');

exports.signup = (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password'])
  const newUser = new User(body);
  newUser.generateAuthToken();
  newUser.save()
    .then(user => res.json(user.tokens[0].token))
    .catch(e => res.status(400).send(e))
}

exports.login = (req, res, next) => {
  req.user.generateAuthToken()
  res.json(req.user.tokens[0].token)
}




// ________________________________________________________________________
// WITHOUT PASSPORT:

//   // const {authenticate} = require('../middleware/authenticate');


//  POST /USERS:

// exports.signup = (req, res, next) => {
//   const body = _.pick(req.body, ['email', 'password'])
//   const newUser = new User(body);
//   newUser.generateAuthToken();
//   newUser.save()
//     .then(user => res.json(user.tokens[0].token))
//     .catch(e => res.status(400).send(e))
// }

// // GET /users/me (PRIVATE)
//
//   app.get('/users/me', authenticate, (req, res) => {
//     var userName = req.user
//     res.render(views + '/user', {name : userName});
//   });


// // POST /users/login
//   app.post('/users/login', (req, res) => {
//     body = _.pick(req.body, ['email', 'password']);
//     User.findByCredentials(body.email, body.password).then((user) => {
//       return user.generateAuthToken().then((token) => {
//         res.header('x-auth', token).send(user);
//       })
//     }).catch((e) => {
//       res.status(400).send();
//     })
//   });


// // DELETE /users/me/token
//   app.delete('/users/me/token', authenticate, (req, res) => {
//     req.user.removeToken(req.token).then(() => {
//       res.status(200).send();
//     }), () => {
//       res.satus(400).send();
//     }
//   });
// }
