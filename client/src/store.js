import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import * as reducers from './reducers/reducers';

//how do we install Redux Dev Tools??
const store = createStore(reducers.appReducer, applyMiddleware(thunk));

export default store;
