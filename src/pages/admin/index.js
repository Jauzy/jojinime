import React, { useEffect, useState } from 'react'
import { Layout, SEO, InsertNewAnime, ScheduleManager, BrowseAnime } from '../../components/Index'
import { connect } from 'react-redux'
import { navigate } from 'gatsby'
import { DashboardSvg } from '../../components/SVG/Index'

const COLORS = require('../../../static/constants/Colors')

const AdminIndex = (props) => {
    const { user } = props

    const [state, setState] = useState({
        activeSection: 'Insert New Anime'
    })
    const sections = ['Insert New Anime', 'Schedule Manager', 'Browse Anime']

    useEffect(() => {
        if (user && !user?.admin) navigate('/')
    }, [user])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={`Admin ${user?.name || ''}`} />

            <div style={{ backgroundColor: COLORS.LIGHTSECONDARY }} className='pt-5'>
                <div className='text-white container-fluid'>
                    <div className='row d-flex' style={{ overflowX: 'hidden' }}>
                        <div className='col-md d-flex'>
                            <div className='m-auto'>
                                <h6>{user?.nickname} / Admin / <strong>{state.activeSection}</strong></h6>
                                <h4 className='mb-0'>Okaerinasai Admin-kun!</h4>
                                <h4 className='mb-0'>おかえりなさい あｄみんーくん!</h4>
                                <h1 className='font-weight-bold'>{user?.fullname || user?.nickname}</h1>
                            </div>
                        </div>
                        <div className='col-md-5 my-auto'>
                            <DashboardSvg />
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

            {state.activeSection === 'Insert New Anime' && <InsertNewAnime />}
            {state.activeSection === 'Schedule Manager' && <ScheduleManager />}
            {state.activeSection === 'Browse Anime' && <BrowseAnime />}

            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export default connect(state => ({
    user: state.user.user
}), null)(AdminIndex)