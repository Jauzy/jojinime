import { NotificationManager } from 'react-notifications';
import baseURL from '../../constants/baseURL'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'COMMENT_LOADING';
export const FINISH = 'COMMENT_FINISH'

const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

export const pushComment = async (dispatch, animeID, text) => {
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.post(`/comment/${animeID}`, { text }, config)
        const { data } = await baseURL.get(`/comment/${animeID}`)
        dispatch(finishReq({ comments: data.comments }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Pushing Comment');
        dispatch(finishReq(error))
    }
}

export const pushLike = async (dispatch, animeID, commentID) => {
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.put(`/comment/like/${commentID}`, null, config)
        const { data } = await baseURL.get(`/comment/${animeID}`)
        dispatch(finishReq({ comments: data.comments }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Like Comment');
        dispatch(finishReq(error))
    }
}

export const removeLike = async (dispatch, animeID, commentID) => {
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.delete(`/comment/like/${commentID}`, config)
        const { data } = await baseURL.get(`/comment/${animeID}`)
        dispatch(finishReq({ comments: data.comments }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Like Comment');
        dispatch(finishReq(error))
    }
}

export const getComment = async (dispatch, animeID) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/comment/${animeID}`)
        dispatch(finishReq({ comments: data.comments }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Getting Comments');
        dispatch(finishReq(error))
    }
}

