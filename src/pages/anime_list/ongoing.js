import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import { ListAnime, SEO, Layout } from '../../components/Index'
import anime from 'animejs'
import { connect } from 'react-redux'
import { getOngoing } from '../../../static/redux/Actions/anime'
import { getFullSchedule } from '../../../static/redux/Actions/schedule'

const COLORS = require('../../../static/constants/Colors')
const ROUTES = require('../../../static/constants/Routes')

const Ongoing = (props) => {
    const { ongoing, schedules } = props
    const dayInAWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Random']

    useEffect(() => {

        anime({
            targets: '#anime-wrapper',
            translateX: [-1000, 0],
            duration: 2000
        });
        getOngoing(props.dispatch)
        getFullSchedule(props.dispatch)
    }, [])

    return (
        <Layout navigate={props.navigate} navbarColor={'transparent'}>
            <SEO title='Ongoing List' />
            <div className='container bg-dark mt-4' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }} id='anime-wrapper'>
                <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4 '>
                    <div className='d-flex'>
                        <div>
                            <h4>Jadwal Rilis Anime Serial TV</h4>
                            <h6 className='text-white'>TV Anime Release Schedule</h6>
                        </div>
                    </div>
                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />
                    
                    <div className='d-flex flex-wrap justify-content-center'>
                        {dayInAWeek.map((day, index) => (
                            <div style={{ width: '250px' }} className='my-2 mx-1 scheduleContainer' key={index + 'keyscheduleday'}>
                                <div className='text-center bg-secondary text-white rounded-lg pb-1' style={{ paddingTop: '10px' }}>
                                    <h6>{day}</h6>
                                </div>
                                <div className='text-center mt-2'>
                                    {schedules?.filter(schedule => schedule.day === day)?.map(({anime}, index) => (
                                        <Link className='text-decoration-none text-white w-100' to={ROUTES.ANIMEPAGE+`?id=${anime._id}`} key={anime.title + 'keyschedule'}>
                                            <div className='text-truncate btn btn-main mb-2 py-2 w-100'>
                                                {anime.title}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <ListAnime title='Ongoing Anime List Subtitle Indonesia' list_anime={ongoing} />
            </div>
            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export default connect(state => ({
    user: state.user.user,
    ongoing: state.anime.animes,
    schedules: state.schedule.schedules
}), null)(Ongoing)