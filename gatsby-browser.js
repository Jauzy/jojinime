/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-notifications/lib/notifications.css';

import './static/styles/login.scss'
import './static/styles/chat.scss'
import './static/styles/404page.css'
import './static/styles/cube-anime.css'
import './static/styles/floating-labels.css'
import './static/styles/font.css'
import './static/styles/goey-anime.css'
import './static/styles/index.css'
import './static/styles/override.css'
import './static/styles/photocard.css'

import { loadProgressBar } from 'axios-progress-bar'
loadProgressBar()

//redux
export { default as wrapRootElement } from './static/redux/ReduxWrapper';