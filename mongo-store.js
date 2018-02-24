var MongoClient = require('mongodb').MongoClient;

exports.connect = function(collection, callback) {
  MongoClient.connect(process.env.MONGO_CONNECTION_STRING, function(err, db) {
    if(err !== null) {
      console.error(err);
      callback(err);
      return;
    }

    callback(null, db.collection(collection), function() {
      db.close();
    });
  });
}