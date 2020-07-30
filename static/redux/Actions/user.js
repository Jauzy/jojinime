import { NotificationManager } from 'react-notifications';
import baseURL from '../../constants/baseURL'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'USER_LOADING';
export const FINISH = 'USER_FINISH'
export const RESET = 'USER_RESET'

const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

const reset = () => ({
    type: RESET
})

export const logout = (dispatch, navigate) => {
    cookies.remove('user')
    cookies.remove('token')
    dispatch(reset())
    navigate('/')
}

export const checkUsername = async (dispatch, nickname) => {
    try {
        dispatch(enableLoading())
        const { data } = await baseURL.get(`/user/check/${nickname}`)
        dispatch(finishReq({ isNicknameValid: data.value }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Check User Name');
        dispatch(finishReq(error))
    }
}

export const register = async (dispatch, { nickname, email, password }) => {
    NotificationManager.info("Please Wait...", 'Registering User');
    try {
        dispatch(enableLoading())
        await baseURL.post(`/user/`, { nickname, email, password })
        NotificationManager.success(`You're Successfully Registered!`);
        dispatch(finishReq(null))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Register');
        dispatch(finishReq(error))
    }
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
    NotificationManager.info('Please Wait...', 'Adding to Favourite');
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
    NotificationManager.info('Please Wait...', 'Adding to Favourite');
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
    NotificationManager.info('Please Wait...', 'Updating Profile Pict');
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

export const uploadPublicBanner = async (dispatch, payload) => {
    NotificationManager.info('Please Wait...', 'Updating Public Banner');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.put(`/user/upload/public_banner`, payload, config)
        const { data } = await baseURL.get(`/user/`, config)
        NotificationManager.success('Public Banner Updated!');
        dispatch(finishReq({ user: data.user }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Adding To Favourite');
        dispatch(finishReq(error))
    }
}

export const changePassword = async (dispatch, { newPassword, oldPassword }) => {
    NotificationManager.info('Please Wait...', 'Updating Password');
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
    NotificationManager.info('Please Wait...', 'Updating Profile');
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

export const sendVerificationEmail = async (dispatch) => {
    NotificationManager.info('Please Wait...', 'Sending Verification Email');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.post(`/user/verify`, null, config)
        NotificationManager.success('Verification Email Sent!');
        dispatch(finishReq(null))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Sending Verification Email');
        dispatch(finishReq(error))
    }
}

export const verifyEmail = async (dispatch, token) => {
    NotificationManager.info('Please Wait...', 'Verifying Email');
    dispatch(enableLoading())
    try {
        await baseURL.put(`/user/verify/${token}`)
        NotificationManager.success('Account Verified!');
        dispatch(finishReq(null))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Verifying Email');
        dispatch(finishReq(error))
    }
}