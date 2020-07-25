import baseURL from './baseURL'
import Cookies from 'universal-cookie'
import swal from 'sweetalert'

const cookies = new Cookies()

export const getPublicUserData = async (userID, setLoading) => {
    setLoading(true)
    try {
        console.log(userID)
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        const {data} = await baseURL.get(`/user/${userID}`)
        setLoading(false)
        return data.other_user
    } catch (error) {
        swal({
            title: "Error!",
            text: error.response?.data.message,
            icon: "error",
            button: "Okay!",
        })
        setLoading(false)
        return null
    }
}

export const getUserData = async (setLoading) => {
    if(!cookies.get('user')) return null
    setLoading(true)
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        const { data } = await baseURL.get(`/user/`, config)
        setLoading(false)
        return data.user
    } catch (error) {
        swal({
            title: "Error!",
            text: error.response?.data.message,
            icon: "error",
            button: "Okay!",
        })
        setLoading(false)
        return null
    }
}

export const login = (payload, navigate, setLoading) => {
    setLoading(true)
    baseURL.post('/user/login', payload).then(async response => {
        await cookies.set('user', response.data.user)
        cookies.set('token', response.data.token)
        navigate('/')
        setLoading(false)
        return false
    }).catch(err => {
        console.log(err)
        setLoading(false)
        return false
    })
}

export const logout = (navigate) => {
    cookies.remove('user')
    cookies.remove('token')
    navigate('/')
}

export const addToFav =  async ({ name, title }, setLoading) => {
    if(!cookies.get('user')) return null
    setLoading(true)
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        const del = await baseURL.put(`/user/favourite/${name}/${title}`, null, config)
        const { data } = await baseURL.get(`/user/`, config)
        setLoading(false)
        return data.user
    } catch (error) {
        swal({
            title: "Error!",
            text: error.response?.data.message,
            icon: "error",
            button: "Okay!",
        })
        setLoading(false)
        return null
    }
}

export const removeFav = async (name, setLoading) => {
    if(!cookies.get('user')) return null
    setLoading(true)
    try {
        const config = { headers: { token: `JOJINIME ${cookies.get('token')}` } }
        const del = await baseURL.delete(`/user/favourite/${name}`, config)
        const { data } = await baseURL.get(`/user/`, config)
        setLoading(false)
        return data.user
    } catch (error) {
        swal({
            title: "Error!",
            text: error.response?.data.message,
            icon: "error",
            button: "Okay!",
        })
        setLoading(false)
        return null
    }
}