import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'

import { SEO, Layout, DownloadSection, ShareSection, CommentSection } from '../components/Index'

const jojinimeIMG = require('../../static/styles/images/jojinime.png')
const COLORS = require('../../static/constants/Colors')

const Streaming = (props) => {
    const episode = props.data.episode.edges[0].node.childMarkdownRemark.frontmatter
    const [state, setState] = useState({

    })
    const { episode_id, total_episode } = state
    const [url, setUrl] = useState(episode?.stream_360.relativePath)

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title={`${episode?.title} - Streaming`} />
            <div className='shape-wave-top'></div>
            <div className='bg-dark container-lg pb-2' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }}>
                <div style={{ backgroundColor: COLORS.SECONDARY, borderRadius: '20px' }} className='px-4 pt-4 pb-3'>
                    <div className='d-flex'>
                        <div className='mr-auto'>
                            <h4>{episode?.title} Episode {episode?.ova ? `OVA ${episode.episode_ova}` : episode_id} Subtitle Indonesia</h4>
                            <h6 className='text-white'>{episode?.desc}</h6>
                            <small className='text-white'><i className='fa fa-user mr-2' />Posted by Admin <i className='fa fa-clock mx-2' /> {episode.date_uploaded}</small>
                        </div>
                    </div>
                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                    <div className='d-flex flex-wrap'>
                        <Link className='mr-auto' to={`/${props.data.anime.edges[0].node.name}`}><button className='btn btn-main m-1'>See All Eps.</button></Link>
                        {episode_id > 1 &&
                            <Link className='btn btn-main m-1' to={`/streaming/episode/${episode_id - 1}/${total_episode}`}>Prev Eps.</Link>
                        }
                        {episode_id < total_episode &&
                            <Link className='btn btn-main m-1' to={`/streaming/episode/${parseInt(episode_id) + 1}/${total_episode}`}>Next Eps.</Link>
                        }
                    </div>
                    <div className='mt-3'>
                        {url && <video width="100%" style={{ borderRadius: '20px' }} className='' key={url} controls>
                            <source src={require('../../static/content/' + url)} type="video/mp4" style={{ borderRadius: '20px' }} />
                                Your browser does not support HTML video.
                            </video>}
                    </div>
                    <div>
                        <div className='row mt-2 stream-quality'>
                            <div className='col-md'>
                                <button className='btn btn-secondary btn-block m-1' onClick={() => {
                                    setUrl(episode?.stream_360.relativePath)
                                }}><i className='fa fa-tv mr-2' />360P</button>
                            </div>
                            <div className='col-md'>
                                <button className='btn btn-main btn-block m-1' onClick={() => {
                                    setUrl(episode?.stream_480.relativePath)
                                }}><i className='fa fa-tv mr-2' />480P</button>
                            </div>
                            <div className='col-md'>
                                <button className='btn btn-danger btn-block m-1' onClick={() => {
                                    setUrl(episode?.stream_720.relativePath)
                                }}><i className='fa fa-tv mr-2' />720P</button>
                            </div>
                        </div>
                    </div>
                </div>

                <DownloadSection title={episode?.title}
                    video_360={require('../../static/content/' + episode?.stream_360.relativePath)} video_360_size={episode?.stream_360.size}
                    video_480={require('../../static/content/' + episode?.stream_480.relativePath)} video_480_size={episode?.stream_480.size}
                    video_720={require('../../static/content/' + episode?.stream_720.relativePath)} video_720_size={episode?.stream_720.size}
                />

                <ShareSection title={episode?.title} location={props.location} />


            </div>

            <CommentSection />

            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export const query = graphql`
    query($anime_title: String!){
        episode: allFile(filter: {relativeDirectory: {ne: "anime"}, childMarkdownRemark: {frontmatter: {anime_title: {eq: $anime_title}}}}) {
            edges {
                node {
                    name
                    childMarkdownRemark {
                        frontmatter {
                        title
                        anime_title
                        stream_360 {
                            relativePath
                            size
                        }
                        stream_480 {
                            relativePath
                            size
                        }
                        stream_720 {
                            relativePath
                            size
                        }
                        date_uploaded(fromNow: true)
                        }
                    }
                }
            }
        }
        anime: allFile(filter: {relativeDirectory: {eq: "anime"}, childMarkdownRemark: {frontmatter: {title: {eq: $anime_title}}}}) {
            edges {
                node {
                    name
                }
            }
        }
    }
`


export default Streaming