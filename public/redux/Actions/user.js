import { NotificationManager } from 'react-notifications';
import baseURL from '../../constants/baseURL'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'USER_LOADING';
export const FINISH = 'USER_FINISH'
const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

export const logout = (navigate) => {
    cookies.remove('user')
    cookies.remove('token')
    navigate('/')
}

export const getUserData = async (dispatch) => {
    if (!cookies.get('user')) dispatch(finishReq(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
            const { data } = await baseURL.get(`/user/`, config)
            dispatch(finishReq({ user: data.user }))
        } catch (error) {
            NotificationManager.error(error.response?.data.message, 'Error Fetch User Data');
            dispatch(finishReq(error))
        }
    }
}

export const login = async (dispatch, payload, navigate) => {
    NotificationManager.info("Please Wait...", 'Login Process');
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.post('/user/login', payload)
        cookies.set('user', data.user)
        cookies.set('token', data.token)
        dispatch(finishReq({ user: data.user }))
        navigate('/')
        NotificationManager.success("Login Success!");
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch User Data');
        dispatch(finishReq(error))
    }
}

export const getPublicUserData = async (dispatch, userID) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/user/${userID}`)
        dispatch(finishReq({ public_user: data.other_user }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch User Data');
        dispatch(finishReq(error))
    }
}

export const addToFav = async (dispatch, animeID) => {
    NotificationManager.info('Adding to Favourite');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.put(`/user/favourite/${animeID}`, null, config)
        const { data } = await baseURL.get(`/user/`, config)
        NotificationManager.success('Added to Favourite');
        dispatch(finishReq({ user: data.user }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding To Favourite');
        dispatch(finishReq(error))
    }
}

export const removeFav = async (dispatch, animeID) => {
    NotificationManager.info('Adding to Favourite');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.delete(`/user/favourite/${animeID}`, config)
        const { data } = await baseURL.get(`/user/`, config)
        NotificationManager.success('Removed from Favourite');
        dispatch(finishReq({ user: data.user }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Remove from Favourite');
        dispatch(finishReq(error))
    }
}

export const uploadProfilePict = async (dispatch, payload) => {
    NotificationManager.info('Updating Profile Pict');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.put(`/user/upload/profile_pict`, payload, config)
        const { data } = await baseURL.get(`/user/`, config)
        NotificationManager.success('Profile Pict Updated!');
        dispatch(finishReq({ user: data.user }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding To Favourite');
        dispatch(finishReq(error))
    }
}

export const changePassword = async (dispatch, { newPassword, oldPassword }) => {
    NotificationManager.info('Updating Password');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.put(`/user/password`, { newPassword, oldPassword }, config)
        const { data } = await baseURL.get(`/user/`, config)
        NotificationManager.success('Password Updated!');
        dispatch(finishReq({ user: data.user }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding To Favourite');
        dispatch(finishReq(error))
    }
}

export const updateUser = async (dispatch, payload) => {
    NotificationManager.info('Updating Profile');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.put(`/user/`, payload, config)
        const { data } = await baseURL.get(`/user/`, config)
        NotificationManager.success('Profile Updated!');
        dispatch(finishReq({ user: data.user }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding To Favourite');
        dispatch(finishReq(error))
    }
}