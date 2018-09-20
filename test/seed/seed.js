const {ObjectId} = require('mongodb');
const {Todo} = require('../../server/models/todo');
const {User} = require('../../server/models/user');
const jwt = require('jsonwebtoken');

const todos = [{
  _id: new ObjectId(),
  text: 'first test todo'
}, {
  _id: new ObjectId(),
  text: 'second test todo',
  completed: true,
  completedAt: 1234
}];

const userOneId = new ObjectId()
const userTwoId = new ObjectId()
const users = [{
  _id: userOneId,
  email: 'qwerty@gmail.com',
  password: '12345678',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, '12345678').toString()
  }]
}, {
  _id: userTwoId,
  email: 'qwertyu@gmail.com',
  password: '12345678'
}]

const populateUsers = (done) => {
  User.deleteMany({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

const populateTodos = (done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done());
};


module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
