// IMPORTS:
const passportService = require('./services/passport');
const passport = require('passport');
const authenticationController = require('./controllers/authentication-controller');
const usersController = require('./controllers/users-controller');
// MIDDLEWARE:
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });
// ROUTER:
module.exports = (app) => {
  app.get('/hello', requireAuth, authenticationController.root);
  app.post('/signup', authenticationController.signup);


  // Users Controller Routes:
  app.post('/users', requireAuth, usersController.signup)
  app.post('/users/login', requireSignIn, usersController.login)

}
