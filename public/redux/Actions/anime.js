import { NotificationManager } from 'react-notifications';
import baseURL from '../../constants/baseURL'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'ANIME_LOADING';
export const FINISH = 'ANIME_FINISH'
const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

export const addAnime = async (dispatch, payload) => {
    NotificationManager.info("Please Wait...", 'Adding Anime');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.post(`/anime/`, payload, config)
        NotificationManager.success(payload.title + ' Added to Database');
        dispatch(finishReq({ anime: null }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding new Anime');
        dispatch(finishReq(error))
    }
}

export const getAnimes = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/anime/`)
        dispatch(finishReq({ animes: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch Anime');
        dispatch(finishReq(error))
    }
}

export const getAnimeById = async (dispatch, animeID) => {
    dispatch(enableLoading())
    try {
        if (!animeID) {
            NotificationManager.error('Anime not Found!');
        }
        const { data } = await baseURL.get(`/anime/${animeID}`)
        dispatch(finishReq({ anime: data.anime, episodes: data.episodes, recommendations: data.recommendations }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch Anime');
        dispatch(finishReq(error))
    }
}

export const getMovies = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/anime/movie`)
        dispatch(finishReq({ animes: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch Anime');
        dispatch(finishReq(error))
    }
}

export const getOngoing = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/anime/ongoing`)
        dispatch(finishReq({ animes: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch Anime');
        dispatch(finishReq(error))
    }
}