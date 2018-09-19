// WITH CRYPTO JS:

  // const {SHA256} = require('crypto-js');

  // var message = '1234'
  //
  // var hash = SHA256(message).toString();
  //
  // console.log(`message: ${message}`);
  // console.log(`hash: ${hash}`);
  //
  // var data = {
  //   id: 1234
  // };
  //
  // var token = {
  //   data,
  //   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
  // }
  //
  // // token.data.id = 12345;
  // // token.hash = SHA256(JSON.stringify(token.data)).toString()
  //
  // var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()
  //
  // if (resultHash === token.hash) {
  //   console.log('data not changed');
  // } else {
  //   console.log('data changed');
  // }

// WITH JSONWEBTOKEN

  // const jwt = require('jsonwebtoken');
  //
  // var data = {
  //   id: 1234
  // };
  //
  // var token = jwt.sign(data, '12345678');
  // console.log(token);
  //
  // var decoded = jwt.verify(token, '12345678');
  // console.log(decoded);

// BCRYPT:

  var bcrypt = require('bcryptjs');

  var password = '12345678'

  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(password, salt, (err, hash) => {
  //     console.log(hash);
  //   });
  // });

  var hashedPassword = '$2a$10$04Lqiutn94Ex4bmkNQKDDOVICRBiM9BAZwEIzqdCwiwgtrmpkjLle'

  bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
  });
