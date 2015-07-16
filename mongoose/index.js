// Mongoose connect is called once by the app.js & connection established
// No need to include it elsewhere
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_http');

// I have just connected, and I'm not exporting anything from here