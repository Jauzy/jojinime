import React from "react"
import { SEO, Layout } from '../components/Index'
import { Link } from 'gatsby'

const fourOFour = require('../images/404.svg')
const rocket = require('../images/rocket.svg')
const earth = require('../images/earth.svg')
const moon = require('../images/moon.svg')
const astronaut = require('../images/astronaut.svg')

const NotFoundPage = (props) => {
  return (
    <Layout navigate={props.navigate} noFooter={true}>
      <SEO title="404: Not found" />
      <div className="stars vh-100">
        <div className="central-body d-flex flex-column justify-content-center align-items-center">
          <img alt='404' className="image-404" src={fourOFour} width="300px" />
          <div><Link to='/' className='btn btn-main mt-3'>Go Back to Home</Link></div>
        </div>
        <div className="objects">
          <img className="object_rocket" alt='404rocket' src={rocket} width="40px" />
          <div className="earth-moon">
            <img className="object_earth" alt='404earth' src={earth} width="100px" />
            <img className="object_moon" alt='404moon' src={moon} width="80px" />
          </div>
          <div className="box_astronaut">
            <img className="object_astronaut" alt='404astrounout' src={astronaut} width="140px" />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
