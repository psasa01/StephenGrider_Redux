import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; // renamed

// form property of state will be produced with redux-form reducer!
const rootReducer = combineReducers({
  form
});

export default rootReducer;
