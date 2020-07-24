import React from 'react'
import {
    FacebookShareButton,
    LineShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    FacebookIcon,
    LineIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    WhatsappIcon,
} from "react-share";

const ShareSection = (props) => {
    const { title } = props
    const { pathname } = props.location
    const className = 'mx-2 px-3 py-2 bg-light text-dark d-flex mt-2'
    const url = "https://www.jojinime.xyz"
    return (
        <div>
            <div className='mb-3 bg-secondary py-2 font-weight-bold rounded-lg text-center'>
                Jangan Lupa Bantu Share Anime {title} Sub Indo Ke Teman Kalian Ya
                    </div>
            <div className='mb-4 d-flex flex-wrap justify-content-center'>
                <FacebookShareButton url={url + pathname} className={className} style={{ borderRadius: '20px' }}>
                    <FacebookIcon size={32} round={true} /> <strong className='my-auto ml-2'>Facebook</strong>
                </FacebookShareButton>
                <LineShareButton url={url + pathname} className={className} style={{ borderRadius: '20px' }}>
                    <LineIcon size={32} round={true} /> <strong className='my-auto ml-2'>Line</strong>
                </LineShareButton>
                <RedditShareButton url={url + pathname} className={className} style={{ borderRadius: '20px' }}>
                    <RedditIcon size={32} round={true} /> <strong className='my-auto ml-2'>Reddit</strong>
                </RedditShareButton>
                <TelegramShareButton url={url + pathname} className={className} style={{ borderRadius: '20px' }}>
                    <TelegramIcon size={32} round={true} /> <strong className='my-auto ml-2'>Telegram</strong>
                </TelegramShareButton>
                <TwitterShareButton url={url + pathname} className={className} style={{ borderRadius: '20px' }}>
                    <TwitterIcon size={32} round={true} /> <strong className='my-auto ml-2'>Twitter</strong>
                </TwitterShareButton>
                <WhatsappShareButton url={url + pathname} className={className} style={{ borderRadius: '20px' }}>
                    <WhatsappIcon size={32} round={true} /> <strong className='my-auto ml-2'>Whatsapp</strong>
                </WhatsappShareButton>
            </div>
        </div>
    )
}

export default ShareSection