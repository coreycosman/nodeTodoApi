var socket = io();
var locationButton = $('#send-location');
var leaveRoomButton = $('#leave-room')
var params = $.deparam(window.location.search);

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

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href="/chat"
    } else {
      console.log('no error');
    }
  })
});

// ___________________________

// CLIENT DISCONNECTED TO SERVER

socket.on('disconnect', function() {
  console.log('disconnected from server')
});

// ___________________________

// JQUERY EVENTS:

  // LISTENERS:

  // ___________________________

  // USER IN OUT LISTENER

  socket.on('userInOut', function(message) {
    var formattedDateTime = moment(message.createdAt).format('MMM Do, YYYY, h:mm a')
    var template = $('#user-join-message-template').html();
    var html = Mustache.render(template, {
      createdAt: formattedDateTime,
      text: message.text
    });
    $('[data=new-user]').append(html);
  });

  // ___________________________

  // NEW MESSAGE LISTENER

  socket.on('newMessage', function(message) {
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

  // NEW LOCATION MESSAGE LISTENER

  socket.on('newLocationMessage', function(message) {
    var formattedDateTime = moment(message.createdAt).format('MMM Do, YYYY, h:mm a')
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
      from: params['display-name'],
      createdAt: formattedDateTime,
      url: message.url
    })
    $('#messages').append(html);
    scrollToBottom();
  });

  // ___________________________

  // SUBMIT MESSAGE HANDLER

  $('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextBox = $('[name=message]')

    socket.emit('createMessage', {
      from: params['display-name'],
      text: messageTextBox.val(),
      room: params['room-name']
    }, function (data) {
      messageTextBox.val('')
      console.log(data);
    });
  });

  // ___________________________

  // SEND LOCATION CLICK HANDLER

  locationButton.on('click', function() {
    if (!navigator.geolocation) {
      return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.prop('disabled', false).text('Send Location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        room: params['room-name']
      }, function(data) {
        console.log(data);
      })
    }, function() {
      locationButton.prop('disabled', false);
      alert('unable to fetch location').text('Send Location');
    });
  });

  // ___________________________

  // LEAVE ROOM CLICK HANDLER
  leaveRoomButton.on('click', function() {
    window.location.href="/chat"
    socket.emit('leaveRoom', params)
  });
