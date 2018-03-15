const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name'); //this method is from express-validator in app.js
  //req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  // req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  // req.checkBody('password-confirm', 'Confirmed Password Cannot be Blank!').notEmpty();
  // req.checkBody('password-confirm', 'Ooops! Your passwords do not match').equals(req.body.password);
  const errors = req.validationErrors();
  if(errors) {
    console.log('Email error!',errors);
    // req.flash('error', errors.map(err => err.msg));
    // res.render('register', {title: 'Register', body: req.body, flashes: req.flash() });
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({email: req.body.email, name: req.body.name});
  user.save();
  // const register = promisify(User.register, User);
  // try {
  //   await register(user, req.body.password);
  // } catch (error) {
  //   console.log('oh noes',error);
  // }
  //res.send('it works!!');
  next();
};