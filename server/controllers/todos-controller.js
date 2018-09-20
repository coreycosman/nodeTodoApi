// const express = require('express');
// var app = express();
// var {Todo} = require('../models/todo');
//
//
// // ROUTES:
//
//   // TODOS GET:
//
//     app.get('/todos', (req, res) => {
//       Todo.find().then((todos) => {
//         res.send({todos})
//       }, (e) => {
//         res.status(400).send(e)
//       });
//     });
//
//     app.get('/todos/:id', (req, res) => {
//       var id = req.params.id;
//
//       if (!ObjectId.isValid(id)) {
//         return res.status(404).send();
//       }
//
//       Todo.findById(id).then((todo) => {
//         if (!todo) {
//           return res.status(404).send();
//         }
//         res.send({todo})
//       }).catch((e) => {
//         res.status(400).send();
//       });
//     });
//
//   // ___________________________
//
//   // TODOS POST:
//
//     app.post('/todos', (req, res) => {
//       var todo = new Todo({
//         text: req.body.text
//       });
//       todo.save().then((doc) => {
//         res.send(doc);
//       }, (e) => {
//         res.status(400).send(e);
//       });
//     });
//   // ___________________________
//
//   // TODOS PATCH:
//
//     app.patch('/todos/:id', (req, res) => {
//       var id = req.params.id;
//       var body = _.pick(req.body, ['text', 'completed']);
//
//       if (!ObjectId.isValid(id)) {
//         return res.status(404).send();
//       }
//
//       if (_.isBoolean(body.completed) && body.completed) {
//         body.completedAt = new Date().getTime();
//       }
//       else {
//         body.completed = false
//         body.completedAt = null
//       }
//       Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
//         if (!todo) {
//           return res.status(404).send();
//         }
//         res.send({todo});
//       }).catch((e) => {
//         res.status(400).send();
//       })
//     })
//
//   // ___________________________
//
//   // TODOS DELETE:
//
//     app.delete('/todos/:id', (req, res) => {
//       var id = req.params.id;
//       if (!ObjectId.isValid(id)) {
//         return res.status(404).send();
//       }
//
//       Todo.findByIdAndDelete(id).then((todo) => {
//         if (!todo) {
//           return res.status(404).send();
//         }
//         res.send({todo})
//       }).catch((e) => {
//         res.status(400).send();
//       });
//     })
// // ___________________________
