import React from "react"
import { SEO, Layout } from '../components/Index'
import { Link } from 'gatsby'

const NotFoundPage = (props) => {
  return (
    <Layout navigate={props.navigate} noFooter={true}>
      <SEO title="404: Not found" />
      <div class="stars vh-100">
        <div class="central-body d-flex flex-column justify-content-center align-items-center">
          <img class="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
          <div><Link to='/' className='btn btn-main mt-3'>Go Back to Home</Link></div>
        </div>
        <div class="objects">
          <img class="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
          <div class="earth-moon">
            <img class="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
            <img class="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
          </div>
          <div class="box_astronaut">
            <img class="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
          </div>
        </div>
        <div class="glowing_stars">
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
