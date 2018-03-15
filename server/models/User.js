const mongoose = require('mongoose');

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
    required: 'Please supply a name',
    trim: true,
  },
});

userSchema.plugin(mongodbErrorHandler);



module.exports = mongoose.model('User', userSchema);



const testdb = async() => {
  const User = mongoose.model('User');
  const user = new User({email: 'hiAlistair@hi.com', name: 'hithere'});
  await user.save();
  console.log('it worked I think');
  const users = await User.find();
  console.log(users);
}

testdb();