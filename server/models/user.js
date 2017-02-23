const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  displayName: String,
  email: String,
  token: String
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);


/*






*/
