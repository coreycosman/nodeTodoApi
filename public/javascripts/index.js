var socket = io();
// connected to server
socket.on('connect', function () {
  console.log('connected to server')
  // message creation sent to server
  socket.emit('createMessage', {
    text: 'hello'
  });
});
// disconnected to server
socket.on('disconnect', function () {
  console.log('disconnected from server')
});

// new message notification received from server
socket.on('newMessage', function (message) {
  console.log('new message', message);
});
