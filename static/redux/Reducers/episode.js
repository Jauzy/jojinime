import { LOADING, FINISH } from '../Actions/episode'

const initialState = {
    episode: null,
    episodes: null,
    loading: false
};

//reducer
export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, ...action.data };
        case FINISH:
            return { ...state, ...action.data }
        default:
            return state;
    }
};