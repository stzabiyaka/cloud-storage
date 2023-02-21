const mongoose = require('mongoose');
const app = require('./app');

require('dotenv').config();

const { SERVER_PORT = 3001, DB_HOST } = process.env;

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
