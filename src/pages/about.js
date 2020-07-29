import React from 'react'
import { Layout, SEO } from '../components/Index'
import { ReactSvg } from '../components/SVG/Index'

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
                <div style={{ fontSize: '10vw' }} className='text-center font-weight-bold mb-5'>JOJINIME<strong className='text-main'>.</strong></div>
                <h1 className='text-center text-white font-weight-bold'>ABOUT <strong className='text-main'>US</strong></h1>
                <p className='text-center'>
                    Jojinime adalah web streaming dan download anime non profit yang dibuat berdasarkan motivasi terwujudnya Web Anime yang Canggih, Cepat, juga tanpa Iklan dan ClickBait yang mengganggu <em className='text-secondary'>(*dari pengalaman developer)</em>. Web ini menggunakan direct link tanpa link shortener pada link downloadnya, sehingga user dapat lebih mudah untuk mendownload anime.
                </p>

                <h1 className='text-center text-white font-weight-bold mt-5 mb-3'>OUR C<strong className='text-main'>RE</strong>W</h1>
                <div className="d-flex flex-wrap justify-content-center">
                    {crew.map(person => (
                        <div className="card-photo my-2" key={person.name}>
                            <div className="imgBx">
                                <img src={person.img} alt="images" />
                            </div>
                            <div className="details">
                                <h2>{person.name}<br /><span>{person.position}</span></h2>
                            </div>
                        </div>
                    ))}
                    <div className="card-photo my-2">
                        <div className="imgBx">
                            <img src='https://www.estrade.in/wp-content/uploads/2018/06/silhouette.jpg' alt='images' />
                        </div>
                        <div className="details">
                            <h2>TBA<br /><span>TBA</span></h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container-fluid' style={{ overflowX: 'hidden', marginBottom:'-20px'}}>
                <div className='row'>
                    <div className='col-md d-flex'>
                        <div className='m-auto'>
                            <h1 className='text-center text-white font-weight-bold'>WEBSITE <strong className='text-main'>SPEC</strong></h1>
                            <div className='d-flex justify-content-center mt-3 flex-wrap'>
                                <img src='https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png' alt='logo' style={{ maxHeight: '100px' }} />
                                <img src='https://javascriptforwp.com/wp-content/uploads/2019/03/badge-gatsby.png' alt='logo' style={{ maxHeight: '100px' }} />
                                <img src='https://www.syntapse.co.uk/sites/default/files/inline-images/mongo%20logo_0.png' alt='logo' style={{ maxHeight: '100px' }} />
                                <img src='https://onelittledesigner.com/wp-content/uploads/2016/06/Font-Awesome-Free.png' alt='logo' style={{ maxHeight: '100px' }} />
                                <img src='https://seeklogo.com/images/N/nodejs-logo-FBE122E377-seeklogo.com.png' alt='logo' style={{ maxHeight: '100px' }} />
                            </div>
                            <h5 className='text-center my-3'>Five Horsement of Best Website Development</h5>
                        </div>
                    </div>
                    <div className='col-md-5'>
                        <ReactSvg />
                    </div>
                </div>
            </div>

            {/* <div className='shape-wave-bottom'></div> */}
        </Layout>
    )
}

export default About