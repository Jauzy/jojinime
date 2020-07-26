import React from "react"
import { SEO, Layout } from '../components/Index'
import { Link } from 'gatsby'

const NotFoundPage = (props) => {
  return (
    <Layout navigate={props.navigate} noFooter={true}>
      <SEO title="404: Not found" />
      <div className="stars vh-100">
        <div className="central-body d-flex flex-column justify-content-center align-items-center">
          <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
          <div><Link to='/' className='btn btn-main mt-3'>Go Back to Home</Link></div>
        </div>
        <div className="objects">
          <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
          <div className="earth-moon">
            <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
            <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
          </div>
          <div className="box_astronaut">
            <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
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
