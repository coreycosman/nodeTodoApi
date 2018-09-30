var socket = io();
var locationButton = $('#send-location');
function scrollToBottom () {
  // Selectors
  var messages = $('#messages')
  var newMessage = messages.children('li:last-child')
  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMesageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMesageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}
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
    var formattedDateTime = moment(message.createdAt).format('MMM Do, YYYY, h:mm a')
    var template = $('#user-join-message-template').html();
    var html = Mustache.render(template, {
      createdAt: formattedDateTime,
      text: message.text
    });
    $('[data=new-user]').append(html);
  });

  socket.on('newMessage', function (message) {
    var formattedDateTime = moment(message.createdAt).format('MMM Do, YYYY, h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
      from: message.from,
      text: message.text,
      createdAt: formattedDateTime
    });
    $('#messages').append(html);
    scrollToBottom();
  });

  socket.on('newLocationMessage', function (message) {
    var formattedDateTime = moment(message.createdAt).format('MMM Do, YYYY, h:mm a')
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      from: message.from,
      createdAt: formattedDateTime,
      url: message.url
    })
    $('#messages').append(html);
    scrollToBottom();
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
