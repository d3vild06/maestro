import * as actions from '../actions/actions';

const initialState = {
  displayName: '',
  questions: [],
  currentUser: null
};

export const appReducer = (state = initialState, action) => {
  if (action.type === 'FETCH_SUCCESS') {
    let questionArray = action.questions.questions;
    // let question = action.questions[0].question
    // console.log(action.questions)
    state = Object.assign({}, state, {questions:questionArray})
    return state;
  }
  if (action.type === 'FETCH_SUCCESS_CURRENT_USER') {
      let user = action.currentUser;
      state = Object.assign({},state, {currentUser:user})
      return state;
  }
  return state;
};
