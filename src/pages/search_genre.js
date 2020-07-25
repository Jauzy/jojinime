import React, { useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import anime from 'animejs'

import { Layout, ListAnime, SEO } from '../components/Index'
const COLORS = require('../../static/constants/Colors')

const SearchGenre = props => {
    const [state, setState] = useState({
        genre: props.location?.state?.genre || '', list: props.data.anime.edges, full_list: props.data.anime.edges
    })
    const { genre, list, full_list } = state

    const genres = [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Slice of Life",
        "Fantasy",
        "Magic",
        "Supernatural",
        "Horror",
        "Mystery",
        "Game",
        "Pyschological",
        "Romance",
        "Sci-Fi",
        "Harem",
        "Ecchi",
        "Mecha",
        "School",
    ]

    useEffect(() => {
        anime({
            targets: '#anime-wrapper',
            translateX: [-1000, 0],
            duration: 2000
        });
    }, [])

    useEffect(() => {
        if (genre && genre !== '')
            setState({ ...state, list: full_list.filter(item => item.node.childMarkdownRemark.frontmatter.genre?.includes(genre)) })
        else
            setState({ ...state, list: full_list })
    }, [genre])

    return (
        <Layout navigate={props.navigate} navbarColor={'transparent'}>
            <SEO title={genre || 'Genre List'} />
            <div className='container bg-dark mt-4' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }} id='anime-wrapper'>
                <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4 '>
                    <div className='d-flex'>
                        <div>
                            <h4>Search Anime By Genre</h4>
                            <h6 className='text-white'>Genre Searched: <strong>{genre}</strong></h6>
                        </div>
                    </div>
                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                    <Link className='btn btn-secondary btn-block' to={`/list`}>
                        List Genre
                    </Link>
                    <div className='d-flex flex-wrap justify-content-center mt-3'>
                        {genres.map((item) => (
                            <button className='btn btn-main m-1' key={item + '-genre'} onClick={() => setState({ ...state, genre: item })} >{item}</button>
                        ))}
                    </div>
                </div>
                <ListAnime title={'Anime List Genre ' + genre + ' Subtitle Indonesia'} list_anime={list} />
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
                            genre
                        }
                    }
                }
            }
        }
    }
`

export default SearchGenre