const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const mail = require('../handlers/mail');


const User = mongoose.model('User');

exports.validateForm = (req, res, next) => {
  req.sanitizeBody('name'); // this method is from express-validator in app.js
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  // req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  // req.checkBody('password-confirm', 'Confirmed Password Cannot be Blank!').notEmpty();
  // req.checkBody('password-confirm', 'Ooops! Your passwords do not match').equals(req.body.password);
  const errors = req.validationErrors();
  if (errors) {
    console.log('Email error!', errors);
    // req.flash('error', errors.map(err => err.msg));
    // res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
  }
  next();
};

exports.setToken = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  // set verify token
  user.verifyToken = crypto.randomBytes(20).toString('hex');
  user.date = Date.now();
  await user.save();
  const resetURL = `http://${req.headers.host}/verify/${user.verifyToken}`;
  await mail.send({
    user,
    subject: 'Password Reset',
    resetURL,
    // filename: 'password-reset', // wesbos's file name used for PUG templates
  });
  next();
};

exports.verifyToken = async (req, res, next) => {
  const user = await User.findOne({ verifyToken: req.params.token });
  if(!user) {
    return res.send('error');
  }
  user.verifyDate = Date.now();
  user.verifyToken = undefined;
  await user.save();
  res.send("email verifyed");
};
