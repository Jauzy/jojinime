import { NotificationManager } from 'react-notifications';
import axios from 'axios'

//action type
export const LOADING = 'EPISODE_LOADING';
export const FINISH = 'EPISODE_FINISH'
const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

export const getEpisodes = async (dispatch, playlistID) => {
    if (!playlistID) {
        dispatch(finishReq({ episodes: null }))
    } else {
        try {
            dispatch(enableLoading())
            const { data } = await axios.get(playlistID)
            dispatch(finishReq({ episodes: data.playlist }))
        } catch (error) {
            NotificationManager.error('Playlist not found!', 'Error Fetch Episodes');
            dispatch(finishReq(error))
        }
    }
}