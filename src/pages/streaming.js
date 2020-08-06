import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getAnimeById } from '../../static/redux/Actions/anime'
import { getEpisodes } from '../../static/redux/Actions/episode'
import * as queryString from "query-string";
import ReactJWPlayer from 'react-jw-player';
import StarRatings from 'react-star-ratings'
import Slider from "react-slick";

import { SteamGame } from '../components/Cards/Index'
import { SEO, Layout, CommentSection } from '../components/Index'

const METHODS = require('../../static/constants/Methods')
const COLORS = require('../../static/constants/Colors')

const Streaming = (props) => {
    const { anime, episodes, recommendations } = props
    const [playlist, setPlaylist] = useState(null)
    const [current, setCurrent] = useState(null)
    const [state, setState] = useState({
        isTruncated: false, playlist: 'playlist_360', maxView: 4,
        list: []
    })

    var settings = {
        slidesToShow: 5,
        arrows: false,
        autoplay: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1700,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },

        ]
    };

    const onChangePlaylist = (e) => {
        setState({ ...state, playlist: e.target.value })
        getEpisodes(props.dispatch, anime?.[e.target.value])
    }

    useEffect(() => {
        getAnimeById(props.dispatch, queryString.parse(props.location.search).id)
    }, [])

    useEffect(() => {
        setState({ ...state, isTruncated: anime?.synopsis.length > 300 })
        getEpisodes(props.dispatch, anime?.[state.playlist])
    }, [anime])

    useEffect(() => {
        if (episodes) {
            if (props.location.state && window.jwplayer) {
                window.jwplayer().playlistItem(props.location.state.episode)
                setCurrent(episodes[props.location.state.episode])
            } else setCurrent(episodes[0])
        }
        setPlaylist(episodes)
        setState({ ...state, list: episodes?.slice(0, state.maxView) })
    }, [episodes])

    useEffect(() => {
        getEpisodes(props.dispatch, anime?.[state.playlist])
    }, [state.playlist])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={`${anime?.title} - Streaming`} />
            <div style={{ backgroundColor: COLORS.LIGHTSECONDARY }}>

                <div className='container-fluid px-10 pt-4'>
                    <div className='row'>
                        <div className='col-lg my-2'>
                            <div className='d-flex flex-wrap mb-3 align-items-center'>
                                <div className='mr-auto'>
                                    <div className='input-group'>
                                        <div className="input-group-prepend ">
                                            <span className="input-group-text text-white" style={{ backgroundColor: COLORS.MAIN }}><i className='fa fa-video' /></span>
                                        </div>
                                        <select className="form-control form-control-sm" onChange={onChangePlaylist} value={state.playlist}>
                                            <option value='playlist_360'>Playlist 360P</option>
                                            <option value='playlist_480' disabled={!anime?.playlist_480}>Playlist 480P</option>
                                            <option value='playlist_720' disabled={!anime?.playlist_720}>Playlist 720P</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <i className='fa fa-eye mx-2' />
                                    <i className='fa fa-heart mx-2' />
                                    <i className='fa fa-share mx-2' />
                                </div>
                            </div>
                            <ReactJWPlayer
                                playerId='streaming'
                                playerScript='https://cdn.jwplayer.com/libraries/OJReti3u.js'
                                playlist={anime?.[state.playlist]}
                                customProps={{ skin: { name: 'netflix' } }}
                            />
                            <small className='text-muted mx-2'>*Note : Jika Player Loading Saat Mengganti Episode, Tekan Episode Sekali Lagi.</small>
                            <div className='mt-4 d-flex flex-wrap align-items-center '>

                                <div className='mr-auto'>
                                    <h5 className='mb-0 text-main'>{anime?.title} {anime?.title_japan}</h5>
                                    <h1>{current?.title.replace(/360|480|720|/gi, "").replace('Eps', "Episode")}</h1>
                                    <h6>{current?.description}</h6>
                                </div>

                                <div className='ml-auto d-flex align-items-center'>
                                    <StarRatings
                                        rating={parseFloat(anime?.score || 0) / 2}
                                        starDimension="25px"
                                        starSpacing="10px"
                                        starRatedColor={COLORS.MAIN}
                                    />
                                    <div className='mx-4'>
                                        <small>Score</small>
                                        <h4 className='mb-0 font-weight-bold'>{anime?.score}</h4>
                                    </div>
                                </div>

                                <p className='mb-0 mt-4'>
                                    <strong className='text-main'>{anime?.title}, </strong>{state.isTruncated ? METHODS.text_truncate(anime?.synopsis, 300) : METHODS.text_truncate(anime?.synopsis)}
                                </p>
                                {state.isTruncated && <button className='btn btn-main mt-2' onClick={() => setState({ ...state, isTruncated: false })}>Show More</button>}
                            </div>

                            <div className='my-5'>
                                <Slider {...settings}>
                                    {recommendations?.map((anime, index) => (
                                        <SteamGame anime={anime} key={index} />
                                    ))}
                                </Slider>
                            </div>

                        </div>
                        <div className='col-lg-4 my-2'>
                            <div className='mb-4 mx-3'><i className='fa fa-list mr-2' />Episodes List</div>
                            {playlist?.slice(0, state.maxView).map((item, index) => (
                                <div className={`episode-card${current?.title === item.title ? '-active' : ''} shadow rounded-lg p-3 mx-3 my-3`} style={{ cursor: 'pointer' }} key={'eps' + item.title}
                                    onClick={() => {
                                        window.jwplayer().playlistItem(index)
                                        setCurrent(playlist[index])
                                    }}>
                                    <div className='row'>
                                        <div className='col-md-auto d-flex justify-content-center align-items-center'>
                                            <div>
                                                <img src={item.image} width='150px' className='rounded-lg shadow-lg' />
                                            </div>
                                        </div>
                                        <div className='col-md d-flex align-items-center'>
                                            <div>
                                                <small>{anime?.title_japan}</small><br />
                                                {current?.title === item.title && <small><strong className='text-secondary'><i className='fa fa-video mr-1' />Watching</strong><br /></small>}
                                                <h4 className='mb-1'>{item.title.replace(/360|480|720|/gi, "").replace(anime.title, "").replace('Eps', "Episode")}</h4>
                                                <h6>{item.description || 'Not Set'}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {playlist?.length > state.maxView &&  <button className='btn btn-main btn-block' onClick={() => setState({ ...state, maxView: state.maxView + 4 })}>View More</button>}
                        </div>
                    </div>
                </div>

                <div className='container-fluid'>
                    <CommentSection />
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
}), null)(Streaming)