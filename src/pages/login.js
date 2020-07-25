import React, { useEffect, useState } from 'react'
import { Link, useStaticQuery } from 'gatsby'
import Cookies from 'universal-cookie'
import { Layout, SEO } from '../components/Index'

const cookies = new Cookies()
const COLORS = require('../../static/constants/Colors')
const USERACTION = require('../../static/constants/userAction')

const defaultState = {
    email: '',
    password: '',
    nickname: '',
    isNicknameValid: '',
    active: 'Login'
}

const Login = props => {
    const [loading, setLoading] = useState(false)
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

    const onSubmit = () => {
        setState({ ...state, loading: true })
        setState({ ...state, loading: USERACTION.login({ email: state.email, password: state.password }, props.navigate, setLoading) })
    }

    useEffect(() => {
        if(cookies.get('token') || cookies.get('user')) props.navigate('/')
    },[])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY} loading={loading}>
            <SEO title={state.active} />
            <div className='shape-wave-top'></div>
            <div className='container d-flex' style={{ height: '600px'}}>
                {state.active == 'Login' && <div class="form-signin m-auto">
                    <div class="text-center mb-4">
                        <Link class="navbar-brand font-weight-bold text-white" style={{ fontSize: '40px' }}>
                            Login<strong style={{ color: COLORS.MAIN }}>.</strong>
                        </Link>
                        <h6 className='text-white text-center'>Login dengan email dan password yang telah anda daftarkan.</h6>
                    </div>

                    <div class="form-label-group">
                        <input type="email" id="email" class="form-control" placeholder="Email address" onChange={onChange} value={state.email} />
                        <label for="inputEmail">Email address</label>
                    </div>

                    <div class="form-label-group">
                        <input type="password" id="password" class="form-control" placeholder="Password" onChange={onChange} value={state.password} />
                        <label for="inputPassword">Password</label>
                    </div>

                    <button class="btn btn-lg btn-main btn-block d-flex align-items-center justify-content-center" onClick={onSubmit}>
                        {loading && <div class="spinner-border mr-3" style={{ width: '20px', height: '20px' }} role="status">
                            <span class="sr-only">Loading...</span>
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

                {state.active == 'SignUp' && <div class="form-signin m-auto">
                    <div class="text-center mb-4">
                        <Link class="navbar-brand font-weight-bold text-white" style={{ fontSize: '40px' }}>
                            Daftar<strong style={{ color: COLORS.MAIN }}>.</strong>
                        </Link>
                        <h6 className='text-white text-center'>Daftar dengan mengisi form dibawah.</h6>
                    </div>

                    <div class="form-label-group">
                        <input type="text" id="nickname" class="form-control" placeholder="Nickname" onChange={onChange} value={state.nickname} />
                        <label for="inputNickname">Nickname</label>
                    </div>
                    <div className='d-flex flex-wrap mb-3'>
                        <button className='btn btn-main my-auto' onClick={() => props.checkUsername(state.nickname)}>Check</button>
                        {state.isNicknameValid == false && <small className='text-danger my-auto ml-3'>Nickname already taken!</small>}
                        {state.isNicknameValid == true && <small className='text-success my-auto ml-3'>Nickname available.</small>}
                    </div>

                    <div class="form-label-group">
                        <input type="email" id="email" class="form-control" placeholder="Email address" onChange={onChange} value={state.email} />
                        <label for="inputEmail">Email address</label>
                    </div>

                    <div class="form-label-group">
                        <input type="password" id="password" class="form-control" placeholder="Password" onChange={onChange} value={state.password} />
                        <label for="inputPassword">Password</label>
                    </div>

                    <button class="btn btn-lg btn-main btn-block d-flex align-items-center justify-content-center" onClick={() => {
                        props.register(state.nickname, state.email, state.password, props.history)
                    }} disabled={!state.email || !state.nickname || !state.isNicknameValid || !state.password}>
                        {loading && <div class="spinner-border mr-3" style={{ width: '20px', height: '20px' }} role="status">
                            <span class="sr-only">Loading...</span>
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

export default Login