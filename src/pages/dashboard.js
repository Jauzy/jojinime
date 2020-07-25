import React, { useState, useEffect } from 'react'

import profileSVG from '../../static/styles/images/profile.svg'
import { Layout, SEO, Favourite, Pengaturan } from '../components/Index'

const USERACTION = require('../../static/constants/userAction')
const COLORS = require('../../static/constants/Colors')

const Dashboard = props => {
    const { data } = props
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [favouriteByName, setFav] = useState(null)
    const [state, setState] = useState({
        activeSection: 'Profile'
    })
    const sections = ['Profile', 'Favorit', 'Pengaturan']

    useEffect(() => {
        Promise.resolve(USERACTION.getUserData(setLoading)).then(value => {
            setUser(value)
        })
    }, [])

    useEffect(() => {
        if (user) {
            setFav(user.favourite.map(fav => (fav.name)))
        }
    }, [user])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY} loading={loading} >
            <SEO title='Dashboard' />
            <div style={{ backgroundColor: COLORS.LIGHTSECONDARY }} className='pt-5'>
                <div className='text-white container'>
                    <div className='row d-flex'>
                        <div className='col-md my-auto'>
                            <h6>{user?.nickname} / Profile</h6>
                            <h4 className='mb-0'>Selamat Datang!</h4>
                            <h1 className='font-weight-bold'>{user?.fullname || user?.nickname}</h1>
                        </div>
                        <div className='col-md-5 my-auto'>
                            <img src={profileSVG} width='100%' />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: COLORS.LIGHTSECONDARY }} className='border-bottom'>
                <div className='container navs'>
                    <ul className="nav">
                        {sections.map(item => (
                            <li className="nav-item" key={'section-' + item} onClick={() => setState({ ...state, activeSection: item })}>
                                <span className={"nav-link " + (state.activeSection == item ? 'active' : '')}>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* {state.activeSection == 'Profile' && <Profile />} */}
            {state.activeSection == 'Favorit' && <Favourite list={data.anime.edges.filter(anime => favouriteByName?.includes(anime.node.name))} />}
            {state.activeSection == 'Pengaturan' && <Pengaturan />}

            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export const query = graphql`
{
    anime: allFile(filter: {relativeDirectory: {eq: "anime"}}) {
    edges {
        node {
        name
        childMarkdownRemark {
            frontmatter {
            title
            cover_image
            total_episode
            score
            }
        }
        }
    }
    }
}
`

export default Dashboard