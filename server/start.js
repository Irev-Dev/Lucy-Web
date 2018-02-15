// import environmental variables from our variables.env file
require('dotenv').config({ path: 'environment.env' });

const app = require('./server.js');

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});