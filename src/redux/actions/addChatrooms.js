import { 
    SELECTED_ROOM,
    LOAD_ROOMS
} from '../constants';

const addSelectedRoom = (payload) => {
    return {
        type: SELECTED_ROOM,
        payload
    }
};

const loadRooms = (payload) => {
    console.log(payload);
    return {
        type: LOAD_ROOMS,
        payload
    }
}

export { addSelectedRoom, loadRooms };