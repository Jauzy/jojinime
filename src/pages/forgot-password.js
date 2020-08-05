import React, { useState, useEffect } from 'react'
import * as queryString from "query-string";
import { Layout, SEO } from '../components/Index'
import { ForgotSvg } from '../components/SVG/Index'
import { sendResetPasswordEmail, resetPassword } from '../../static/redux/Actions/user'
import { Link } from 'gatsby'
import { connect } from 'react-redux'

const ROUTES = require('../../static/constants/Routes')
const COLORS = require('../../static/constants/Colors')

const ForgotPassword = props => {
    const [state, setState] = useState({
        email: '', password: '', repassword: '', sent: false
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const onSendEmail = () => {
        sendResetPasswordEmail(props.dispatch, state.email)
        setState({ ...state, sent: true })
    }

    const onSendReset = () => {
        resetPassword(props.dispatch, state.password, queryString.parse(props.location.search).verify)
        setState({ ...state, sent: true })
    }

    return (
        <Layout navigate={props.navigate}>
            <SEO title='Forgot Password' />
            <div className='container-fluid' style={{ overflowX: 'hidden' }}>
                <div className='row'>
                    <div className='col-md d-flex'>

                        {!queryString.parse(props.location.search).verify && <div className='m-auto d-flex flex-column'>
                            <h1 className='font-weight-bold'>Forgot Your Password ?</h1>
                            {!state.sent && <div>
                                <h6>Provide your email below so we can send reset password email to you.</h6>
                                <input type="email" id="email" className="form-control my-2" placeholder="Email" onChange={onChange} value={state.email} />
                                <button className='btn btn-main px-5 my-2' disabled={!state.email} onClick={onSendEmail}>Reset Now!</button>
                            </div>}
                            {state.sent && <div className='d-flex flex-column'>
                                <h6>Email sent, check your gmail for reset password instruction.</h6>
                                <Link className='btn btn-main px-5 my-2' to={ROUTES.HOME} >Go Back Home</Link>
                                <small>Our Email hasn't been reaching you yet? <strong style={{ cursor: 'pointer' }} onClick={() => setState({ ...state, sent: false })}>
                                    Resend Email.</strong>
                                </small>
                            </div>}
                        </div>}

                        {queryString.parse(props.location.search).verify && <div className='m-auto d-flex flex-column'>
                            <h1 className='font-weight-bold'>Reset Your Password</h1>
                            {!state.sent && <div className='d-flex flex-column'>
                                <h6>Enter your new password below to reset <strong>{queryString.parse(props.location.search).email}</strong> password.</h6>
                                <div className='row'>
                                    <div className='col-md'>
                                        <input type="password" id="password" className="form-control my-2" placeholder="Password" onChange={onChange} value={state.password} />
                                    </div>
                                    <div className='col-md'>
                                        <input type="password" id="repassword" className="form-control my-2" placeholder="Retype your Password" onChange={onChange} value={state.repassword} />
                                    </div>
                                </div>
                                {(state.password !== state.repassword) && <small className='text-danger'>Error : Password dont match!</small>}
                                <button className='btn btn-main px-5 my-2' disabled={!state.password || !state.repassword || state.password !== state.repassword} onClick={onSendReset}>Reset Now!</button>
                            </div>}
                            {state.sent && <div className='d-flex flex-column'>
                                <h6>Reset Password Success, to Continue Please Login.</h6>
                                <Link className='btn btn-main px-5 my-2' to={ROUTES.LOGINUSER} >Login</Link>
                            </div>}
                        </div>}

                    </div>
                    <div className='col-md'>
                        <ForgotSvg />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default connect(state => ({

}), null)(ForgotPassword)