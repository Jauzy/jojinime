import React, { useState, useEffect } from 'react'
import * as queryString from "query-string";
import { connect } from 'react-redux'
import { Layout, SEO, ListAnime } from '../../components/Index'
import { getPublicUserData } from '../../../static/redux/Actions/user'

const COLORS = require('../../../static/constants/Colors')

const PublicProfile = props => {
    const { user } = props
    const [state, setState] = useState({
        activeSection: 'Anime Favorit',
        list: [],
        full_list: [],
    })

    const sections = ['Anime Favorit', 'Tentang']

    useEffect(() => {
        getPublicUserData(props.dispatch, queryString.parse(props.location.search).id)
    }, [])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.DARKSECONDARY}>
            <SEO title={user?.nickname || 'Public Profile'} />
            <div>
                <div style={{ background: COLORS.DARKSECONDARY }}>
                    <div className='border' style={{ background: COLORS.MAIN, width: '100%', height: '250px' }}>
                        <img alt='banner' src={user?.public_banner || require('../../images/1080p.png')} style={{ objectFit: 'cover', width: '100%', maxHeight: '250px' }} />
                    </div>
                    <div className='container'>
                        <div className='row pb-4'>
                            <div className='col-md-auto d-flex'>
                                <img alt='profile_pict' src={user?.profile_pict || "https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg"}
                                    style={{ marginTop: '-5em', background: COLORS.SECONDARY }} width="200" height="200" className="rounded-circle border mx-auto" />
                            </div>
                            <div className='col-md py-3'>
                                <h3 className='mb-2'>{user?.fullname || user?.nickname}
                                    {user?.verified && <i className=' ml-2 mr-3 fa fa-check btn-main p-1 rounded-circle' style={{ fontSize: '17px' }} />}
                                    <h style={{ fontSize: '20px' }} className='text-main'>@{user?.nickname}</h>
                                </h3>
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
                                <button className='btn btn-main' disabled>Add Friend</button>
                            </li>
                        </ul>
                    </div>
                    <hr style={{ borderTop: "1pt solid white" }} className='my-0' />
                </div>
                {state.activeSection == 'Anime Favorit' && <ListAnime list_anime={user?.favourite} custom_bg={COLORS.DARKSECONDARY} />}
                {state.activeSection == 'Tentang' && <div className='container py-5 text-white'>
                    <table className='mt-3' style={{ width: '100%' }}>
                        <tr>
                            <td><h4>Nickname</h4></td>
                            <td>
                                <h4>: <strong>{user?.nickname}</strong></h4>
                            </td>
                        </tr>
                        {user?.fullname && <tr>
                            <td><h4>Nama Lengkap</h4></td>
                            <td>

                                <h4>:<strong> {user?.fullname}</strong></h4>
                            </td>
                        </tr>}
                        {user?.phone_no && <tr>
                            <td><h4>Nomor Telepon</h4></td>
                            <td>
                                <h4>:<strong> {user?.phone_no}</strong></h4>
                            </td>
                        </tr>}
                        {user?.about && <tr>
                            <td><h4>Tentang</h4></td>
                            <td><h4>:<strong> {user?.about}</strong></h4>
                            </td>
                        </tr>}
                        {user?.birth_date && <tr>
                            <td><h4>Tanggal Lahir</h4></td>
                            <td><h4>:<strong> {new Date(user.birth_date).toLocaleDateString()}</strong></h4>
                            </td>
                        </tr>}
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

export default connect(state => ({
    user: state.user.public_user
}), null)(PublicProfile)