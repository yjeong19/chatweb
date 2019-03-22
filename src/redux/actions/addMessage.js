import { 
    LOAD_MESSAGES,
    ADD_MESSAGE,
} from '../constants';

const loadMessages = (payload) => {
    return {
        type: LOAD_MESSAGES,
        payload,
    }
};

const addMessage = (payload) => {
    return {
        type: ADD_MESSAGE,
        payload, 
    }
}

export { 
    loadMessages,
    addMessage 
}