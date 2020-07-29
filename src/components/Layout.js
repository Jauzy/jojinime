/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import LoadingOverlay from 'react-loading-overlay';
import { NotificationContainer } from 'react-notifications';
import { connect } from 'react-redux'
import { Navbar, Footer, ChatWidget } from './Index'

const METHODS = require('../../static/constants/Methods')
const COLORS = require('../../static/constants/Colors')

const Spinner = (props) => {
  return (
    <div className="gooey"></div>
  )
}

const Layout = (props) => {
  const { navigate, children, navbarColor, noFooter, noLoading } = props
  const { loading_user, loading_anime } = props

  useEffect(() => {
    // METHODS.disableF12()
  }, [])

  return (
    <div className='font-open-sans text-white'>
      <LoadingOverlay active={!noLoading ? loading_user || loading_anime || false : false} spinner={<Spinner />}>
        <Navbar color={navbarColor} navigate={navigate} noHamburger={noFooter} />
        {/* <ChatWidget /> */}
        {children}
        {!noFooter && <Footer />}
        <NotificationContainer />
      </LoadingOverlay>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect(state => ({
  loading_user: state.user.loading,
  loading_anime: state.anime.loading
}), null)(Layout)
