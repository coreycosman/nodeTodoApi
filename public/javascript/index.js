var socket = io();
var locationButton = $('#send-location');

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

// JQUERY EVENTS:

  // LISTENERS

  socket.on('newUserJoin', function (message) {
    var li = $('<li></li>')
    li.text(`${message.text}, ${message.createdAt}`)
    $('[data=new-user]').append(li);
  });

  socket.on('newMessage', function (message) {
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    $('#messages').append(li);
  });

  socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $("<a target='_blank'></a>").text('My Current Location');
    a.attr('href', message.url)
    li.text(`${message.from}: `);
    li.append(a);
    $('#messages').append(li);
  });

  // ___________________________

  // SUBMIT HANDLERS

  $('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]')

    socket.emit('createMessage', {
      from: 'client',
      text: messageTextBox.val()
    }, function (data) {
      messageTextBox.val('')
      console.log(data);
    });
  });

  // ___________________________

  // CLICK HANDLERS

  locationButton.on('click', function () {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.prop('disabled', false).text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, function () {
      locationButton.prop('disabled', false);
      alert('unable to fetch location').text('Send Location');
    });
  });
