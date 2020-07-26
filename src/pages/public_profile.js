import React, { useState, useEffect } from 'react'
import * as queryString from "query-string";
import { connect } from 'react-redux'
import { Layout, SEO, ListAnime } from '../components/Index'
import { getPublicUserData } from '../../static/redux/Actions/user'

const COLORS = require('../../static/constants/Colors')

const PublicProfile = props => {
    const { data, user } = props
    const [favouriteByName, setFav] = useState(null)
    const [state, setState] = useState({
        activeSection: 'Anime Favorit',
        list: [],
        full_list: [],
    })

    const sections = ['Anime Favorit', 'Tentang']

    useEffect(() => {
        getPublicUserData(props.dispatch, queryString.parse(props.location.search).id)
    }, [])

    useEffect(() => {
        if (user) {
            setFav(user.favourite.map(fav => (fav.name)))
        }
    }, [user])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.DARKSECONDARY}>
            <SEO title={user?.nickname || 'Public Profile'} />
            <div>
                <div style={{ background: COLORS.DARKSECONDARY }}>
                    <div className='border' style={{ background: COLORS.MAIN, width: '100%', height: '250px' }}>
                        {/* <img src={require('../../../Modules/images/1080p.png')} style={{ objectFit: 'cover', width: '100%', maxHeight: '250px' }} /> */}
                    </div>
                    <div className='container'>
                        <div className='row pb-4'>
                            <div className='col-md-auto d-flex'>
                                <img src={user?.profile_pict || "https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg"} style={{ marginTop: '-5em', background: COLORS.SECONDARY }} width="200" height="200" className="rounded-circle border mx-auto" />
                            </div>
                            <div className='col-md py-3'>
                                <h3 className='mb-0'>{user?.fullname || user?.nickname} <h style={{ fontSize: '20px' }} className='text-main'>@{user?.nickname}</h></h3>
                                <h6 className='text-main'>{user?.email}</h6>
                            </div>
                        </div>
                    </div>
                    <div className='container navs-main d-flex'>
                        <ul className="nav mr-auto">
                            {sections.map(item => (
                                <li className="nav-item " key={'section' + item} onClick={() => setState({ ...state, activeSection: item })}>
                                    <span className={"nav-link " + (state.activeSection === item ? 'active' : '')}>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <ul className='nav pb-2'>
                            <li className='nav-item mx-2'>
                                <button className='btn btn-main'>Add Friend</button>
                            </li>
                        </ul>
                    </div>
                    <hr style={{ borderTop: "1pt solid white" }} className='my-0' />
                </div>
                {state.activeSection == 'Anime Favorit' && <ListAnime list_anime={data.anime.edges.filter(anime => favouriteByName?.includes(anime.node.name))} custom_bg={COLORS.DARKSECONDARY} />}
                {state.activeSection == 'Tentang' && <div className='container py-5 text-white'>
                    <table className='mt-3' style={{ width: '100%' }}>
                        <tr>
                            <td><h4>Nickname</h4></td>
                            <td>
                                <h4>: <strong>{user?.nickname}</strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Nama Lengkap</h4></td>
                            <td>

                                <h4>:<strong> {user?.fullname}</strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Nomor Telepon</h4></td>
                            <td>
                                <h4>:<strong> {user?.phone_no}</strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Tentang</h4></td>
                            <td><h4>:<strong> {user?.about}</strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Tanggal Lahir</h4></td>
                            <td><h4>:<strong> {new Date(state.birth_date).toLocaleDateString()}</strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Email</h4></td>
                            <td><h4>: <strong>{user?.email}</strong></h4></td>
                        </tr>
                    </table>
                </div>}
            </div>
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

export default connect(state => ({
    user: state.user.public_user
}), null)(PublicProfile)