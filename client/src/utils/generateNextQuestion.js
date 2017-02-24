// spaced repetition algorithm to mutate list of questions
// to generate the next question to ask user and
// update list based on user's answer

export default (currentQuestion, questionsArray, finalQuestionsArray, userAnswerCorrect) => {
  const MULTIPLIER = 2;
  let question = questionsArray.shift();
  let { mValue } = currentQuestion;
  let length = questionsArray.length;

  if (mValue >= 4 || (mValue - 1) > length) {   // user has answered the question correctly at least twice in succession or more
    finalQuestionsArray.push(question);
  }
  if (userAnswerCorrect) {
    currentQuestion.mValue *= MULTIPLIER;
    let insertAt = currentQuestion.mValue - 1;
    questionsArray.splice(insertAt, 0, question);
  } else {
    currentQuestion.mValue = 1; // reset since user answered incorrectly
    let insertAt = currentQuestion.mValue;
    questionsArray.splice(insertAt, 0, question);
  }

  return { questionsArray, finalQuestionsArray };
}
