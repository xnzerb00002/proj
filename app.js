import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import { join, dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import loginRouter from './routes/login.js';
import { initializeUsers } from './models/user.js';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/my_mongo_database')
  .then(async () => {
    console.log('MongoDB connected');
    await initializeUsers();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
