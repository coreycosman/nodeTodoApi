var socket = io();
// connected to server
socket.on('connect', function () {
  console.log('connected to server')
  // message creation sent to server
  socket.emit('createMessage', {
    text: 'hello'
  });
  socket.on('newUserJoin', function (message) {
    console.log(message);
  })
});
// disconnected to server
socket.on('disconnect', function () {
  console.log('disconnected from server')
});

// new message notification received from server
socket.on('newMessage', function (message) {
  console.log('new message', message);
});

// receive welcome message from server
socket.on('welcomeMessage', function (message) {
  console.log(message);
})
