import { combineReducers } from 'redux';
import chatroomReducer from './chatroomReducer';
import messageReducer from './messageReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    chatroomReducer,
    messageReducer,
    loginReducer,
  });
  
  export default rootReducer;