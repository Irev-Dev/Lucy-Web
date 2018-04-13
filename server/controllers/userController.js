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
  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) {
    req.flash('error', '⚠️ Whoops, that email has already been submitted. 😱');
    res.redirect('/reg');
    return;
  }
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    yearsFlying: req.body.yearsFlying,
    buildExperiance: req.body['build-experiance'] === 'on' ? true : false,
    buildTime: req.body['build-time'] === 'on' ? true : false,
    socialURL: req.body.socialURL,
    longForm: req.body.longForm,
  });
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
    filename: 'verify', // Wesbos's file name used for PUG templates
  });
  req.flash('success', `<div>
  <h3>Thanks for your support! 🙌</h3>
  <p>Please verify your email by clicking the link we've sent you.</p>
  <p>This project's success depends on interest. Would you mind sharing this with a friend? 🙏</p>
  </div>
  `);
  res.redirect('/');
};

exports.verifyToken = async (req, res, next) => {
  const user = await User.findOne({ verifyToken: req.params.token });
  if (!user) {
    req.flash('error', '⚠️ Whoops, there seems to be a problem, we were unable to verify your email. 😱');
    res.redirect('/');
    return;
  }
  user.verifyDate = Date.now();
  user.verifyToken = undefined;
  await user.save();
  req.flash('success', 'Email verified, nice one. 👌');
  res.redirect('/');
};

exports.subscriptionChange = async (req, res) => {
  const user = await User.findOne({ subscribeToken: req.query.token });
  if (!user) {
    req.flash(
      'error',
      '⚠️ Whoops, something went wrong️, we were unable to verify your account and therefore not able to change your subscription. 😱',
    );
    res.redirect('/');
    return;
  }
  user.subscribeSetting = 'unsubscribed';
  user.subscribeUpdateDate = Date.now();
  user.subscribeUpdateFrom = req.query.date;
  user.subscribeUpdateSource = req.query.source;
  await user.save();
  req.flash('info', "We're sorry to see you go 😔 <br> You are now unsubscribed");
  res.redirect('/');
};

exports.countDown = async (req, res) => {
  const count = await User.count();
  res.json({ count, total: 300 });
};
