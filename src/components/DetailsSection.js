import React, { useState, useEffect } from 'react'
import $ from 'jquery'
const COLORS = require('../../static/constants/Colors')

const DetailsSection = (props) => {
    const { detail, addtoFavourite, user, removeFromFavourite } = props

    const [state, setState] = useState({
        isDescToggled: false
    })

    const toggleDesc = () => {
        setState({ ...state, isDescToggled: !state.isDescToggled })
        $('#desc').toggleClass('text-truncate max-height-70px')
    }

    return (
        <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4 '>
            <div className='d-flex'>
                <div>
                    <h4>{detail?.title} Subtitle Indonesia</h4>
                    <h6 className='text-white'>{detail?.title_english} - {detail?.title_japanese}</h6>
                </div>
            </div>
            <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

            <div className='text-center bg-secondary text-white rounded-lg pt-2 pb-1'>
                <h6>Streaming {detail?.title} Sub Indo</h6>
            </div>

            <div className='row'>
                <div className='col-sm-auto d-flex mt-3'><img src={detail?.image_url} height='auto' className='rounded-lg border mx-auto' /></div>
                <div className='col-sm d-flex mt-3'>
                    <table className='my-auto' style={{ maxWidth: '600px' }}>
                        <thead></thead>
                        <tbody>
                            <tr>
                                <td className='font-weight-bold'>Judul</td>
                                <td>: {detail?.title}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>English</td>
                                <td>: {detail?.title_english}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Japanese</td>
                                <td>: {detail?.title_japanese}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Rating</td>
                                <td>: {detail?.rating}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Score</td>
                                <td>: {detail?.score}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Total Episode</td>
                                <td>: {detail?.episodes ? detail.episodes : '?'}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Durasi</td>
                                <td>: {detail?.duration}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Status</td>
                                <td>: {detail?.status}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Ditayangkan</td>
                                <td>: {detail?.aired.string}</td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Studio</td>
                                <td>: {detail?.studios.map((item) => (item.name + ', '))} </td>
                            </tr>
                            <tr>
                                <td className='font-weight-bold'>Genre</td>
                                <td className='text-wrap'>: {detail?.genres.map((item) => (item.name + ', '))}</td>
                            </tr>
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>

            <div>
                <p className='text-wrap text-truncate max-height-70px my-3' style={{ textIndent: '20px' }} id='desc'>
                    {detail?.synopsis}
                </p>
                <div className='d-flex flex-wrap'>
                    {state.isDescToggled ?
                        <button className='btn btn-main px-3' onClick={toggleDesc}>Show More</button>
                        :
                        <button className='btn btn-main px-3' onClick={toggleDesc}>Show More</button>
                    }
                    {(!user?.favourite?.filter(item => item.mal_id == props.match.params.mal_id)[0] && user) && <button className='btn btn-secondary ml-4' onClick={() => addtoFavourite(props.match.params.mal_id)}><i className='fa fa-heart mr-2' />Add to Favourite</button>}
                    {user?.favourite?.filter(item => item.mal_id == props.match.params.mal_id)[0] && <button className='btn btn-danger ml-4' onClick={() => removeFromFavourite(props.match.params.mal_id)}><i className='fa fa-heart mr-2' />Favourite</button>}
                </div>
            </div>
        </div>
    )
}

export default DetailsSection