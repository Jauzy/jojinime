import { NotificationManager } from 'react-notifications';
import baseURL from '../../constants/baseURL'

import Cookies from 'universal-cookie'
const cookies = new Cookies()

//action type
export const LOADING = 'SCHEDULE_LOADING';
export const FINISH = 'SCHEDULE_FINISH'
const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

export const addSchedule = async (dispatch, { anime, day }) => {
    NotificationManager.info("Please Wait...", 'Adding New Schedule');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.post(`/schedule/${anime}/${day}`, null, config)
        NotificationManager.success('Schedule Updated!');
        const { data } = await baseURL.get(`/schedule/`)
        dispatch(finishReq({ schedules: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Updating Schedule');
        dispatch(finishReq(error))
    }
}

export const deleteSchedule = async (dispatch, anime) => {
    NotificationManager.info("Please Wait...", 'Deleting Anime from Schedule');
    dispatch(enableLoading())
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        await baseURL.delete(`/schedule/${anime}`, config)
        NotificationManager.success('Schedule Updated!');
        const { data } = await baseURL.get(`/schedule/`)
        dispatch(finishReq({ schedules: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Updating Schedule');
        dispatch(finishReq(error))
    }
}

export const getFullSchedule = async (dispatch) => {
    dispatch(enableLoading())
    try {
        const { data } = await baseURL.get(`/schedule/`)
        dispatch(finishReq({ schedules: data }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Fetch Schedule');
        dispatch(finishReq(error))
    }
}