import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

import { SEO, Layout } from '../components/Index'

const COLORS = require('../../static/constants/Colors')

const SearchAnime = props => {
    const [state, setState] = useState({
        list: props.data.anime.edges, full_list: props.data.anime.edges, search: props.location?.state
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        setState({ ...state, list: state.full_list.filter(item => item.node.childMarkdownRemark.frontmatter.title?.toLowerCase().includes(state.search?.toLowerCase())) })
    }, [state.search])

    useEffect(() => {
        if (search) {
            setState({ ...state, search })
        }
    }, [search])

    return (
        <Layout location={props.location} path={props.path} navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title='Search Anime' />

            <div className='shape-wave-top'></div>
            <div className='container bg-dark' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black', marginBottom: '150px' }}>
                <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4 '>
                    <div className='d-flex'>
                        <div>
                            <h4>Search Anime</h4>
                            <h5>Judul Dicari : <strong>{state.search}</strong></h5>
                        </div>
                        <i className='fa fa-eye ml-auto my-auto' />
                    </div>
                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />
                    <button className='btn btn-secondary btn-block' style={{ cursor: 'unset' }}>Hasil Pencarian</button>
                    <div className='d-flex my-3'>
                        <label className='ml-auto mr-3 my-auto'>Search by Title</label>
                        <div style={{ maxWidth: '300px' }}>
                            <div className='input-group'>
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i className='fa fa-search' /></div>
                                </div>
                                <input type="text" class={"form-control bg-dark text-white"} id='search' onChange={onChange} value={state.search} />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center flex-wrap'>
                        {state.list?.map(({ node }, index) => (
                            <div className='my-3' key={index + 'recommend'} style={{ width: '200px', fontSize: '14px' }}>
                                <Link to={'/' + node.name} className='recommend-card-2 text-white'>
                                    <div className='position-absolute py-1 px-3 bg-dark' style={{ opacity: '.6' }}><i className='fa fa-eye mr-2' />{node.childMarkdownRemark.frontmatter.total_episode} Episode</div>
                                    <div className='position-absolute py-1 px-3'><i className='fa fa-eye mr-2' />{node.childMarkdownRemark.frontmatter.total_episode} Episode</div>
                                    <div className='position-absolute py-1 px-3 bg-dark' style={{ marginTop: '35px', opacity: '.6' }}><i className='fa fa-star mr-2' />{node.childMarkdownRemark.frontmatter.score}</div>
                                    <div className='position-absolute py-1 px-3' style={{ marginTop: '35px' }}><i className='fa fa-star mr-2' />{node.childMarkdownRemark.frontmatter.score}</div>
                                    <div className='bg-recommend text-truncate text-white bg-dark p-2 text-center' style={{ width: '180px', marginTop: '225px' }}>{node.childMarkdownRemark.frontmatter.title}</div>
                                    <div className='position-absolute text-truncate text-white p-2 text-center' style={{ width: '180px', marginTop: '225px' }}>{node.childMarkdownRemark.frontmatter.title}</div>
                                    <img src={node.childMarkdownRemark.frontmatter.cover_image} style={{ objectFit: 'cover', width: '180px', height: '260px' }} className='rounded-lg' />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export const query = graphql`
    {
        anime: allFile(filter: {relativeDirectory: {eq: "anime"}}) {
        edges {
            node {
                name
                childMarkdownRemark {
                    frontmatter {
                            title
                            cover_image
                            total_episode
                            status
                            score
                        }
                    }
                }
            }
        }
    }
`

export default SearchAnime