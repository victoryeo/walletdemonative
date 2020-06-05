import { combineReducers } from 'redux'
import web3Reducer from './web3Reducer'

const appReducer = combineReducers({
  web3Reducer: web3Reducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
