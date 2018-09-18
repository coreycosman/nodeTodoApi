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
  text: 'second test todo',
  completed: true,
  completedAt: 1234
}];
const todoId = todos[0]._id.toHexString();
const notFound = new ObjectId().toHexString();
const invalidId = '12345678'

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
    .get(`/todos/${todoId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).equal('first test todo')
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
    .get(`/todos/${notFound}`)
    .expect(404)
    .end(done)
  });

  it('should return 404 object ID is invalid', (done) => {
    request(app)
    .get(`/todos/${invalidId}`)
    .expect(404)
    .end(done)
  });
});

describe('PATCH /todos/:id', () => {
  var updateText = 'update'

  it('should update a todo', (done) => {
    request(app)
    .patch(`/todos/${todoId}`)
    .send({
      completed: true,
      text: updateText
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).include('update');
      expect(res.body.todo.completed).to.equal(true);
    expect(res.body.todo.completedAt).to.be.a('number');
    })
    .end(done)
  });

  it('should clear completed at when todo not completed', (done) => {
    request(app)
    .patch(`/todos/${todos[1]._id.toHexString()}`)
    .send({
      text: updateText,
      completed: false
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).include('update')
      expect(res.body.todo.completed).to.equal(false)
      expect(res.body.todo.completedAt).to.not.exist
    })
    .end(done)
  });

  it('should return 404 when todo does not exist', (done) => {
    request(app)
    .patch(`/todos/${notFound}`)
    .expect(404)
    .end(done)
  });

  it('should return 404 when id invalid', (done) => {
    request(app)
    .patch(`/todos/${invalidId}`)
    .expect((a) => {
      debugger
    })
    .expect(404)
    .end(done)
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    request(app)
    .delete(`/todos/${todoId}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).equal(todoId)
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(todoId).then((todo) => {
        expect(todo).to.not.exist
      }).catch((e) => done(e))
      done();
    })
  });

  it('should return 404 when todo not found', (done) => {
    request(app)
    .delete(`/todos/${notFound}`)
    .expect(404)
    .end(done)
  });

  it('should return 404 when id not valid', (done) => {
    request(app)
    .delete(`/todos/${invalidId}`)
    .expect(404)
    .end(done)
  });
});
