import { NotificationManager } from 'react-notifications';
import baseURL from '../../constants/baseURL'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'EPISODE_LOADING';
export const FINISH = 'EPISODE_FINISH'
const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

export const addEpisode = async (dispatch, animeID, payload) => {
    NotificationManager.info("Please Wait...", 'Adding New Episode');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.post(`/episode/${animeID}`, payload, config)
        NotificationManager.success('New Episode Added');
        const { data } = await baseURL.get(`/episode/${animeID}`)
        dispatch(finishReq({ episodes: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding new Episode');
        dispatch(finishReq(error))
    }
}

export const updateInfoEps = async (dispatch, episodeID, animeID, payload) => {
    NotificationManager.info("Please Wait...", 'Updating Episode');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.put(`/episode/eps/${episodeID}`, payload, config)
        NotificationManager.success('Episode Updated');
        const { data } = await baseURL.get(`/episode/${animeID}`)
        dispatch(finishReq({ episodes: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding new Episode');
        dispatch(finishReq(error))
    }
}

export const deleteEps = async (dispatch, episodeID, animeID) => {
    NotificationManager.info("Please Wait...", 'Deleting Episode');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.delete(`/episode/eps/${episodeID}`, config)
        NotificationManager.success('Episode Deleted');
        const { data } = await baseURL.get(`/episode/${animeID}`)
        dispatch(finishReq({ episodes: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding new Episode');
        dispatch(finishReq(error))
    }
}

export const getEpisode = async (dispatch, episodeID) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/episode/eps/${episodeID}`)
        dispatch(finishReq({ episode: data.episode }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch Episode');
        dispatch(finishReq(error))
    }
}

export const getEpisodes = async (dispatch, animeID) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/episode/${animeID}`)
        dispatch(finishReq({ episodes: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch Episode');
        dispatch(finishReq(error))
    }
}