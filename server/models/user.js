// USER MODEL:

var mongoose = require('mongoose');
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

// var newUser = new User({
//   email: 'hello@gmail.com'
// })
//
// newUser.save().then((doc) => {
//   console.log('saved new user', doc);
// }, (e) => {
//   console.log('unable to save new user');
// });

module.exports = {User};
