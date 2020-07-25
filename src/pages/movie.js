import React, { useEffect } from 'react'
import anime from 'animejs'

import { graphql } from 'gatsby'
import { ListAnime, SEO, Layout } from '../components/Index'

const Movie = (props) => {
    const movie = props.data.movie.edges.filter(item => item.node.childMarkdownRemark.frontmatter.type === 'Movie')
    useEffect(() => {

        anime({
            targets: '#anime-wrapper',
            translateX: [-1000, 0],
            duration: 2000
        });

    }, [])

    return (
        <Layout navigate={props.navigate} navbarColor={'transparent'}>
            <SEO title='Movie List' />
            <div className='container bg-dark ' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black' }} id='anime-wrapper'>
                <ListAnime title='Anime Movie List Subtitle Indonesia' list_anime={movie} />
            </div>
            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export const query = graphql`
    {
        movie: allFile(filter: {relativeDirectory: {eq: "anime"}}) {
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
                        }
                    }
                }
            }
        }
    }
`

export default Movie