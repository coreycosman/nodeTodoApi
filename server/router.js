// IMPORTS:
const passportService = require('./services/passport');
const passport = require('passport');
const authenticationController = require('./controllers/authentication-controller');
const usersController = require('./controllers/users-controller');
const dashboardController = require('./controllers/dashboard-controller');

// MIDDLEWARE:
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

// ROUTER:
module.exports = (app) => {
  // Users Controller Routes:
  app.post('/users', usersController.signup)

  app.post('/users/login', requireSignIn, usersController.login)
  // Dashboard Controller Routes
  app.get('/dashboard', requireAuth, dashboardController.dashboard)
}
