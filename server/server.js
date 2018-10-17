// IMPORTS:
  // Library Imports:
    const express = require('express');
    const http = require('http');
    const socketIO = require('socket.io');
    const fs = require('fs');
    const hbs = require('hbs');
    const path = require('path');
    const publicPath = path.join(__dirname, '../public');
    const sass = require('node-sass-middleware');


  // Local Imports:
    const app = express();
    const server = http.createServer(app);
    require('./config/config');
    const io = socketIO(server);

// CONTROLLER CONFIG:
    const todosController = require('./controllers/todos-controller');
    const usersController = require('./controllers/users-controller');
    const { mongoose } = require('./db/mongoose');
    const ioController = require('./controllers/io-controller');

    todosController(app);
    usersController(app, publicPath);
    ioController(app, io)
    // ioConfig(io)

// ___________________________

// VIEW ENGINE:

  hbs.registerPartials(publicPath + '/views/partials');
  app.set('view engine', 'hbs');
  app.set('views', publicPath + '/views')

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
  // SASS CONFIG:
    app.use(sass({
        src: path.join(__dirname, './client/public/sass'),
        dest: path.join(__dirname, './client/public/stylesheets'),
        debug: true,
        indentSyntax: true,
        outputStyle: 'compressed',
        prefix: '/stylesheets'
      }));

  app.use(express.static(publicPath));

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
