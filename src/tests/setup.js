const mongoose = require('mongoose');
const { getEnvConfig } = require('../configurations');

const envConfig = getEnvConfig(process.env.NODE_ENV);

beforeEach(function(done) {
  /*
    Define clearDB function that will loop through all 
    the collections in our mongoose connection and drop them.
  */
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].drop(function() {});
    }
    return done();
  }

  /*
    If the mongoose connection is closed, 
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  mongoose.connect(envConfig.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (err) {
      done();
      throw err;
    }
    return clearDB();
  });
});

afterEach(done => {
  mongoose.disconnect();
  return done();
});

// afterAll(done => {
//   return done();
// });
