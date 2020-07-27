import React, { useState, useEffect } from 'react'
import anime from 'animejs'
import { mainGenres, subGenres } from '../../../static/constants/Genres'
import { connect } from 'react-redux'
import { getAnimes } from '../../../static/redux/Actions/anime'

import { Layout, ListAnime, SEO } from '../../components/Index'
const COLORS = require('../../../static/constants/Colors')

const SearchGenre = props => {
    const { anime_list } = props
    const [state, setState] = useState({
        genre: props.location?.state?.genre || '', list: anime_list, full_list: anime_list,
        show: false
    })
    const { genre, list, full_list } = state

    useEffect(() => {
        anime({
            targets: '#anime-wrapper',
            translateX: [-1000, 0],
            duration: 2000
        });
        getAnimes(props.dispatch)
    }, [])

    useEffect(() => {
        if (genre && genre !== '')
            setState({ ...state, list: full_list?.filter(item => item.genre?.includes(genre)) })
        else
            setState({ ...state, list: full_list })
    }, [genre])

    useEffect(() => {
        if (anime_list) {
            if (genre && genre !== '')
                setState({ ...state, list: anime_list.filter(item => item.genre?.includes(genre)), full_list: anime_list })
            else
                setState({ ...state, list: anime_list, full_list: anime_list })
        }
    }, [anime_list])

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

                    <div className='btn btn-secondary btn-block'>
                        Main Genres List
                    </div>
                    <div className='d-flex flex-wrap mt-3 justify-content-center'>
                        {mainGenres.map((item) => (
                            <button className='btn btn-main m-1 px-3' key={item + '-genre'} onClick={() => setState({ ...state, genre: item })} >{item}</button>
                        ))}
                    </div>

                    <div className='btn btn-secondary btn-block mt-3' onClick={() => {
                        setState({ ...state, show: !state.show })
                    }}>
                        Show Sub Genres List
                    </div>
                    {state.show && <div className='d-flex flex-wrap mt-3 justify-content-center'>
                        {subGenres.map((item) => (
                            <button className='btn btn-main m-1 px-3' key={item + '-genre'} onClick={() => setState({ ...state, genre: item })} >{item}</button>
                        ))}
                    </div>}

                </div>
                <ListAnime title={'Anime List Genre ' + genre + ' Subtitle Indonesia'} list_anime={list} />
            </div>
            <div className='shape-wave-bottom'></div>
        </Layout>
    )
}

export default connect(state => ({
    user: state.user.user,
    anime_list: state.anime.animes
}), null)(SearchGenre)