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
    const sass = require('node-sass-middleware');

  // Local Imports:

    require('./config/config');
    const {mongoose} = require('./db/mongoose');
    const app = express();
    const server = http.createServer(app);
    const io = socketIO(server);
    const {generateMessage, generateLocationMessage} = require('./utils/message');
    const {isRealString } = require('./utils/validation');

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
// app.use(sass({
//     src: path.join(__dirname, '../public/sass'),
//     dest: path.join(__dirname, '../public/stylesheets'),
//     debug: true,
//     indentSyntax: true,
//     outputStyle: 'compressed',
//     prefix: '/stylesheets'
//   }));

  app.use(express.static(publicPath));
  // ESTABLISH SERVER SOCKET CONNECTION TO CLIENT

  io.on('connection', (socket) => {

    // SERVER LOGS

    console.log('new user connceted');

    // ___________________________

    // SERVER DISCONNECTED TO CLIENT

    socket.on('disconnect', () => {
      console.log('disconnected from client');
    });

    // ___________________________

    // SERVER EVENT LISTENERS:

    // ___________________________

    // MESSAGE LISTENER

    socket.on('createMessage', (message, callback) => {
      console.log('createMessage', message);
      io.to(message.room).emit('newMessage', generateMessage(message.from, message.text));
      callback(`server and other clients received message: ${message.text}`);
    });

    // ___________________________

    // LOCATION BUTTON LISTENER

    socket.on('createLocationMessage', (message, callback) => {

      socket.broadcast.to(message.room).emit('newLocationMessage', generateLocationMessage('admin', message.latitude, message.longitude));
      callback(`server and other clients received location: ${message.text}`);
    })

    // ___________________________

    // ROOM JOIN

    socket.on('join', (params, callback) => {
      if (!isRealString(params['display-name']) || !isRealString(params['room-name'])) {
        callback('display name and room name are required');
      }
      socket.join(params['room-name']);
      socket.emit('newMessage', generateMessage('admin', `hello ${params['display-name']}, welcome to the ${params['room-name']} chatroom!`))

      socket.broadcast.to(params['room-name']).emit('userInOut', generateMessage('admin', `${params['display-name']} joined the chatroom`));
      callback();
    })

    // ___________________________

    // ROOM LEAVE

    socket.on('leaveRoom', (params) => {
      console.log(`${params['display-name']} left the ${params['room-name']} chatroom`)

      socket.leave(params['room-name'])
      socket.broadcast.to(params['room-name']).emit('userInOut', generateMessage('admin', `${params['display-name']} has left this chatroom`));
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
