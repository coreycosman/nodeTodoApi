const {ObjectId} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');
var id = '5b9e3b5768c733ef179416ec1'
var userId = '5b9e425c914fc5f2019ffcd6'

// if (!ObjectId.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');;
//   }
//   console.log('Todo by Id:', todo);
// }).catch((e) => console.log(e))

// Todo.find({
//   _id: id
// }).then((todos) => {
//   if (!todos) {
//     return console.log('Id not found');;
//   }
//   console.log('Todos:', todos);
// }).catch((e) => console.log(e))
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');;
//   }
//   console.log('Todo:', todo);
// }).catch((e) => console.log(e))

User.findById(userId).then((user) => {
  if (!user) {
    console.log('user not found');
  }
  console.log('user:', JSON.stringify(user, undefined, 2));
}).catch((e) => {
  if (!ObjectId.isValid(userId)) {
    console.log('invalid ID');
  }
});
