import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { Layout, SEO } from '../components/Index'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications';
import { login, register, checkUsername } from "../../static/redux/Actions/user";
import { resetUtils, setupSocket } from "../../static/redux/Actions/utils";
import { Link } from 'gatsby'
//socket
import socketIOClient from "socket.io-client";

const cookies = new Cookies()
const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const defaultState = {
    email: '',
    password: '',
    nickname: '',
    isNicknameValid: null,
    active: 'Login',
    showPassword: false
}

const Login = props => {
    const { loading, isNicknameValid, socket} = props
    const [state, setState] = useState({
        email: '',
        password: '',
        nickname: '',
        isNicknameValid: null,
        active: 'Login',
        showPassword: false
    })
    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value.toString() })
    }

    const onLogin = () => {
        if (cookies.get('token') || cookies.get('user')) {
            NotificationManager.warning("Please logout to continue", "You already logged in!")
        } else {
            if(socket){
                socket.disconnect()
                resetUtils(props.dispatch)
                setupSocket(props.dispatch, socketIOClient(ROUTES.ENDPOINT))
            } else setupSocket(props.dispatch, socketIOClient(ROUTES.ENDPOINT))
            login(props.dispatch, { email: state.email, password: state.password }, props.navigate)
        }
    }

    const onCheck = () => {
        checkUsername(props.dispatch, state.nickname)
    }

    const togglePasswordShow = () => {
        setState({ ...state, showPassword: !state.showPassword })
    }

    const onSignUp = () => {
        if (cookies.get('token') || cookies.get('user')) {
            NotificationManager.warning("Please logout to continue", "You already logged in!")
        } else {
            register(props.dispatch, { email: state.email, password: state.password, nickname: state.nickname })
            setState({ ...defaultState })
        }
    }

    useEffect(() => {
        setState({ ...state, isNicknameValid })
    }, [isNicknameValid])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={state.active} />
            <div className='shape-wave-top'></div>
            <div className='container d-flex' style={{ height: '600px' }}>
                {state.active === 'Login' && <div className="form-signin m-auto">
                    <div className="text-center mb-4">
                        <div className="navbar-brand font-weight-bold text-white" style={{ fontSize: '40px' }}>
                            Login<strong style={{ color: COLORS.MAIN }}>.</strong>
                        </div>
                        <h6 className='text-white text-center'>Login dengan email dan password yang telah anda daftarkan.</h6>
                    </div>

                    <div className="form-label-group">
                        <input type="email" id="email" className="form-control" placeholder="Email address" onChange={onChange} value={state.email} />
                        <label htmlFor="email">Email address</label>
                    </div>

                    <div className="form-label-group">
                        <input type="password" id="password" className="form-control" placeholder="Password" onChange={onChange} value={state.password} />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className="btn btn-lg btn-main btn-block d-flex align-items-center justify-content-center" onClick={onLogin}>
                        {loading && <div className="spinner-border mr-3" style={{ width: '20px', height: '20px' }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>}
                        Sign in</button>
                    <div className='d-flex'>
                        <small className='text-white mx-auto mt-3'>Belum punya akun?
                        <span className='font-weight-bold text-white ml-2' style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => {
                                setState({ ...defaultState, active: 'SignUp' })
                            }}>Daftar.</span>
                        </small>
                        <small className='mx-auto mt-3'><Link className='text-white' to={ROUTES.FORGOTPASSWORD}>Lupa Password?</Link></small>
                    </div>
                </div>}

                {state.active === 'SignUp' && <div className="form-signin m-auto">
                    <div className="text-center mb-4">
                        <div className="navbar-brand font-weight-bold text-white" style={{ fontSize: '40px' }}>
                            Daftar<strong style={{ color: COLORS.MAIN }}>.</strong>
                        </div>
                        <h6 className='text-white text-center'>Daftar dengan mengisi form dibawah ini.</h6>
                    </div>

                    <div className='d-flex align-items-center'>
                        <div className="form-label-group w-100 my-auto mr-2">
                            <input type="text" id="nickname" className="form-control" placeholder="Nickname" onChange={onChange} value={state.nickname} />
                            <label htmlFor="inputNickname">Nickname</label>
                        </div>
                        <button className='btn btn-main h-100' onClick={onCheck}><i className='fa fa-search' /></button>
                    </div>
                    <div className='d-flex flex-wrap mt-2 mb-3 ml-1'>
                        {state.isNicknameValid === null && <small className='text-main my-auto'>Note: Click on Magnifier to Check Nickname Availability!</small>}
                        {state.isNicknameValid === false && <small className='text-danger my-auto'>Nickname already taken!</small>}
                        {state.isNicknameValid === true && <small className='text-success my-auto'>Nickname available.</small>}
                    </div>

                    <div className="form-label-group">
                        <input type="email" id="email" className="form-control" placeholder="Email address" onChange={onChange} value={state.email} />
                        <label htmlFor="email">Email address</label>
                    </div>

                    <div className='d-flex align-items-center'>
                        <div className="form-label-group w-100 my-auto mr-2">
                            <input type={state.showPassword ? 'text' : 'password'} id="password" className="form-control" placeholder="Password" onChange={onChange} value={state.password} />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className='btn btn-main h-100' onClick={togglePasswordShow}><i className={`fa fa-${state.showPassword ? 'eye-slash' : 'eye'}`} /></button>
                    </div>

                    <button className="btn btn-lg btn-main btn-block d-flex align-items-center justify-content-center mt-3" onClick={onSignUp}
                        disabled={!state.email || !state.nickname || !state.isNicknameValid || !state.password}>
                        {loading && <div className="spinner-border mr-3" style={{ width: '20px', height: '20px' }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>}
                        Sign Up</button>
                    <div className='d-flex'>
                        <small className='text-white mx-auto mt-3'>Sudah punya akun?
                        <span className='font-weight-bold text-white ml-2' style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => {
                                setState({ ...defaultState, active: 'Login' })
                            }}>Login.</span>
                        </small>
                    </div>
                </div>}
            </div>
            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export default connect(state => ({
    loading: state.user.loading,
    isNicknameValid: state.user.isNicknameValid,
    socket: state.utils.socket
}), null)(Login)