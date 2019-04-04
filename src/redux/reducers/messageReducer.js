import { LOAD_MESSAGES, ADD_MESSAGE } from '../constants';

const initialState = [{message:'testing123'}];

const messageReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_MESSAGES:
      return [...action.payload];
      break;
    case ADD_MESSAGE:
      return [...state, ...action.payload];
    default:
      return state;
  }
}

export default messageReducer;
