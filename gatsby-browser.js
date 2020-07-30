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

import './static/styles/widget/file-upload.scss'
import './static/styles/widget/chat.scss'
import './static/styles/widget/floating-labels.css'
import './static/styles/widget/share.css'

import './static/styles/page/404page.css'
import './static/styles/page/parallax_grid.css'
import './static/styles/page/footer.css'

import './static/styles/misc/cube-anime.css'
import './static/styles/misc/goey-anime.css'

import './static/styles/cards/hearthstone.scss'
import './static/styles/cards/photocard.css'
import './static/styles/cards/steam-game.scss'
import './static/styles/cards/steam-trade.scss'

import './static/styles/override.css'
import './static/styles/font.css'
import './static/styles/index.css'

import { loadProgressBar } from 'axios-progress-bar'
import bsCustomFileInput from 'bs-custom-file-input'

loadProgressBar()
bsCustomFileInput.init()

//redux
export { default as wrapRootElement } from './static/redux/ReduxWrapper';