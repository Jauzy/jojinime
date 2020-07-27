import React, { useState, useEffect } from 'react'

import {ListAnime} from '../../components/Index'

const COLORS = require('../../../static/constants/Colors')

const Favourite = props => {
    const { list } = props
    const [state, setState] = useState({
        search: '', list, full_list: list
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        setState({ ...state, list: state.full_list.filter(item => item.title.toLowerCase().includes(state.search)) })
    }, [state.search])

    return (
        <div className='text-white'>
            <div className='shape-wave-top'></div>
            <div className='container bg-dark' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black', marginBottom: '150px' }}>
                <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4 '>
                    <div className='d-flex'>
                        <div>
                            <h4>Anime Favoritku</h4>
                            <h6 className='text-white'>私の好きなアニメ</h6>
                        </div>
                        <i className='fa fa-eye ml-auto my-auto' />
                    </div>
                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />
                    <div className='d-flex'>
                        <label className='ml-auto mr-3 my-auto'>Cari Judul</label>
                        <div style={{ maxWidth: '300px' }}>
                            <div className='input-group'>
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i className='fa fa-search' /></div>
                                </div>
                                <input type="text" class={"form-control bg-dark text-white"} id='search' onChange={onChange} value={state.search} />
                            </div>
                        </div>
                    </div>
                    <ListAnime list_anime={state.list}  />
                </div>
            </div>
        </div>
    )
}

export default Favourite