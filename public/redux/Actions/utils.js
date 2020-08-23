import { NotificationManager } from 'react-notifications';

//action type
export const LOADING = 'UTILS_LOADING';
export const FINISH = 'UTILS_FINISH'
export const RESET = 'UTILS_RESET'

const enableLoading = () => ({
    type: LOADING, data: { loading: true }
});

const finishReq = (data) => ({
    type: FINISH, data: { loading: false, ...data }
});

const reset = () => ({
    type: RESET
})

export const setupSocket = (dispatch, socket) => {
    try {
        dispatch(enableLoading())
        dispatch(finishReq({ socket }))
    } catch (error) {
        NotificationManager.error(error.response?.data.message, 'Error Setup Socket');
        // dispatch(finishReq(error))
    }
}

export const joinRoom = (dispatch, roomUsers) => {
    dispatch(finishReq({ roomUsers }))
}

export const publicMsgs = (dispatch, publicMSGS) => {
    dispatch(finishReq({ publicMSGS }))
}

export const resetUtils = (dispatch) => {
    dispatch(reset())
}