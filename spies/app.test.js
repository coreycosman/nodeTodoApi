// const chai = require('chai');
// const spies = require('chai-spies');
// const expect = chai.expect
// const rewire = require('rewire');
// const app = rewire('./app')
// chai.use(spies)
//
//
//
// describe('App', () => {
//   var db = {
//     saveUser: chai.spy()
//   };
//   app.__set__('db', db);
//
//   it('should call spy correctly', () => {
//     var spy = chai.spy();
//     spy('hello', 'hello');
//     expect(spy).called();
//     expect(spy).with('hello', 'hello');
//   });
//
//   it('should call saveUser with user object', () => {
//     var email = 'hello@gmail.com'
//     var password = '12345678'
//     app.handleSignup(email, password);
//     expect(db.saveUser).with({email, password});
//   });
// });
