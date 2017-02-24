const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = Schema({
  question: String,
  answer: String,
  mValue: {type: Number, default: 1},
  correctCount: {type: Number, default: 0}
});

module.exports = mongoose.model('Question', questionSchema);
