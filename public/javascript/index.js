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

// JQUERY EVENTS

// EMITTERS

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'client',
    text: jQuery('[name=message]').val()
  }, function (data) {
    jQuery('[name=message]').val("")
    console.log(data);
  });
});

// LISTENERS

socket.on('newMessage', function (message) {
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`)

  jQuery('#messages').append(li)
});
