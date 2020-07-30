import React, { useState, useEffect } from 'react'
import * as queryString from "query-string";
import { Layout, SEO } from '../components/Index'
import { DashboardSvg } from '../components/SVG/Index'
import { verifyEmail } from '../../static/redux/Actions/user'
import { connect } from 'react-redux'

const COLORS = require('../../static/constants/Colors')

const Email = props => {

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.DARKSECONDARY}>
            <SEO title='Email' />
            <div className='container-fluid' style={{ overflowX: 'hidden ' }}>
                <div className='row pt-5'>
                    <div className='col-md d-flex flex-column justify-content-center align-items-center'>
                        <h2 className='font-weight-bold'>Verify Email</h2>
                        <h1>{queryString.parse(props.location.search).email}</h1>
                        <button className='btn btn-main px-5 my-2' disabled={!queryString.parse(props.location.search).verify}
                            onClick={() => {
                                verifyEmail(props.dispatch, queryString.parse(props.location.search).verify)
                            }}>Verify Now!</button>
                        <small>*Note: If this is not your email or if you didn't do this, you can ignore this and proceed.</small>
                    </div>
                    <div className='col-md'>
                        <DashboardSvg />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default connect(state => ({

}), null)(Email)