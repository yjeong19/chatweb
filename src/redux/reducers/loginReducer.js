import { 
    ADD_LOGIN
} from '../constants';

const initialState = {
    username: '',
    user_id: '',
    token: '',
    success: false,
};

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_LOGIN: 
            return {
                ...action.data
            };
        default:
            return state;
    }
};

export default loginReducer