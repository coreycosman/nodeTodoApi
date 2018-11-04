const { User } = require('../models/user');
const _ = require('lodash');
// const validateregisterInput = require('../validation/register');
// const { ObjectId } = require('mongodb');

exports.signup = (req, res, next) => {
  // const { errors, isValid } = validateregisterInput(body)

  // if(!isValid) {
  //   return res.status(400).json(errors);
  // }
  const body = _.pick(req.body, ['email', 'password'])
  const newUser = new User(body);
  newUser.generateAuthToken();
  newUser.save()
    .then(user => res.json(user.tokens[0].token))
    .catch(e => {
      if (e.name === 'MongoError' && e.code === 11000) {
        res.status(422).json('email in use')
      } else {
        console.log(e);
        res.status(400).send(e)
      }
    })
}

exports.login = (req, res, next) => {
  // req.user.generateAuthToken()
  res.json(req.user.tokens[0].token)
}

// exports.logout = (req, res, next) => {
//   debugger
//   // var token = req.user.tokens[0].token
//   // req.user.removeToken(req.token)
// }

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
