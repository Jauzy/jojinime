import React, {useState, useEffect} from 'react'
import { Link, graphql } from 'gatsby'
import Slider from "react-slick";

import { ShareSection, DetailsSection, EpisodeSection, Layout, SEO } from '../components/Index';

const COLORS = require('../../static/constants/Colors')
const USERACTION = require('../../static/constants/userAction')

const AnimePage = (props) => {
    const { data } = props
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        characters: null, detail: null, recommendation: null
    })
    const [user, setUser] = useState(null)
    const { characters, detail, recommendation } = state

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
        Promise.resolve(USERACTION.getUserData(setLoading)).then(value => {
            setUser(value)
        })
    }, [])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY} loading={loading}>
            <SEO title={data.anime.edges[0].node.childMarkdownRemark.frontmatter.title} />
            <div className='shape-wave-top'></div>
            <div className='bg-dark container-lg' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }}>

                {/* Details */}
                <DetailsSection detail={data.anime.edges[0].node.childMarkdownRemark?.frontmatter} name={data.anime.edges[0].node.name} user={user} 
                    setLoading={setLoading} setUser={setUser}
                />

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
                        {data.recommendations.edges?.map(({ node }, index) => (
                            <div className='' key={index + 'recommend'} style={{ width: '200px' }}>
                                <Link to={'/' + node.name} className='recommend-card'>
                                    <div className='bg-recommend text-truncate p-3 text-center text-white' style={{ width: '200px', height: '50px' }}></div>
                                    <div className='position-absolute text-truncate p-3 text-center text-white' style={{ width: '200px', bottom: '3px' }}>{node.childMarkdownRemark.frontmatter.title}</div>
                                    <img src={node.childMarkdownRemark.frontmatter.cover_image} style={{ objectFit: 'cover', width: '200px', height: '280px' }} alt='cover' className='rounded-lg' />
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
    query($title: String!, $genre: [String!]!){
        recommendations: allFile(filter: {relativeDirectory:{eq: "anime"}, childMarkdownRemark:{frontmatter:{genre:{in:$genre}, title: {ne:$title}}}}) {
            edges{
                node{
                    name
                    childMarkdownRemark{
                        frontmatter{
                            cover_image
                            title
                        }
                    }
                }
            }
        }
        anime: allFile(filter: {relativeDirectory: {eq: "anime"}, childMarkdownRemark: {frontmatter: {title: {eq: $title}}}}) {
            edges {
                node {
                childMarkdownRemark {
                    frontmatter {
                        cover_image
                        title
                        title_english
                        title_japan
                        rating
                        score
                        total_episode
                        duration
                        status
                        airing
                        studio
                        genre
                        type
                        synopsis
                        batch_360
                        batch_480
                        batch_720
                    }
                }
                name
                }
            }
        }
        episode: allFile(filter: {childMarkdownRemark: {frontmatter: {anime_title: {eq: $title}}}}) {
        edges {
            node {
                name
                childMarkdownRemark {
                    frontmatter {
                        title
                        status
                        anime_title
                        episode
                        date_uploaded(fromNow:true)
                    }
                }
            }
        }
        }
    }
`

export default AnimePage