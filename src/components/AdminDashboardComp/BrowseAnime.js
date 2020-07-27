import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import animeAction from '../../../Modules/Redux/Actions/Anime'
import LoadingOverlay from 'react-loading-overlay'
import Cookies from 'universal-cookie'

const COLORS = require('../../../Constants/Colors')
const cookies = new Cookies()
const BrowseAnime = props => {
    const { anime_list } = props
    const [state, setState] = useState({
        search: null, list: [], full_list: []
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
        props.getAllAnime()
        document.title = 'Jojinime - Browse Anime'
    }, [])

    return (
        <div className='text-white'>
            <LoadingOverlay
                active={props.loading}
                spinner
                text='Loading your content...'>
                <div className='shape-wave-top'></div>
                <div className='container bg-dark' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black', marginBottom: '150px' }}>
                    <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4 '>
                        <div className='d-flex'>
                            <div>
                                <h4>Browse Anime</h4>
                                <h6 className='text-white'>Logged in as <i className='fa fa-user-circle mx-2' />Admin {cookies.get('user').nickname}</h6>
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
                        <div className='d-flex justify-content-center flex-wrap'>
                            {state.list?.map((item, index) => (
                                <div className='my-3' key={index + 'recommend'} style={{ width: '200px', fontSize: '14px' }}>
                                    <Link to={'/anime/' + item.mal_id + '/dashboard'} className='recommend-card-2 text-white'>
                                        {item.type == 'TV' && <div className='position-absolute py-1 px-3 bg-dark' style={{ opacity: '.6' }}><i className='fa fa-eye mr-2' />Episode {item.latest_eps}</div>}
                                        {item.type == 'TV' && <div className='position-absolute py-1 px-3'><i className='fa fa-eye mr-2' />Episode {item.latest_eps}</div>}
                                        <div className='position-absolute py-1 px-3 bg-dark' style={{ marginTop: '35px', opacity: '.6' }}>{new Date(item.last_upload).toLocaleDateString()}</div>
                                        <div className='position-absolute py-1 px-3' style={{ marginTop: '35px' }}>{new Date(item.last_upload).toLocaleDateString()}</div>
                                        <div className='bg-recommend text-truncate text-white bg-dark p-2 text-center' style={{ width: '180px', marginTop: '225px' }}>{item.title}</div>
                                        <div className='position-absolute text-truncate text-white p-2 text-center' style={{ width: '180px', marginTop: '225px' }}>{item.title}</div>
                                        <img src={item.image_url} style={{ objectFit: 'cover', width: '180px', height: '260px' }} className='rounded-lg' />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.anime.loading,
        anime_list: state.anime.anime_list,
        error: state.anime.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllAnime: () => dispatch(animeAction.getAllAnime()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BrowseAnime))