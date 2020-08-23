import { NotificationManager } from 'react-notifications';
import baseURL from '../../constants/baseURL'

import Cookies from 'universal-cookie'
import { navigate } from 'gatsby';
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

export const deleteAnime = async (dispatch, animeID) => {
    NotificationManager.info("Please Wait...", 'Deleting Anime');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.delete(`/anime/${animeID}`, config)
        NotificationManager.success('Anime Deleted');
        navigate('/admin')
        dispatch(finishReq(null))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Deleting Anime');
        dispatch(finishReq(error))
    }
}

export const updateInfo = async (dispatch, animeID, payload) => {
    NotificationManager.info("Please Wait...", 'Updating Anime Info');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.put(`/anime/${animeID}`, payload, config)
        NotificationManager.success(payload.title + ' Info Updated');
        const { data } = await baseURL.get(`/anime/${animeID}`)
        dispatch(finishReq({ anime: data.anime, recommendations: data.recommendations }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Updating Anime Info');
        dispatch(finishReq(error))
    }
}

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
        dispatch(finishReq({ anime: data.anime, recommendations: data.recommendations }))
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