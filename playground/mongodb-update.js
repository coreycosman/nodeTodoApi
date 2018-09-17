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

  // find one and update:
  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectId("5b5b15692d496e29456836f0")
  }, {
    $set: {
      name: 'yo',
      completed: true
    },
    $inc: {
      increment: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(`updated:`);
    console.log(result);
  }, (err) => {
    console.log('unable to find todos', err);
  });

  // client.close();
});
