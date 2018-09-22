const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const {app} = require('../../server/server');
const {User} = require('../../server/models/user');
const {ObjectId} = require('mongodb');
const {users,  populateUsers} = require('../seed/seed');

beforeEach(populateUsers);

// GET Requests

describe('GET users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body._id).equal(users[0]._id.toHexString());
      expect(res.body.email).equal(users[0].email);
    })
    .end(done)
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
    .get('/users/me')
    .expect(401)
    .expect((res) => {
      expect(res.body).include({})
    })
    .end(done)
  });
});

// POST Requests

describe('POST /users', () => {

  var password = '12345678'

  it('should create new user when body data valid', (done) => {
    var email = 'asdfghj@gmail.com'
    request(app)
    .post('/users')
    .send({email, password})
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).to.exist
      expect(res.body._id).to.exist
      expect(res.body.email).equal(email)
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      User.find().then((users) => {
        expect(users.length).equal(3)
        expect(users[2].email).equal(email)
        expect(users[2].password).to.not.equal(password)
        done();
      })
      .catch((e) => done(e))
    })
  });

  it('should send 400 when body data empty', (done) => {
    request(app)
    .post('/users')
    .send('')
    .expect(400)
    .end(done)
  });

  it('should send 400 when body data invalid', (done) => {
    var email = 'qwerty'
    var password = '1234567'

    request(app)
    .post('/users')
    .send({email, password})
    .expect(400)
    .end(done)
  });

  it('should send 400 when email in use', (done) => {
    request(app)
    .post('/users')
    .send({email: users[0].email, password})
    .expect(400)
    .end(done)
  });
});
