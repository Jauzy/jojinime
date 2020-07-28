import React, { useEffect } from 'react'
import { Link } from 'gatsby'
import Slider from "react-slick";
import { connect } from 'react-redux'

import { ShareSection, DetailsSection, EpisodeSection, Layout, SEO } from '../components/Index';
import { getAnimeById } from '../../static/redux/Actions/anime'

const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const AnimePage = (props) => {
    const { user, anime, recommendations} = props
    const episode = null

    var settings = {
        slidesToShow: 5,
        arrows: false,
        autoplay: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 750,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    useEffect(() => {
        getAnimeById(props.dispatch, props.pageContext.mongo_id)
    }, [props.location])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={props.pageContext.title} />
            <div className='shape-wave-top'></div>
            <div className='bg-dark container-lg' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }}>
                {/* Details */}
                <DetailsSection detail={anime} user={user} />

                {/* stream */}
                <EpisodeSection episodes={episode} batch_link={props.batch_link} anime={anime} />

                {/* share */}
                <ShareSection title={anime?.title} location={props.location} />

                {/* rekomendasi */}
                <div className='mb-3 bg-secondary py-2 font-weight-bold rounded-lg text-center'>
                    Rekomendasi Anime Lainnya
                    </div>
                <div className='bg-light p-3' style={{ borderTop: '5px solid ' + COLORS.MAIN, borderRadius: '20px' }}>
                    <Slider {...settings}>
                        {recommendations?.map((anime, index) => (
                            <div className='' key={index + 'recommend'} style={{ width: '200px' }}>
                                <Link to={`${ROUTES.ANIMEPAGE}?id=${anime._id}`} className='recommend-card'>
                                    <div className='bg-recommend text-truncate p-3 text-center text-white' style={{ width: '200px', height: '50px' }}></div>
                                    <div className='position-absolute text-truncate p-3 text-center text-white' style={{ width: '200px', bottom: '3px' }}>{anime.title}</div>
                                    <img src={anime.cover_image} style={{ objectFit: 'cover', width: '200px', height: '280px' }} alt='cover' className='rounded-lg' />
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>

            </div>
            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export default connect(state => ({
    user: state.user.user,
    anime: state.anime.anime,
    episodes: state.anime.episodes,
    recommendations: state.anime.recommendations
}), null)(AnimePage)