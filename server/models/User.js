const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const validator = require('validator');

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
    required: 'Please supply a name',
    trim: true,
  },
});


// module.exports = mongoose.model('User', userSchema);
