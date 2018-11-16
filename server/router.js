// IMPORTS:
const path = require('path');
const passportService = require('./services/passport');
const passport = require('passport');
const authenticationController = require('./controllers/authentication-controller');
const usersController = require('./controllers/users-controller');
const dashboardController = require('./controllers/dashboard-controller');

// MIDDLEWARE:
const requireAuth = passport.authenticate('jwt', { session: false });

// ROUTER:



module.exports = (app) => {
  app.get('/users', function(req, res) {
    res.sendFile(path.join(__dirname, './client/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
  // Users Controller Routes:
  app.post('/users', usersController.signup)

  app.post('/users/login', usersController.login)
  // Dashboard Controller Routes
  app.get('/dashboard', requireAuth, dashboardController.dashboard)
}
