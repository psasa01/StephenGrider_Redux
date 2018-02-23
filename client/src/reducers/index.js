import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; // renamed
import authReducer from './authReducer';

// form property of state will be produced with redux-form reducer!
const rootReducer = combineReducers({
  form,
  auth: authReducer
});

export default rootReducer;
