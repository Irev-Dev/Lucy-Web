const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
// const routes = require('./routes/index');
// const helpers = require('./helpers');
// const errorHandlers = require('./handlers/errorHandlers');
// const mail = require('../handlers/mail');

const userController = require('./controllers/userController');
const { catchErrors } = require('./handlers/errorHandlers');

// create our Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'client', 'views')); //pug files folder
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// public files
app.use(express.static(path.join(__dirname, 'client/dist/')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  // res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.get('/', (req, res) => {
  req.flash('info', `you did it!! `);
  res.render('main', {});
});

app.get('/wtf', (req, res) => {
  // res.send('<p> Welcome, this is a response to be replaced with a pug template response</p>');
  req.flash('success', `<div>
  <h3>Thanks for your support! 🙌</h3>
  <p>Please verify your email by clicking the link we've sent you.</p>
  <p>This project's success depends on interest. Would you mind sharing this with a friend?</p>
  </div>
  `);
  req.flash('info', `you did it!! `);
  req.flash('error', `you did it!! `);
  res.render('main', {});
});

app.post('/add',
  userController.validateForm,
  catchErrors(userController.setToken)//,

  // (req, res) => {
  //   req.flash('error', errors.map(err => err.msg));
  //   res.redirect('/index.html');
  // }
);

app.get('/verify/:token', catchErrors(userController.verifyToken));

app.get('/subscription', catchErrors(userController.subsciptionChange));

module.exports = app;
