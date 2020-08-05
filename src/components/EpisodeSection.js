import React from 'react'
import { Link } from 'gatsby'

const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const EpisodeSection = (props) => {
    const { episodes, anime, batch_link } = props
    return (
        <div>
            {/* batch */}
            {(anime?.type === 'TV') && <div className='mt-4'>
                <div style={{ backgroundColor: COLORS.MAIN }} className='px-4 py-2 font-weight-bold border-radius-top'>
                    <i className='fa fa-list mr-2' />{anime?.title} Batch
                    </div>
                <ul style={{ backgroundColor: '#2D2D2D', listStyle: 'none' }} className='px-3 py-1 border-radius-bottom link-list'>
                    {batch_link?.map(item => (
                        item.url &&
                        <li className='d-flex align-items-center'>
                            <div className='text-white px-4 py-1 text-center mr-3' style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '10px' }}>
                                <i className='fab fa-google-drive mr-2' /> Jojidrive | {item.quality}p
                            </div>
                            <a className='text-decoration-none text-white' href={item.url}>{anime?.title} Batch {item.quality}p</a>
                        </li>
                    ))}
                    {(!batch_link[0].url) &&
                        <div className='text-center text-secondary py-3'>
                            Batch tidak/belum tersedia
                        </div>
                    }
                </ul>
            </div>}

            {/* episodes */}
            <div className='mt-4'>
                <div style={{ backgroundColor: COLORS.MAIN }} className='px-4 py-2 font-weight-bold border-radius-top'>
                    <i className='fa fa-list mr-2' />{anime?.title} Episode List <em className='text-dark'>( Link Download + Streaming )</em>
                </div>
                <ul style={{ backgroundColor: '#2D2D2D', listStyle: 'none' }} className='px-3 py-1 border-radius-bottom link-list'>
                    {episodes?.map((eps, index) => (
                        <li key={'/episode' + eps?.title}>
                            <Link className='text-decoration-none text-white' to={ROUTES.STREAMING + `?id=${anime?._id}`} state={{ episode: index }}>
                                {eps?.title}
                                <date className='ml-auto'>{Math.floor(eps.duration / 60)} Menit.</date>
                            </Link>

                        </li>
                    ))}
                    {(!episodes || episodes.length === 0) &&
                        <div className='text-center text-secondary py-3'>
                            Episode tidak/belum tersedia
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default EpisodeSection