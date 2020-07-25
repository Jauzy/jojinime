import React from 'react'

import { Layout, SEO } from '../components/Index'

const jojiIMG = require("../../static/styles/images/crew/joji.jpg")
const putriIMG = require('../../static/styles/images/crew/putri.jpg')

const About = (props) => {
    const crew = [
        { name: 'Al Jauzy', img: jojiIMG, position: 'Fullstack Developer & Admin' },
        { name: 'Putri', img: putriIMG, position: 'Admin' },
    ]
    return (
        <Layout navigate={props.navigate} navbarColor={'transparent'}>
            <SEO title='About' />
            <div className='container py-5'>
                <h1 className='text-center text-white font-weight-bold'>OUR C<strong className='text-main'>RE</strong>W</h1>
                <div class="d-flex flex-wrap pt-5 justify-content-center">
                    {crew.map(person => (
                        <div class="card-photo">
                            <div class="imgBx">
                                <img src={person.img} alt="images" />
                            </div>
                            <div class="details">
                                <h2>{person.name}<br /><span>{person.position}</span></h2>
                            </div>
                        </div>
                    ))}
                    <div class="card-photo">
                        <div class="imgBx">
                            <img src='https://www.estrade.in/wp-content/uploads/2018/06/silhouette.jpg' alt='images' />
                        </div>
                        <div class="details">
                            <h2>TBA<br /><span>TBA</span></h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export default About