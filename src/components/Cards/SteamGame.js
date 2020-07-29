import React from 'react'
import { Link } from 'gatsby'

const ROUTES = require('../../../static/constants/Routes')

const SteamGame = props => {
    const { anime, url, noLink, className} = props

    const Card = () => (
        <div className={'m-3 steam-game-container text-white '+className}>
            <div class="b-game-card">
                <div class="b-game-card__cover rounded-lg" style={{ backgroundImage: `url(${anime?.cover_image})` }}>
                    <div className='list-card'>
                        <div className='list-bg py-1 px-3 bg-dark'><i className='fa fa-eye mr-2' />{anime?.total_episode} Episode</div>
                        <div className='list-bg py-1 px-3'><i className='fa fa-eye mr-2' />{anime?.total_episode} Episode</div>
                        <div className='list-bg list-score py-1 px-3 bg-dark'><i className='fa fa-star mr-2' />{anime?.score}</div>
                        <div className='list-bg list-score py-1 px-3'><i className='fa fa-star mr-2' />{anime?.score}</div>
                        <div className='list-bg list-title text-truncate bg-dark p-2'>{anime?.title}</div>
                        <div className='list-bg list-title text-truncate p-2'>{anime?.title}</div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        noLink ? <Card /> :
            <Link to={url || ROUTES.ANIMEPAGE + `?id=${anime?._id}`
            }>
                <Card />
            </Link >
    )
}

export default SteamGame