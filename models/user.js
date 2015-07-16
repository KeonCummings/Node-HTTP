// set up mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var UserSchema = Schema({
  name: {type: String },
  email: {type: String },
  username: {type: String },
  provider: {type: String},
  facebook: {type: String}
});

User = mongoose.model('User', UserSchema);
// the above is necessary as you might have embedded schemas which you don't export

exports.userModel = User;