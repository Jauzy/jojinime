import React, { useEffect } from 'react'
import { Link } from 'gatsby'

const ROUTES = require('../../../static/constants/Routes')

const SteamTrade = props => {
    const { image_url, className, id } = props

    useEffect(() => {
        const container = document.getElementById(id)
        const card = document.getElementById(id + 'card')

        if (container) {
            container.addEventListener('mousemove', (e) => {
                let xOffset = e.offsetX
                let yOffset = e.offsetY
                let cardHeight = card.clientHeight
                let cardWidth = card.clientWidth
                let heightCenter = Math.round(cardHeight / 2)
                let widthCenter = Math.round(cardWidth / 2)
                let rotateBaseValue = 20
                let rotateXValue = (yOffset - heightCenter) / heightCenter * rotateBaseValue
                let rotateYValue = (widthCenter - xOffset) / widthCenter * rotateBaseValue

                card.style.transform = `scale(1.1) rotateX(${rotateXValue}deg) rotateY(${rotateYValue}deg)`
            })

            container.addEventListener('mouseout', (e) => {
                card.style.transform = ''
            })
        }
    }, [])

    return (
        <Link className={'steam-wrapper ' + className} id={id} to={ROUTES.ANIMEPAGE + '?id=' + id}>
            <div className="steam-card border" id={id + 'card'}>
                <img src={image_url} alt={image_url} />
            </div>
        </Link>
    )
}

export default SteamTrade