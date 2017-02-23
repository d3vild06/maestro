import * as actions from '../actions/actions';

const initialState = {
  displayName: '',
  questions: [],
  currentUser: null,
  currentQuestion:{},
  sessionEnded: false,
  firstQuestion: true,
  firstQuestionObj:{},
  lastQuestionObj: {},
  userScore: 0,
  questionCounter: 1,
};

export const appReducer = (state = initialState, action) => {
  if (action.type === 'FETCH_SUCCESS') {
    // let questionArray = action.questions.questions;
    // let firstQuestion = action.questions.questions[0].question
    // console.log(firstQuestion)
    // let question = action.questions[0].question
  // console.log(action.questions)
    state = Object.assign({}, state, {questions:action.questions} )
    return state;
  }
  if (action.type === 'FETCH_SUCCESS_CURRENT_USER') {
      let user = action.currentUser;
      state = Object.assign({},state, {currentUser:user})
      console.log('current user', state.currentUser)
      return state;
  }
  // if (action.type === 'ANSWER_SUBMIT') {
  //   let answer = actions.answer;
  //     answer === this.state.currentQuestion.answer ? state = Object.assign({}, state, {})
  //       state = Object.
  // }
  return state;
};
