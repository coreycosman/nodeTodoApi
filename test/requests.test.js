const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const {app} = require('../server/server');
const {Todo} = require('../server/models/todo');
const {ObjectId} = require('mongodb');
const todos = [{
  _id: new ObjectId(),
  text: 'first test todo'
}, {
  _id: new ObjectId(),
  text: 'second test todo'
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
      return Todo.insertMany(todos)
  }).then(() => done());
});

describe('POST/todos', () => {
  it('should create new todo', (done) => {
    var text = 'test todo text'

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).include('test todo text')
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).equal(1);
        expect(todos[0].text).equal(text)
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send('')
    .expect(400)
    .expect((res) => {
      expect(res.body._message).equal('Todo validation failed')
    })
    .end((err, res) => {
      if (err) {
        return done(err)
      }
      Todo.find().then((todos) => {
        expect(todos.length).equal(2)
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).equal(2)
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo when ID is valid', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).equal('first test todo')
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var notFound = new ObjectId();
    request(app)
    .get(`/todos/${notFound.toHexString()}`)
    .expect(404)
    .end(done)
  });

  it('should return 404 object ID is invalid', (done) => {
    var invalid = 1234;
    request(app)
    .get(`/todos/${invalid}`)
    .expect(404)
    .end(done)
  });
});
