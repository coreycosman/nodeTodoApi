const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('unable to connect to mongodb server')
  }
  console.log('connected to mongodb server');
  const db = client.db('TodoApp')

  // TODOs collection:

  // db.collection('Todos').insertOne({
  //   name: 'hello',
  //   completed: true
  // })

  // delete many:
  // db.collection('Todos').deleteMany({
  //   name: 'hello'
  // }).then((result) => {
  //   console.log(`deleted:`);
  //   console.log(result);
  // }, (err) => {
  //   console.log('unable to find todos', err);
  // });

  // delete one:
  // db.collection('Todos').deleteOne({
  //   name: 'hello'
  // }).then((result) => {
  //   console.log(`deleted:`);
  //   console.log(result);
  // }, (err) => {
  //   console.log('unable to find todos', err);
  // });

  // find one and delete:
  db.collection('Todos').findOneAndDelete({
    name: 'hello'
  }).then((result) => {
    console.log(`deleted:`);
    console.log(result);
  }, (err) => {
    console.log('unable to find todos', err);
  });

  // client.close();
});
