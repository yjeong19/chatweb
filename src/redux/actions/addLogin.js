import {
    ADD_LOGIN,
} from '../constants';

const addLogin = (payload) => {
    const data = {
        username: payload.payload.username,
        id: payload.payload.id,
        success: payload.success,
        token: payload.token
    }
    return {
        type: ADD_LOGIN,
        data
    }
};

export { addLogin };