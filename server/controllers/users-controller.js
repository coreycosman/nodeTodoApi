const { User } = require('../models/user');
const _ = require('lodash');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

exports.signup = (req, res, next) => {
  const body = _.pick(req.body, ['email', 'password', 'confirmation'])
  const newUser = new User(body);
  newUser.generateAuthToken();
  newUser.save()
    .then(user => res.json(user.tokens[0].token))
    .catch(e => {
      let { errors, isValid } = validateRegisterInput(body, e)
      if(!isValid) {
        return res.status(400).json(errors);
      } else {
        return res.status(500).json('please try again')
      }
    })
}

exports.login = (req, res, next) => {
  // const body = _.pick(req.body, ['email', 'password'])
  // let { errors, isValid } = validateLoginInput(body)
  // if(!isValid) {
  //   return res.status(400).json(errors);
  // }
  res.json(req.user.generateAuthToken())
}

// exports.login = (req, res, err, next) => {
//   req.user.generateAuthToken()
//     .then(token => res.json(token))
//     .catch(e => {
//       let { errors, isValid } = validateLoginInput(body, e)
//       if(!isValid) {
//         return res.status(400).json(errors);
//       }
//     })
// }

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
