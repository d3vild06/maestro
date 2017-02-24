const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = Schema({
  question: String,
  answer: String
});

module.exports = mongoose.model('Question', questionSchema);
