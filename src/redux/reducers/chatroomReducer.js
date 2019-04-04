import {
    SELECTED_ROOM,
    LOAD_ROOMS,
    ADD_NEW_ROOM,
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
        return {
            ...state, 
            selected: { 
              owner: action.payload.users[0],
              users: action.payload.users,
              _id: action.payload._id ? action.payload._id : action.payload.room_id,
            },
        };
      case ADD_NEW_ROOM:
        return {
          ...state,
          rooms: [...state.rooms, action.payload]
        }
  
      default:
        return state;
    }
  }
  
  export default chatroomReducer;