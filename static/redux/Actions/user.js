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

const userFinish = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});


export const getUserData = async (dispatch) => {
    if (!cookies.get('user')) dispatch(userFinish(null))
    else {
        dispatch(enableLoading())
        try {
            const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
            const { data } = await baseURL.get(`/user/`, config)
            dispatch(userFinish({ user: data.user }))
        } catch (error) {
            NotificationManager.error(error.response?.data.message, 'Error Fetch User Data');
            dispatch(userFinish(error))
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
        dispatch(userFinish({ user: data.user }))
        navigate('/')
        NotificationManager.success("Login Success!");
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch User Data');
        dispatch(userFinish(error))
    }
}

export const getPublicUserData = async (dispatch, userID) => {
    NotificationManager.info("Please Wait...", 'Loading User');
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/user/${userID}`)
        dispatch(userFinish({ public_user: data.other_user }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch User Data');
        dispatch(userFinish(error))
    }
}