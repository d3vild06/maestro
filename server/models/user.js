const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = Schema({
  googleId: String,
  firstName: String,
  lastName: String,
  displayName: String,
  email: String,
  token: String,
  totalCorrectQuestions: {type: Number, default: 0},
  currentQuestions: [],
  previousQuestions: [
    { questionId: {type: Schema.Types.ObjectId, ref: 'Question', required: true },
      mValue: {type: Number, required: true, default: 1},
      correctCount: {type: Number, default: 0},
      dateAnswered: {type: Date}
    }
  ]
});

userSchema.plugin(findOrCreate);
module.exports = mongoose.model('User', userSchema);


/*






*/
