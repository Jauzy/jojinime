import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { getAnimeById } from '../../static/redux/Actions/anime'
import * as queryString from "query-string";
import ReactTimeAgo from 'react-time-ago'
import ReactJWPlayer from 'react-jw-player';
import axios from 'axios'
import StarRatings from 'react-star-ratings'

import { SEO, Layout, DownloadSection, ShareSection, CommentSection } from '../components/Index'

const METHODS = require('../../static/constants/Methods')
const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const Streaming = (props) => {
    const { anime } = props
    const [playlist, setPlaylist] = useState(null)
    const [current, setCurrent] = useState(null)
    const [state, setState] = useState({
        isTruncated: false
    })

    useEffect(() => {
        getAnimeById(props.dispatch, queryString.parse(props.location.search).id)
    }, [])

    useEffect(() => {
        setState({ ...state, isTruncated: anime?.synopsis.length > 300 })
        if (anime?.playlist_link) {
            axios.get(anime?.playlist_link).then(result => {
                if (props.location.state) {
                    window.jwplayer().playlistItem(props.location.state.episode)
                    setCurrent(result.data.playlist[props.location.state.episode])
                } else setCurrent(result.data.playlist[0])
                setPlaylist(result.data.playlist)
            })
        }
    }, [anime])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={`${anime?.title} - Streaming`} />
            <div style={{ backgroundColor: COLORS.LIGHTSECONDARY }}>
                <div className='container-fluid px-10 pt-4'>
                    <div className='row'>
                        <div className='col-md-8 my-2'>
                            <ReactJWPlayer
                                playerId='streaming'
                                playerScript='https://cdn.jwplayer.com/libraries/OJReti3u.js'
                                playlist='https://cdn.jwplayer.com/v2/playlists/6wK0AaDt'
                                customProps={{ skin: { name: 'netflix' } }}
                            />
                            <small className='text-muted mx-2'>*Note : Jika Player Loading Saat Mengganti Episode, Tekan Episode Sekali Lagi.</small>
                            <div className='mt-4 d-flex flex-wrap align-items-center '>

                                <div className='mr-auto'>
                                    <h5 className='mb-0 text-main'>{anime?.title} {anime?.title_japan}</h5>
                                    <h1>{current?.title}</h1>
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
                        </div>
                        <div className='col-md my-2'>
                            <div className='mb-4 mx-3'><i className='fa fa-list mr-2' />Episodes List</div>
                            {playlist?.map((item, index) => (
                                <div className={`episode-card${current?.title === item.title ? '-active' : ''} shadow rounded-lg p-3 mx-3 my-2`} style={{ cursor: 'pointer' }} key={'eps' + item.title}
                                    onClick={() => {
                                        window.jwplayer().playlistItem(index)
                                        setCurrent(playlist[index])
                                    }}>
                                    <small>{anime?.title_japan}
                                        {current?.title === item.title && <strong className='text-secondary'><i className='fa fa-video mr-1 ml-2' />Watching</strong>}
                                    </small><br />
                                    <h4 className='mb-1'>{item.title}</h4>
                                    <h6>{item.description || 'Not Set'}</h6>
                                </div>
                            ))}
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
}), null)(Streaming)