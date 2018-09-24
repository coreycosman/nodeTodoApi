// IMPORTS:

  // Library Imports:

    const express = require('express');
    const http = require('http');
    const socketIO = require('socket.io');
    const fs = require('fs');
    const hbs = require('hbs');
    const path = require('path');
    const publicPath = path.join(__dirname, '../public');
    const todosController = require('./controllers/todos-controller');
    const usersController = require('./controllers/users-controller');

  // Local Imports:

    require('./config/config');
    const {mongoose} = require('./db/mongoose');
    const app = express();
    const server = http.createServer(app);
    const io = socketIO(server);

// CONTROLLER CONFIG:
    todosController(app);
    usersController(app);

// ___________________________

// VIEW ENGINE:

  hbs.registerPartials('./views/partials');
  app.set('view engine', 'hbs');
  app.set('views', './views')

// ___________________________

// PORT:

  const port = process.env.PORT
  server.listen(port, () => {
    console.log(`connected on port ${port}`);
  });

// ___________________________

// EXPORTS:

  module.exports = {app};

// ___________________________

// MIDDLEWARE:
  app.use(express.static(publicPath));

  io.on('connection', (socket) => {
    // client connected
    console.log('new user connceted');
    // client disconnected
    socket.on('disconnect', () => {
    	console.log('disconnected from client');
    });
    // new message notification sent to client
    socket.emit('newMessage', {
      text: 'sup'
    });
    // new message creation received from client
    socket.on('createMessage', (createMessage) => {
      console.log('createMessage', createMessage);
    });
  });

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
