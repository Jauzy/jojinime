import { LOADING, FINISH, RESET } from '../Actions/user'

const initialState = {
    user: null,
    public_user: null,
    isNicknameValid: null,
    loading: false
};

//reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, ...action.data };
        case FINISH:
            return { ...state, ...action.data }
        case RESET:
            return { ...initialState }
        default:
            return state;
    }
};