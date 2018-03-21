const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const crypto = require('crypto');
const mail = require('../handlers/mail');
const moment = require('moment');


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
  const errors = req.validationErrors();
  if (errors) {
    console.log('Email error!', errors);
  }
  next();
};

exports.setToken = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  // set verify token
  user.verifyToken = crypto.randomBytes(20).toString('hex');
  user.date = Date.now();
  user.subscribeSetting = 'default';
  user.subscribeToken = crypto.randomBytes(20).toString('hex');
  await user.save();
  const resetURL = `http://${req.headers.host}/verify/${user.verifyToken}`;
  const subscribeURL = `http://${req.headers.host}/subscription?token=${user.subscribeToken}&source=verify&date=${moment().format('YYYYMMDD')}`;
  await mail.send({
    user,
    subject: 'Please Verify',
    resetURL,
    subscribeURL,
    filename: 'Verify', // wesbos's file name used for PUG templates
  });
  //next();
  req.flash('success', `you did it!! ${req.body.name}`);
  // res.render('main', {});
  res.redirect('/wtf');
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

exports.subsciptionChange = async (req, res) => {
  const user = await User.findOne({ subscribeToken: req.query.token });
  if(!user) {
    return res.send('error');
  }
  user.subscribeSetting = 'unsubscribed';
  user.subscribeUpdateDate = Date.now();
  user.subscribeUpdateFrom = req.query.date;
  user.subscribeUpdateSource = req.query.source;
  await user.save();
  res.send('sorry to se you go :(');
};
