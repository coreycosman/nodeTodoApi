const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('unable to connect to mongodb server')
  }
  console.log('connected to mongodb server');
  const db = client.db('TodoApp')

  // TODOs collection:
  db.collection('Todos').insertOne({
    name: 'hello',
    completed: true
  })
  db.collection('Todos').find({
    name: 'hello'
  }).toArray().then((name) => {
    console.log(`todos:`);
    console.log(JSON.stringify(name, undefined, 2));
  }, (err) => {
    console.log('unable to find todos', err);
  });

  // client.close();
});
