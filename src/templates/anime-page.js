import React, { useEffect } from 'react'
import Slider from "react-slick";
import { connect } from 'react-redux'

import { SteamGame } from '../components/Cards/Index'
import { ShareSection, DetailsSection, EpisodeSection, Layout, SEO } from '../components/Index';
import { getAnimeById } from '../../static/redux/Actions/anime'
import { getEpisodes } from '../../static/redux/Actions/episode'

const COLORS = require('../../static/constants/Colors')

const AnimePage = (props) => {
    const { user, anime, recommendations, episodes} = props

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
                    slidesToShow: 2,
                }
            }
        ]
    };

    useEffect(() => {
        getAnimeById(props.dispatch, props.pageContext.mongo_id)
        getEpisodes(props.dispatch, props.pageContext.mongo_id)
    }, [props.location])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={props.pageContext.title} />
            <div className='shape-wave-top'></div>
            <div className='bg-dark container-lg' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }}>
                {/* Details */}
                <DetailsSection detail={anime} user={user} />

                {/* stream */}
                <EpisodeSection episodes={episodes}
                    batch_link={[
                        { url: anime?.batch_360, quality: '360' },
                        { url: anime?.batch_480, quality: '480' },
                        { url: anime?.batch_720, quality: '720' }]}
                    anime={anime} />

                {/* share */}
                <ShareSection title={anime?.title} location={props.location} />

                {/* rekomendasi */}
                <div className='mb-3 bg-secondary py-2 font-weight-bold rounded-lg text-center'>
                    Rekomendasi Anime Lainnya
                    </div>
                <div className='bg-light' style={{ borderTop: '5px solid ' + COLORS.MAIN, borderRadius: '20px' }}>
                    <Slider {...settings}>
                        {recommendations?.map((anime, index) => (
                            <SteamGame anime={anime} className='mx-auto' />
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
    episodes: state.episode.episodes,
    recommendations: state.anime.recommendations
}), null)(AnimePage)