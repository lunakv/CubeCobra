const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Set up in-memory MongoDB.
async function connect() {
  const mongoServer = new MongoMemoryServer();
  const uri = await mongoServer.getConnectionString();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
  return mongoServer;
}

/* Clean up in-memory MongoDB after we're done using it. Pass in the value
 * returned from connect(). */
async function close(mongoServer) {
  await mongoose.disconnect();
  await mongoServer.stop();
}

module.exports = {
  connect,
  close,
};
