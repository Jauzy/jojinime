import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { getAnimes } from '../../../static/redux/Actions/anime'
import { SEO, Layout, ListAnime} from '../../components/Index'

const COLORS = require('../../../static/constants/Colors')

const SearchAnime = props => {
    const { anime_list } = props
    const [state, setState] = useState({
        list: anime_list, full_list: anime_list, search: props.location?.state?.search || ''
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        setState({ ...state, list: state?.full_list?.filter(item => item.title?.toLowerCase().includes(state.search?.toLowerCase())) })
    }, [state.search])

    useEffect(() => {
        if (anime_list) {
            if (state.search && state.search !== '')
                setState({ ...state, list: anime_list.filter(item => item.title?.toLowerCase().includes(state.search?.toLowerCase())), full_list: anime_list })
            else
                setState({ ...state, list: anime_list, full_list: anime_list })
        }
    }, [anime_list])

    useEffect(() => {
        getAnimes(props.dispatch)
    }, [])

    return (
        <Layout navigate={props.navigate} navbarColor={'transparent'} >
            <SEO title='Search Anime' />

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
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className='fa fa-search' /></div>
                                </div>
                                <input type="text" class={"form-control bg-dark text-white"} id='search' onChange={onChange} value={state.search} />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center flex-wrap'>
                        <ListAnime list_anime={state.list} />
                    </div>
                </div>
            </div>
            <div className='shape-wave-bottom'></div>
        </Layout >
    )
}

export default connect(state => ({
    user: state.user.user,
    anime_list: state.anime.animes
}), null)(SearchAnime)