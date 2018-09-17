// const request = require('supertest');
// const chai = require('chai');
// const expect = chai.expect;
// const {app} = require('../../server/server');
// const {Todo} = require('../../server/models/todo');
// const {ObjectId} = require('mongodb');
// const todos = [{
//   _id: new ObjectId(),
//   text: 'first test todo'
// }, {
//   _id: new ObjectId(),
//   text: 'second test todo'
// }];
//
// beforeEach((done) => {
//   Todo.deleteMany({}).then(() => {
//     return Todo.insertMany(todos)
//   }).then(() => done());
// });
//
// describe('GET /todos', () => {
//   it('should get all todos', (done) => {
//     request(app)
//     .get('/todos')
//     .expect(200)
//     .expect((res) => {
//       expect(res.body.todos.length).equal(2)
//     })
//     .end(done);
//   });
// });
//
// describe('GET /todos/:id', () => {
//   it('should return todo when ID is valid', (done) => {
//     request(app)
//     .get(`/todos/${todos[0]._id.toHexString()}`)
//     .expect(200)
//     .expect((res) => {
//       expect(res.body.todo.text).equal('first test todo')
//     })
//     .end(done);
//   });
// });
