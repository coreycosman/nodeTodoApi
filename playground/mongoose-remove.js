const {ObjectId} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// })


// Todo.findByIdAndDelete('5b9fb2149374e74877faf958').then((todo) => {
//   console.log(todo);
// })

Todo.findOneAndDelete({_id: '5b9fb2149374e74877faf958'}).then((todo) => {
  console.log(todo);
})
