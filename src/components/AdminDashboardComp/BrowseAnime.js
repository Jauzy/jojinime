import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { SteamGame } from '../Cards/Index'
import { getAnimes } from '../../../static/redux/Actions/anime'

const COLORS = require('../../../static/constants/Colors')
const ROUTES = require('../../../static/constants/Routes')

const BrowseAnime = props => {
    const { anime_list, user } = props
    const [state, setState] = useState({
        search: '', list: [], full_list: []
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        setState({ ...state, full_list: anime_list, list: anime_list })
    }, [anime_list])

    useEffect(() => {
        setState({ ...state, list: state.full_list.filter(item => item.title.toLowerCase().includes(state.search)) })
    }, [state.search])

    useEffect(() => {
        getAnimes(props.dispatch)
    }, [])

    return (
        <div className='text-white'>
            <div className='shape-wave-top'></div>
            <div className='container bg-dark' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black', marginBottom: '150px' }}>
                <div style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '20px' }} className='p-4 '>
                    <div className='d-flex'>
                        <div>
                            <h4>Browse Anime</h4>
                            <h6 className='text-white'>Logged in as <i className='fa fa-user-circle mx-2' />Admin {user?.fullname || user?.nickname}</h6>
                        </div>
                        <i className='fa fa-eye ml-auto my-auto' />
                    </div>
                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />
                    <div className='d-flex'>
                        <label className='ml-auto mr-3 my-auto'>Search by Title</label>
                        <div style={{ maxWidth: '300px' }}>
                            <div className='input-group'>
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i className='fa fa-link' /></div>
                                </div>
                                <input type="text" class={"form-control bg-dark text-white"} id='search' onChange={onChange} value={state.search} />
                            </div>
                        </div>
                    </div>

                    <div className='d-flex flex-wrap justify-content-center pb-3'>
                        {state.list?.map(anime => (
                            <SteamGame anime={anime} url={ROUTES.ANIMEDASH + `?id=${anime._id}`} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default connect(state => ({
    anime_list: state.anime.animes,
    user: state.user.user
}), null)(BrowseAnime)