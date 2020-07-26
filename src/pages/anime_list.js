import React, { useEffect, useState } from 'react'
import anime from 'animejs'
import { Container } from 'reactstrap'
import { Link, graphql } from 'gatsby'
import { connect } from 'react-redux'
import { Layout, SEO } from "../components/Index"
import genres from '../../static/constants/Genres'

const aquaImg = require('../../static/styles/images/aqua.png')
const COLORS = require('../../static/constants/Colors')

const Combined = (props) => {
    const { user } = props
    const anime_list = props.data.allFile.edges
    const firstLetter = 'A B C D E F G H I J K L M N P Q R S T U V W X Y Z'

    useEffect(() => {
        anime({
            targets: '#anime-wrapper',
            translateX: [-1000, 0],
            duration: 2000
        });
    }, [])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title='Anime List' />
            <div className='shape-wave-top'></div>
            <Container>
                <div className='container bg-dark ' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }} id='anime-wrapper'>
                    <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4'>
                        <div className='row'>
                            <div className='col-lg'>
                                <div className='d-flex'>
                                    <div>
                                        <h4>Anime List Subtitle Indonesia</h4>
                                    </div>
                                </div>
                                <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                                <div className='d-flex flex-wrap justify-content-center mb-3'>
                                    <a className='btn btn-secondary m-1 p-0 d-flex' style={{ width: '25px', height: '25px', fontSize: 'auto' }} href='#Sec'>
                                        <small className='m-auto'>#</small>
                                    </a>
                                    {firstLetter.split(" ").map((item) => (
                                        <a className='btn btn-secondary m-1 p-0 d-flex' key={item + 'box'} style={{ width: '25px', height: '25px', fontSize: 'auto' }}
                                            href={'#' + item + '-section'}
                                        >
                                            <small className='m-auto'>{item}</small>
                                        </a>
                                    ))}
                                </div>

                                {firstLetter.split(" ").map(item => (
                                    <section className='px-3 font-open-sans' id={item + '-section'} key={item + '-section'}>
                                        <h6 className='text-left font-weight-bold'>{item}</h6>
                                        <hr style={{ borderWidth: '2px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />
                                        <ul className='two-column'>
                                            {anime_list?.filter(anime => anime.node.childMarkdownRemark.frontmatter.title.charAt(0) === item).map(({ node }) => (
                                                <small className='font-weight-bol' key={node.childMarkdownRemark.frontmatter.title}>
                                                    <li>
                                                        <Link className='text-decoration- text-white' to={`/${node.name}`}>{node.childMarkdownRemark.frontmatter.title}</Link>
                                                        {user?.favourite?.filter(item => item.name === node.name)[0] && <i className='fa fa-heart text-danger ml-1' style={{ fontSize: '10px' }} />}
                                                        {node.childMarkdownRemark.frontmatter.type === 'Movie' && <strong className='text-warning'> : Movie</strong>}
                                                        {node.childMarkdownRemark.frontmatter.status === 'Airing' && <strong className='text-primary'> : Ongoing</strong>}
                                                    </li>
                                                </small>
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                            <div className='col-lg-4'>
                                <div className=''>
                                    <div className='rounded-lg'>
                                        <img width='100%' src={aquaImg} style={{ objectFit: 'cover', marginBottom: '-100px' }} alt='aqua' />
                                    </div>
                                    <div className='p-3 bg-dark'>
                                        <h6>Genre:</h6>
                                        {genres.map((item) => (
                                            <Link className='btn btn-main m-1' key={item + '-genre'} to={`/search_genre`} state={{ genre: item }} >{item}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export const query = graphql`
    {
        allFile(filter: {relativeDirectory: {eq: "anime"}}) {
            edges {
                node {
                    childMarkdownRemark {
                        frontmatter {
                            status
                            title
                            type
                        }
                    }
                    name
                }
            }
        }
    }
`

export default connect(state => ({
    user: state.user.user
}), null)(Combined)