/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import { NotificationContainer } from 'react-notifications';
import { ChatWidget } from './Index'
import { connect } from 'react-redux'

import { setupSocket } from "../../static/redux/Actions/utils";

//socket
import socketIOClient from "socket.io-client";

import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ru)

const ROUTES = require('../../static/constants/Routes')
const METHODS = require('../../static/constants/Methods')

const RootWrapper = (props) => {
    const { children, socket, dispatch, user} = props

    useEffect(() => {
        // METHODS.disableF12()
        if (!socket) {
            setupSocket(dispatch, socketIOClient(ROUTES.ENDPOINT))
        }
    }, [])

    return (
        <div className='font-open-sans text-white'>
            {user && <ChatWidget />}
            {children}
            <NotificationContainer />
        </div>
    )
}

export default connect(state => ({
    socket: state.utils.socket,
    user: state.user.user
}), null)(RootWrapper)