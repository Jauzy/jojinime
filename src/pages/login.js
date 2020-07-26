import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { Layout, SEO } from '../components/Index'
import { connect } from 'react-redux'
import { NotificationManager } from 'react-notifications';
import { login } from "../../static/redux/Actions/user";

const cookies = new Cookies()
const COLORS = require('../../static/constants/Colors')

const defaultState = {
    email: '',
    password: '',
    nickname: '',
    isNicknameValid: '',
    active: 'Login'
}

const Login = props => {
    const { loading } = props
    const [state, setState] = useState({
        email: '',
        password: '',
        nickname: '',
        isNicknameValid: '',
        active: 'Login'
    })
    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value.toString() })
    }

    const onLogin = () => {
        login(props.dispatch, { email: state.email, password: state.password }, props.navigate)
    }

    const onSignUp = () => {

    }

    useEffect(() => {
        if (cookies.get('token') || cookies.get('user')) {
            NotificationManager.warning("Please logout to continue", "You already logged in!")
            props.navigate('/')
        }
    }, [])

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
                    </div>
                </div>}

                {state.active === 'SignUp' && <div className="form-signin m-auto">
                    <div className="text-center mb-4">
                        <div className="navbar-brand font-weight-bold text-white" style={{ fontSize: '40px' }}>
                            Daftar<strong style={{ color: COLORS.MAIN }}>.</strong>
                        </div>
                        <h6 className='text-white text-center'>Daftar dengan mengisi form dibawah.</h6>
                    </div>

                    <div className="form-label-group">
                        <input type="text" id="nickname" className="form-control" placeholder="Nickname" onChange={onChange} value={state.nickname} />
                        <label htmlFor="inputNickname">Nickname</label>
                    </div>
                    <div className='d-flex flex-wrap mb-3'>
                        <button className='btn btn-main my-auto' onClick={() => props.checkUsername(state.nickname)}>Check</button>
                        {state.isNicknameValid === false && <small className='text-danger my-auto ml-3'>Nickname already taken!</small>}
                        {state.isNicknameValid === true && <small className='text-success my-auto ml-3'>Nickname available.</small>}
                    </div>

                    <div className="form-label-group">
                        <input type="email" id="email" className="form-control" placeholder="Email address" onChange={onChange} value={state.email} />
                        <label htmlFor="email">Email address</label>
                    </div>

                    <div className="form-label-group">
                        <input type="password" id="password" className="form-control" placeholder="Password" onChange={onChange} value={state.password} />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className="btn btn-lg btn-main btn-block d-flex align-items-center justify-content-center" onClick={onSignUp}
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
    loading: state.user.loading
}), null)(Login)