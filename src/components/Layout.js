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

const aquaImg = require('../../static/styles/images/aqua.png')
const Spinner = (props) => {
  return (
      <div className='row'>
          <div className="gooey"></div>
      </div>
  )
}

const Layout = (props) => {
  const { location, navigate, path, children, navbarColor, loading } = props

  const blackList = [
    '/'
  ]

  useEffect(() => {
    console.log(props)
    // METHODS.disableF12()
  }, [])

  return (
    <div className='font-open-sans text-white' style={{ background: COLORS.DARKSECONDARY }}>
      <LoadingOverlay active={loading || false} spinner={<Spinner />}>
        <Navbar color={navbarColor} navigate={navigate} />
        <ChatWidget />
        {children}
        {!blackList.includes(location?.pathname) && <Footer />}
      </LoadingOverlay>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
