import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { getEpisode } from '../../static/redux/Actions/episode'
import * as queryString from "query-string";
import ReactTimeAgo from 'react-time-ago'

import { SEO, Layout, DownloadSection, ShareSection, CommentSection } from '../components/Index'

const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const Streaming = (props) => {
    const { episode } = props
    const [url, setUrl] = useState(null)

    useEffect(() => {
        getEpisode(props.dispatch, queryString.parse(props.location.search).id)
    }, [])

    useEffect(() => {
        if (episode) {
            setUrl(episode.stream_360)
        }
    }, [episode])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={`${episode?.title} - Streaming`} />
            <div className='shape-wave-top'></div>
            <div className='bg-dark container-lg pb-2' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }}>
                <div style={{ backgroundColor: COLORS.SECONDARY, borderRadius: '20px' }} className='px-4 pt-4 pb-3'>
                    <div className='d-flex'>
                        <div className='mr-auto mb-2'>
                            <h4>{episode?.anime.title} {episode?.title} Subtitle Indonesia</h4>
                            <h6 className='text-white'>{episode?.desc}</h6>
                            <small className='text-white'><i className='fa fa-user mr-2' />Posted by Admin {episode?.admin?.nickname}
                                <i className='fa fa-clock ml-3 mr-1' /> <ReactTimeAgo date={new Date(episode?.date_uploaded)} />
                            </small>
                        </div>
                    </div>
                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                    <div className='d-flex flex-wrap'>
                        <Link className='mr-auto' to={ROUTES.ANIMEPAGE+`?id=${episode?.anime._id}`}><button className='btn btn-main m-1'>See All Eps.</button></Link>
                    </div>
                    <div className='mt-3'>
                        {url && <video width="100%" style={{ borderRadius: '20px' }} className='' key={url} controls>
                            <source src={url} type="video/mp4" style={{ borderRadius: '20px' }} />
                                Your browser does not support HTML video.
                            </video>}
                    </div>
                    <div>
                        <div className='row mt-2 stream-quality'>
                            <div className='col-md'>
                                <button className='btn btn-secondary btn-block m-1' onClick={() => {
                                    setUrl(episode?.stream_360)
                                }}><i className='fa fa-tv mr-2' />360P</button>
                            </div>
                            <div className='col-md'>
                                <button className='btn btn-main btn-block m-1' onClick={() => {
                                    setUrl(episode?.stream_480)
                                }}><i className='fa fa-tv mr-2' />480P</button>
                            </div>
                            <div className='col-md'>
                                <button className='btn btn-danger btn-block m-1' onClick={() => {
                                    setUrl(episode?.stream_720)
                                }}><i className='fa fa-tv mr-2' />720P</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <DownloadSection title={episode?.title}
                    video_360={null}
                    video_480={null}
                    video_720={null}
                /> */}

                <ShareSection title={episode?.anime.title + ' ' +episode?.title} location={props.location} />


            </div>

            <CommentSection />

            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export default connect(state => ({
    episode: state.episode.episode
}), null)(Streaming)