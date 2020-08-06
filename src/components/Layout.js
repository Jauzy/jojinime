/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux'
import { Navbar, Footer } from './Index'

const COLORS = require('../../static/constants/Colors')

const Spinner = (props) => {
  return (
    <div className="gooey"></div>
  )
}

const Layout = (props) => {
  const { navigate, children, navbarColor, noFooter, noLoading } = props
  const { loading_user, loading_anime, loading_episode } = props

  return (
    <LoadingOverlay active={!noLoading ? loading_user || loading_anime || loading_episode || false : false} spinner={<Spinner />}>
      <Navbar color={navbarColor || COLORS.DARKSECONDARY} navigate={navigate} noHamburger={false} />
      {children}
      {!noFooter && <Footer />}
    </LoadingOverlay>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default connect(state => ({
  loading_user: state.user.loading,
  loading_anime: state.anime.loading,
  loading_episode: state.episode.loading,
}), null)(Layout)
