import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { ListAnime, SEO, Layout } from '../components/Index'
import anime from 'animejs'
import { graphql } from 'gatsby'

const COLORS = require('../../static/constants/Colors')

const Ongoing = (props) => {
    const schedule = props.data?.schedule.edges
    const ongoing = props.data?.ongoing.edges.filter(item => item.node.childMarkdownRemark.frontmatter.status === 'On Going')
    const dayInAWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Random']

    useEffect(() => {

        anime({
            targets: '#anime-wrapper',
            translateX: [-1000, 0],
            duration: 2000
        });

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
                        {dayInAWeek.map((item, index) => (
                            <div style={{ width: '250px' }} className='my-2 mx-1 scheduleContainer' key={index + 'keyscheduleday'}>
                                <div className='text-center bg-secondary text-white rounded-lg pb-1' style={{ paddingTop: '10px' }}>
                                    <h6>{item}</h6>
                                </div>
                                <div className='text-center mt-2'>
                                    {schedule?.filter(({node}) => node.childMarkdownRemark.frontmatter.day === item)[0]?.node.childMarkdownRemark.frontmatter.animes?.map((item, index) => (
                                        <Link className='text-decoration-none text-white w-100' key={index + 'keyschedule'}>
                                            <div className='text-truncate btn btn-main mb-2 py-2 w-100'>
                                                {item}
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

export const query = graphql`
    {
        ongoing: allFile(filter: {relativeDirectory: {eq: "anime"}}) {
            edges {
                node {
                    name
                    childMarkdownRemark {
                        frontmatter {
                            title
                            cover_image
                            score
                            type
                            total_episode
                            status
                        }
                    }
                }
            }
        }
        schedule:allFile(filter: {relativeDirectory:{eq:"schedule"}}) {
            edges {
                node {
                    childMarkdownRemark {
                        frontmatter {
                            day
                            animes
                        }
                    }
                }
            }
        }
    }
`

export default Ongoing