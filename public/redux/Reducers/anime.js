import { LOADING, FINISH } from '../Actions/anime'

const initialState = {
    anime: null,
    animes: null,
    recommendations: null,

    episode: null,
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