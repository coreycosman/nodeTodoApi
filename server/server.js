// IMPORTS:

  // Library Imports:

    const express = require('express');
    const fs = require('fs');
    const hbs = require('hbs');
    const _ = require('lodash');
    const path = require('path');
    const bodyParser = require('body-parser');
    const {ObjectId} = require('mongodb');

  // Local Imports:

    require('./config/config');
    require('./controllers/todos-controller');
    var {mongoose} = require('./db/mongoose');
    var {Todo} = require('./models/todo');
    var {User} = require('./models/user');
    var {authenticate} = require('./middleware/authenticate');
    var app = express();

// ___________________________

// VIEW ENGINE:

  hbs.registerPartials('./views/partials');
  app.set('view engine', 'hbs');
  app.set('views', './views')

// ___________________________

// PORT:

  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`connected on port ${port}`);
  });

// ___________________________

// EXPORTS:

  module.exports = {app};

// ___________________________

// MIDDLEWARE:

  app.use(bodyParser.json());

  // server log
  // app.use((req, res, next) => {
  //   var now = new Date().toString();
  //   var log = `${now} : ${req.method} ${req.url}`
  //   console.log(log);
  //   fs.appendFileSync('server.log', log + '\n', (err) => {
  //     if (err) {
  //       console.log(`unable to append to server.log`);
  //     }
  //   });
  //   next();
  // });
  // // maintainence warning
  // // app.use((req, res, next) => {
  // //   res.render('maintainence.hbs');
  // // });
  // // static directory
  // app.use(express.static(__dirname + `/public`));

// ___________________________

// HELPERS:
  // HBS:
  // hbs.registerHelper('getCurrentYear', () => {
  //   return new Date().getFullYear()
  // });
  //
  // hbs.registerHelper('upCase', (text) => {
  //   return text.toUpperCase();
  // });

// ___________________________

// CONTROLLERS:

  // TODOS CONTROLLER:

    // TODOS GET:

      app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
          res.send({todos})
        }, (e) => {
          res.status(400).send(e)
        });
      });

      app.get('/todos/:id', (req, res) => {
        var id = req.params.id;

        if (!ObjectId.isValid(id)) {
          return res.status(404).send();
        }

        Todo.findById(id).then((todo) => {
          if (!todo) {
            return res.status(404).send();
          }
          res.send({todo})
        }).catch((e) => {
          res.status(400).send();
        });
      });

    // ___________________________

    // TODOS POST:

      app.post('/todos', (req, res) => {
        var todo = new Todo({
          text: req.body.text
        });
        todo.save().then((doc) => {
          res.send(doc);
        }, (e) => {
          res.status(400).send(e);
        });
      });
    // ___________________________

    // TODOS PATCH:

      app.patch('/todos/:id', (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);

        if (!ObjectId.isValid(id)) {
          return res.status(404).send();
        }

        if (_.isBoolean(body.completed) && body.completed) {
          body.completedAt = new Date().getTime();
        }
        else {
          body.completed = false
          body.completedAt = null
        }
        Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
          if (!todo) {
            return res.status(404).send();
          }
          res.send({todo});
        }).catch((e) => {
          res.status(400).send();
        })
      })

    // ___________________________

    // TODOS DELETE:

      app.delete('/todos/:id', (req, res) => {
        var id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(404).send();
        }

        Todo.findByIdAndDelete(id).then((todo) => {
          if (!todo) {
            return res.status(404).send();
          }
          res.send({todo})
        }).catch((e) => {
          res.status(400).send();
        });
      })
  // ___________________________

  // USERS CONTROLLER:

  //   USERS POST:

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

  // USERS GET (PRIVATE SESSION):
    app.get('/users/me', authenticate, (req, res) => {
      res.send(req.user);
    });
