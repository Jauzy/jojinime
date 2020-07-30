import React, { useEffect } from 'react'
import anime from 'animejs'
import { connect } from 'react-redux'
import { getMovies } from '../../../static/redux/Actions/anime'
import { ListAnime, SEO, Layout } from '../../components/Index'

const Movie = (props) => {
    const { movie } = props
    useEffect(() => {
        anime({
            targets: '#anime-wrapper',
            translateX: [-1000, 0],
            duration: 2000
        });
        getMovies(props.dispatch)
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

export default connect(state => ({
    user: state.user.user,
    movie: state.anime.animes
}), null)(Movie)