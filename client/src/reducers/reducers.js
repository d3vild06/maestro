const initialState = {
  displayName: '',
  questions: [],
  finalQuestions: [],
  currentUser: null,
  // nextQuestion: 0,
  sessionEnded: false,
  isFetched: false,
  firstQuestion: true,
  firstQuestionObj:{},
  lastQuestionObj: {},
  userScore: 0,
  questionCounter: 1,
};

export const appReducer = (state = initialState, action) => {
  if (action.type === 'FETCH_SUCCESS') {
    state = Object.assign({}, state, {questions:action.questions, isFetched: true} )
    return state;
  }
  if (action.type === 'FETCH_SUCCESS_CURRENT_USER') {
      let user = action.currentUser;
      state = Object.assign({},state, {currentUser:user})
      // console.log('current user', state.currentUser)
      return state;
  }
  if (action.type === 'SET_CURRENT_QUESTION') {
    state = Object.assign({}, state, {nextQuestion: state.questions[0].question})
    console.log(state.questions)
  }
  if (action.type === 'SUBMIT_USER_ANSWER') {
    return [
      {
        questions: action.questions,
        finalQuestions: action.finalQuestions
      },
      ...state
    ]
  }

  return state;
};
