var MongoStore = require('./mongo-store');

exports.findOrCreate = function(email, callback) {
  MongoStore.connect('users', function(err, collection, close) {
    if(err !== null) {
      close();
      callback(err);
      return;
    }

    collection.find({ email: email }).toArray(function(err, docs) {
      if(err !== null) {
        close();
        callback(err);
        return;
      }

      if(docs.length > 1) {
        callback("more than one user with the current e-mail found");
      } else if(docs.length === 0) {
        var doc = {
          email: email
        };

        collection.insert(doc);

        callback(null, doc);

      } else {
        callback(null, docs[0]);
      }

      close();
    });
  });
}

exports.find = function(email, callback) {
  MongoStore.connect('users', function(err, collection, close) {
    if(err !== null) {
      close();
      callback(err);
      return;
    }

    collection.find({ email: email }).toArray(function(err, docs) {
      if(err !== null) {
        close();
        callback(err);
        return;
      }

      if(docs.length !== 1) {
        callback("user not found");
      } else {
        callback(null, docs[0]);
      }

      close();
    });
  });
}