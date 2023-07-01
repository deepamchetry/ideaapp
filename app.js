const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter');
const ideaRouter = require('./routes/ideaRouter');
const adminRouter = require('./routes/adminRouter');

mongoose.connect('mongodb://localhost/idea-app-db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/ideas', ideaRouter);
app.use('/admin', adminRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
