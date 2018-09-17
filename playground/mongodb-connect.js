// without object restructuring:
// const MongoClient = require('mongodb').MongoClient

// with object restructuring
const {MongoClient, ObjectID} = require('mongodb');

// create new object ID:
var obj = new ObjectID();
console.log(obj);

//
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('unable to connect to mongodb server')
  }
  console.log('connected to mongodb server');
  const db = client.db('TodoApp')

  // USERS
  db.collection('Users').insertOne({
    name: 'user1'
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert user');
    };
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  });

  // TODOS
  db.collection('Todos').insertOne({
    text: 'hello'
  }, (err, result) => {
    if (err) {
      return console.log('unable to insert todo', err);
    }
    console.log(JSON.stringify(result.ops, undefined, 2 ));
  });
  client.close();
});
