import * as actions from '../actions/actions';

const initalState = {
  displayName: '',
  questions: [],
  currentUser: null;
}

export const appReducer = (state = initialState, action) => {
  if (action.type === actions.FETCH_SUCCESS) {
    let questionArray = questions.questions;
    state = Object.assign({}, state, {questions:questionArray})
    return state;
  }
  if (action.type === actions.FETCH_SUCCESS_CURRENT_USER) {
      let user = currentUser.currentUser;
      state = Object.assign({},state, {currentUser:user})
      return state;
  }
  return state;
};
