var socket = io();

// CLIENT CONNNECTED TO SERVER

socket.on('connect', function () {
  console.log('connected to server')
});

// ___________________________

// CLIENT DISCONNECTED TO SERVER

socket.on('disconnect', function () {
  console.log('disconnected from server')
});

// ___________________________

// CLIENT EVENT LISTENERS

socket.on('welcomeMessage', function (message) {
  console.log(message);
})

socket.on('newUserJoin', function (message) {
  console.log(message);
})

socket.on('newMessage', function (message) {
  console.log('new message', message);
});

// ___________________________

// CLIENT EVENT EMITTERS

socket.emit('createMessage', {
  from: 'client',
  text: 'hello'
}, function (data) {
  console.log(data);
});
