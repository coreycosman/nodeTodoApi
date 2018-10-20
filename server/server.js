// IMPORTS:
  // Library:
    const express = require('express');
    const http = require('http');
    const socketIO = require('socket.io');
    const fs = require('fs');
    const hbs = require('hbs');
    const path = require('path');
    const sass = require('node-sass-middleware');
    const morgan = require('morgan');
    const bodyParser = require('body-parser');

  // Local
    const publicPath = path.join(__dirname, '../public');
    require('./config/config');

// ___________________________

// Server Setup
  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server);

// ___________________________

// MIDDLEWARE:
  app.use(express.static(publicPath));
  app.use(morgan('combined'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

// ___________________________

// CONTROLLER CONFIG:
  const todosController = require('./controllers/todos-controller');
  const usersController = require('./controllers/users-controller');
  const { mongoose } = require('./db/mongoose');
  const ioController = require('./controllers/io-controller');
  const router = require('./router');

  // router(app);
  router(app);
  // todosController(app);
  // usersController(app, publicPath);
  ioController(app, io)

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

  module.exports = { app };

// ___________________________



// SASS CONFIG:
    // app.use(sass({
    //     src: path.join(__dirname, './client/public/sass'),
    //     dest: path.join(__dirname, './client/public/stylesheets'),
    //     debug: true,
    //     indentSyntax: true,
    //     outputStyle: 'compressed',
    //     prefix: '/stylesheets'
    //   }));


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
