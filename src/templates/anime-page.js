import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import { connect } from 'react-redux'
import StarRatings from 'react-star-ratings';
import { Link } from 'gatsby'
import axios from 'axios'

import { SteamGame } from '../components/Cards/Index'
import { ShareSection, EpisodeSection, Layout, SEO } from '../components/Index';
import { getAnimeById } from '../../static/redux/Actions/anime'
import { addToFav, removeFav } from '../../static/redux/Actions/user'

const METHODS = require('../../static/constants/Methods')
const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const AnimePage = (props) => {
    const { user, anime, recommendations, episodes } = props
    const [state, setState] = useState({
        isTruncated: false
    })
    const [playlist, setPlaylist] = useState(null)

    var settings = {
        slidesToShow: 4,
        arrows: false,
        autoplay: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    };

    useEffect(() => {
        getAnimeById(props.dispatch, props.pageContext.mongo_id)
        // getEpisodes(props.dispatch, props.pageContext.mongo_id)
    }, [props.location])

    useEffect(() => {
        setState({ ...state, isTruncated: anime?.synopsis.length > 300 })
        if (anime?.playlist_link) {
            axios.get('https://cdn.jwplayer.com/v2/playlists/6wK0AaDt').then(result => {
                setPlaylist(result.data.playlist)
            })
        }
    }, [anime])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={props.pageContext.title} />
            <div style={{ backgroundColor: COLORS.LIGHTSECONDARY }}>
                <div className='border' style={{ width: '100%' }}>
                    <img alt='banner' src={anime?.cover_image} style={{ objectFit: 'cover', width: '100%', maxHeight: '350px', filter: 'brightness(.4) contrast(1) blur(5px)' }} />
                </div>
                <div className='container' style={{ marginTop: '-15em' }}>
                    <div className='row'>
                        <div className='col-lg-3 d-flex justify-content-center'>
                            <SteamGame anime={anime} noLink={true} noLabel={true} />
                        </div>
                        <div className='col-lg d-flex'>
                            <div className='my-auto'>
                                <h1 className='mb-1 font-weight-bold'>{anime?.title}</h1>
                                <h3 className=''>{anime?.title_japan}</h3>
                                {anime?.genre?.map(item => (
                                    <Link className='btn btn-main m-1' key={item + '-genre'} to={ROUTES.SEARCHGENRE} state={{ genre: item }} >{item}</Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3 my-2'>
                            <div className='d-flex justify-content-center flex-wrap'>
                                <div className='w-100 p-2 text-center m-1' style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '50px' }}>{anime?.total_episode} Episodes</div>
                                <div className='w-100 p-2 text-center m-1' style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '50px' }}>{anime?.duration}</div>
                                <div className='w-100 p-2 text-center m-1' style={{ backgroundColor: COLORS.MAIN, borderRadius: '50px' }}>{anime?.status}</div>

                                {(!user?.favourite?.filter(item => item._id === anime?._id)[0] && user) &&
                                    <button className='btn btn-secondary btn-block m-1'
                                        style={{ borderRadius: '50px' }} onClick={() =>
                                            addToFav(props.dispatch, anime?._id)
                                        }><i className='fa fa-heart mr-2' />Add to Favourite</button>}

                                {user?.favourite?.filter(item => item._id === anime?._id)[0] &&
                                    <button className='btn btn-danger btn-block m-1'
                                        style={{ borderRadius: '50px' }} onClick={() =>
                                            removeFav(props.dispatch, anime?._id)
                                        }><i className='fa fa-heart mr-2' />Favourite</button>}

                            </div>
                        </div>
                        <div className='col-lg my-2' style={{ marginTop: '-0em' }}>
                            <div className='d-flex flex-wrap align-items-center'>
                                <StarRatings
                                    rating={parseFloat(anime?.score || 0) / 2}
                                    starDimension="40px"
                                    starSpacing="15px"
                                    starRatedColor={COLORS.MAIN}
                                />
                                <div className='mx-4'>
                                    <small>Score</small>
                                    <h4 className='mb-0 font-weight-bold'>{anime?.score}</h4>
                                </div>
                                <h2 className='ml-auto font-weight-bold'>{anime?.studio}</h2>
                            </div>
                            <p className='mb-0 mt-4'>
                                <strong className='text-main'>{anime?.title}, </strong>{state.isTruncated ? METHODS.text_truncate(anime?.synopsis, 300) : METHODS.text_truncate(anime?.synopsis)}
                            </p>
                            {state.isTruncated && <button className='btn btn-main mt-2' onClick={() => setState({ ...state, isTruncated: false })}>Show More</button>}

                            <EpisodeSection episodes={playlist}
                                batch_link={[
                                    { url: anime?.batch_360, quality: '360' },
                                    { url: anime?.batch_480, quality: '480' },
                                    { url: anime?.batch_720, quality: '720' }]}
                                anime={anime} />

                            <div className=''>
                                <Slider {...settings}>
                                    {recommendations?.map((anime, index) => (
                                        <SteamGame anime={anime} key={index} />
                                    ))}
                                </Slider>
                            </div>

                            <ShareSection title={anime?.title} location={props.location} />

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default connect(state => ({
    user: state.user.user,
    anime: state.anime.anime,
    episodes: state.episode.episodes,
    recommendations: state.anime.recommendations
}), null)(AnimePage)