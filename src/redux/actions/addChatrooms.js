import { 
    SELECTED_ROOM,
    LOAD_ROOMS,
    ADD_NEW_ROOM,
} from '../constants';

const addSelectedRoom = (payload) => {
    return {
        type: SELECTED_ROOM,
        payload
    }
};

const loadRooms = (payload) => {
    return {
        type: LOAD_ROOMS,
        payload
    }
}

const addNewRoom = (payload) => {
    return {
        type: ADD_NEW_ROOM,
        payload,
    }
}

export { addSelectedRoom, loadRooms, addNewRoom };