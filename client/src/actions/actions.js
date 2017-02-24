import 'isomorphic-fetch'
import {SERVER_ROOT} from '../config';
import * as Cookies from 'js-cookie';
import generateNextQuestion from '../utils/generateNextQuestion';

export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const fetchSuccess = (questions) => ({type: FETCH_SUCCESS, questions});

export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = (questions, error) => ({type: FETCH_ERROR, questions, error});

export const FETCH_SUCCESS_CURRENT_USER = 'FETCH_SUCCESS_CURRENT_USER'
export const fetchSuccessCurrentUser = (currentUser) => ({type: FETCH_SUCCESS_CURRENT_USER, currentUser})

export const FETCH_ERROR_CURRENT_USER = 'FETCH_ERROR_CURRENT_USER'
export const fetchErrorCurrentUser = (currentUser, error) => ({type: FETCH_ERROR_CURRENT_USER, currentUser, error})

// export const postAnswer = answer => dispatch => {
//   fetch(`${SERVER_ROOT}/api/questions`,
//     {method: 'POST', body.JSON.stringify({answer}),
//     headers: {
//
//     }
//   })
// }
export const SUBMIT_USER_ANSWER = 'SUBMIT_USER_ANSWER';
export const submitUserAnswer = (currentQuestion, isCorrect, getState) => {
  const { questions, finalQuestions } = getState();
  console.log('questions: ', questions);
  const { questionsArray, finalQuestionsArray } = generateNextQuestion(currentQuestion, questions, finalQuestions, isCorrect);

  return {
    type: SUBMIT_USER_ANSWER,
    questions: questionsArray,
    finalQuestions: finalQuestionsArray
  }
}

export const fetchCurrentUser = () => (dispatch, getState) => {
    const accessToken = Cookies.get('accessToken')
    fetch(`${SERVER_ROOT}/api/me`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`}
        }).then(res => {
            if (!res.ok) {
            if (res.status !== 401) {
                // Unauthorized, clear the cookie and go to
                // the login page
                Cookies.remove('accessToken');
                return;
            }
            throw new Error(res.statusText);
        }
        return res.json();
    })
    .then(currentUser => {
        dispatch(fetchSuccessCurrentUser(currentUser))
    })
    .catch(error => dispatch(fetchErrorCurrentUser(error)))

}
export const fetchQuestions = () => dispatch => {
    const accessToken = Cookies.get('accessToken');

    return fetch(`${SERVER_ROOT}/api/questions`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    }).then(questions => {
        dispatch(fetchSuccess(questions.questions))
    }).catch(error => dispatch(fetchError(error)));

};
