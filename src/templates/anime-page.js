import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import Slider from "react-slick";
import axios from 'axios'

import JikanURL from '../../static/constants/jikanURL'

import { ShareSection, DetailsSection, EpisodeSection, Footer, Layout, SEO } from '../components/Index';

const COLORS = require('../../static/constants/Colors')

const AnimePage = (props) => {
    const { data } = props
    const [state, setState] = useState({
        loading: false, characters: null, detail: null, recommendation: null, episode_arr: null
    })

    const { characters, detail, recommendation, episodes_arr } = state

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

    const fetchData = async () => {
        const mal_id = data.anime.edges[0].node.childMarkdownRemark.frontmatter.mal_id
        console.log(mal_id)
        if (mal_id) {
            setState({ ...state, loading: true })
            const detail = await JikanURL.get(`https://api.jikan.moe/v4-alpha/anime/${mal_id}`)
            const characters = await JikanURL.get(`https://api.jikan.moe/v4-alpha/anime/${mal_id}/characters`)
            const recommendations = await JikanURL.get(`https://api.jikan.moe/v4-alpha/anime/${mal_id}/recommendations`)
            setState({
                ...state, loading: false,
                detail: detail.data.data,
                characters: characters.data.characters,
                recommendation: recommendations.data.data
            })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Layout location={props.location} path={props.path} navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY} loading={state.loading}>
            <SEO title={data.anime.edges[0].node.childMarkdownRemark.frontmatter.title} />
            <div className='shape-wave-top'></div>
            <div className='bg-dark container-lg' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }}>


                {/* Details */}
                <DetailsSection detail={detail} />

                {/* Characters */}
                {characters?.length > 4 && <div>
                    <div className='my-3 bg-secondary py-2 font-weight-bold rounded-lg text-center'>
                        Characters
                        </div>
                    <div className='bg-light p-3' style={{ borderTop: '5px solid ' + COLORS.MAIN, borderRadius: '20px' }}>
                        <Slider {...settings}>
                            {characters?.map((item, index) => (
                                <div className='' key={index + 'recommend'} style={{ width: '200px' }}>
                                    <div className='recommend-card'>
                                        <div className='bg-recommend text-truncate p-3 text-center text-white' style={{ width: '200px', height: '50px' }}></div>
                                        <div className='position-absolute text-truncate p-3 text-center text-white' style={{ width: '200px', bottom: '3px' }}>{item.name}</div>
                                        <img src={item.image_url} style={{ objectFit: 'cover', width: '200px', height: '280px' }} className='rounded-lg' />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>}

                {/* stream */}
                <EpisodeSection detail={detail} episodes={data.episode.edges} batch_link={props.batch_link} anime={data.anime.edges[0].node.childMarkdownRemark.frontmatter} />

                {/* share */}
                <ShareSection title={detail?.title} location={props.location} />

                {/* rekomendasi */}
                <div className='mb-3 bg-secondary py-2 font-weight-bold rounded-lg text-center'>
                    Rekomendasi Anime Lainnya
                    </div>
                <div className='bg-light p-3' style={{ borderTop: '5px solid ' + COLORS.MAIN, borderRadius: '20px' }}>
                    <Slider {...settings}>
                        {recommendation?.map((item, index) => (
                            <div className='' key={index + 'recommend'} style={{ width: '200px' }}>
                                <Link to={'/anime/' + item.mal_id} className='recommend-card'>
                                    <div className='bg-recommend text-truncate p-3 text-center text-white' style={{ width: '200px', height: '50px' }}></div>
                                    <div className='position-absolute text-truncate p-3 text-center text-white' style={{ width: '200px', bottom: '3px' }}>{item.title}</div>
                                    <img src={item.image_url} style={{ objectFit: 'cover', width: '200px', height: '280px' }} className='rounded-lg' />
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

export const query = graphql`
    query($title: String!){
        anime: allFile(filter: {relativeDirectory: {eq: "anime"}, childMarkdownRemark: {frontmatter: {title: {eq: $title}}}}) {
        edges {
            node {
            childMarkdownRemark {
                frontmatter {
                title
                mal_id
                status
                type
                }
            }
            name
            }
        }
        }
        episode: allFile(filter: {childMarkdownRemark: {frontmatter: {anime_title: {eq: $title}}}}) {
        edges {
            node {
            childMarkdownRemark {
                frontmatter {
                title
                status
                anime_title
                episode
                date_uploaded
                }
            }
            }
        }
        }
    }
`

export default AnimePage