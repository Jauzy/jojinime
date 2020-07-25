/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import LoadingOverlay from 'react-loading-overlay';

import { Navbar, Footer, ChatWidget } from './Index'

const METHODS = require('../../static/constants/Methods')
const COLORS = require('../../static/constants/Colors')

const Spinner = (props) => {
  return (
    <div className='row'>
      <div className="gooey"></div>
    </div>
  )
}

const Layout = (props) => {
  const { navigate, children, navbarColor, loading, noFooter } = props

  useEffect(() => {
    // METHODS.disableF12()
  }, [])

  return (
    <div className='font-open-sans text-white' style={{ background: COLORS.DARKSECONDARY }}>
      <LoadingOverlay active={loading || false} spinner={<Spinner />}>
        <Navbar color={navbarColor} navigate={navigate} />
        <ChatWidget />
        {children}
        {!noFooter && <Footer />}
      </LoadingOverlay>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
