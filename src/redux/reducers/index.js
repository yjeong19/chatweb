import { combineReducers } from 'redux';
import chatroomReducer from './chatroomReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
    chatroomReducer,
    messageReducer,
  });
  
  export default rootReducer;