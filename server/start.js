// import environmental variables from our variables.env file
const path = require('path');
if (require('dotenv').config({ path: path.join('server', 'environment.env') }).error) {
  console.log('cant get environment variables, please check you have defined environment.env file');
}

const mongoose = require('mongoose');

const connectstring = process.env.DATABASE + process.env.NODE_ENV;

mongoose.connect(connectstring);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
mongoose.connection.on('connected', () => console.log('mongo connected successfully'));
// READY?! Let's go!

// import all of our models

const app = require('./server.js');

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
