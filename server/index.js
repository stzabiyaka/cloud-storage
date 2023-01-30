const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const fileRouter = require('./routes/file.routes');

const app = express();
const SERVER_PORT = config.get('serverPort');
const DB_HOST = config.get('dbHost');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(fileUpload({}));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/files', fileRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

const start = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log('Database successfully connected');
    app.listen(SERVER_PORT, () => {
      console.log('Server running on port:', SERVER_PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
