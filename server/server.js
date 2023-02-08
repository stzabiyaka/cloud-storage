const mongoose = require('mongoose');
const config = require('config');
const app = require('./app');

const SERVER_PORT = config.get('SERVER_PORT');
const DB_HOST = config.get('DB_HOST');

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Database successfully connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(SERVER_PORT, () => {
    console.log('Server running. Use API on port:', SERVER_PORT);
  });
});
