import {
    SELECTED_ROOM,
    LOAD_ROOMS,
  } from '../constants';
  
  const initialState = {
      selected: {},
      rooms: [],
  };
  
  const chatroomReducer = (state = initialState, action) => {
    switch(action.type){
      case LOAD_ROOMS: 
      // console.log(action.payload);
        return {...state, 
          rooms: [...action.payload],
        }
      case SELECTED_ROOM:
      console.log(action.payload);
        return {
            ...state, 
            selected: { 
              owner: action.payload.users[0],
              users: action.payload.users,
              _id: action.payload.room_id,
            },
        };
  
      default:
        return state;
    }
  }
  
  export default chatroomReducer;