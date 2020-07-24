import React from 'react'
import { Link } from 'gatsby'

const COLORS = require('../../static/constants/Colors')

const EpisodeSection = (props) => {
    const { detail, episodes, anime } = props
    return (
        <div>
            {/* batch */}
            {(anime.type == 'TV' && props.batch_link) && <div className='mt-4'>
                <div style={{ backgroundColor: COLORS.MAIN }} className='px-4 py-2 font-weight-bold border-radius-top'>
                    {detail?.title} Batch
                    </div>
                <ul style={{ backgroundColor: '#2D2D2D', listStyle: 'none' }} className='px-3 py-1 border-radius-bottom link-list'>
                    {props.batch_link?.map(item => (
                        item.links.map(links => (
                            <li>
                                <a className='text-decoration-none text-white' href={links.url}>{detail?.title} Batch {item.quality}p
                                <date className='ml-auto'>{links.source}</date></a>
                            </li>
                        ))
                    ))}
                </ul>
            </div>}

            {/* episodes */}
            <div className='mt-4'>
                <div style={{ backgroundColor: COLORS.MAIN }} className='px-4 py-2 font-weight-bold border-radius-top'>
                    {detail?.title} Episode List <em className='text-dark'>( Link Download + Streaming )</em>
                </div>
                <ul style={{ backgroundColor: '#2D2D2D', listStyle: 'none' }} className='px-3 py-1 border-radius-bottom link-list'>
                    {anime.type == 'TV' && episodes?.map(({ node }, index) => (
                        <li>
                            <Link className='text-decoration-none text-white' to={''}>
                                {node.childMarkdownRemark.frontmatter.title}
                                <date className='ml-auto'>
                                    <small>Uploaded</small>
                                    {new Date(node.childMarkdownRemark.frontmatter.date_uploaded).toDateString()}</date>
                            </Link>
                        </li>
                    ))}
                    {anime.type != 'TV' && episodes?.map((item, index) => (
                        <li>
                            <Link className='text-decoration-none text-white' to={``}>
                                Movie {detail?.title} Subtitle Indonesia
                                        <date className='ml-auto'><small>Uploaded</small> {new Date(item.date_uploaded).toDateString()}</date></Link>
                        </li>
                    ))}
                    {(!episodes || episodes.length == 0) &&
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