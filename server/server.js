// IMPORTS:

  // Library Imports
    const express = require('express');
    const fs = require('fs');
    const hbs = require('hbs');
    const _ = require('lodash');
    const path = require('path');
    const bodyParser = require('body-parser');
    const {ObjectId} = require('mongodb');

  // Local Imports
    require('./config/config');
    var {mongoose} = require('./db/mongoose');
    var {Todo} = require('./models/todo');
    var {User} = require('./models/user');
    var app = express();

// ___________________________

// Handlebars:
  hbs.registerPartials('./views/partials');
  // views
  app.set('view engine', 'hbs');
  app.set('views', './views')

// ___________________________

// Port
  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`connected on port ${port}`);
  });

// ___________________________

// Exports:

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

// ROUTES:

  // GET:

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

  // POST

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

  // PATCH

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

  // DELETE

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
