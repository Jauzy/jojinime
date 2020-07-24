/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min'

import './static/styles/cube-anime.css'
import './static/styles/floating-labels.css'
import './static/styles/font.css'
import './static/styles/goey-anime.css'
import './static/styles/index.css'
import './static/styles/override.css'
import './static/styles/photocard.css'

import JavascriptTimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ru)