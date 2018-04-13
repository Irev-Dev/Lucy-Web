const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please enter a email address!',
  },
  name: {
    type: String,
    // required: 'Please supply a name',
    trim: true,
  },
  yearsFlying: Number,
  buildExperiance: Boolean,
  buildTime: Boolean,
  URL: String,
  longForm: String,
  verifyToken: String,
  date: Date,
  verifyDate: Date,
  subscribeSetting: String,
  subscribeToken: String,
  subscribeUpdateDate: Date,
  subscribeUpdateFrom: String,
  subscribeUpdateSource: String,
});

userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);

const testDB = async() => {
  const User = mongoose.model('User');
  let users = await User.find();
  console.log(users);

  // await User.remove(); // Purge the db, DON'T leave in production code!!!!
};

testDB();
