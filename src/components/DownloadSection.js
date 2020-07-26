import React from 'react'

const COLORS = require('../../static/constants/Colors')

const DownloadSection = (props) => {
    const { title, video_360, video_480, video_720, video_360_size, video_480_size, video_720_size } = props
    return (
        <div>
            <div className='my-3 bg-secondary py-2 font-weight-bold rounded-lg text-center'>
                Link Download {title} Subtitle Indonesia
                    </div>
            <div className=''>
                <div style={{ backgroundColor: COLORS.MAIN }} className='px-4 py-2 font-weight-bold border-radius-top'>
                    {title} Subtitle Indonesia
                        </div>
                <ul style={{ backgroundColor: COLORS.SECONDARY, listStyle: 'none' }} className='px-3 py-1 border-radius-bottom link-list'>
                    <li>
                        <div className='text-decoration-none text-white d-flex align-items-center' to='#'>
                            <div className='text-white px-4 py-1 text-center mr-3' style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '10px' }}>
                                360P
                            </div>
                            |
                                <div className='d-flex'>
                                <a href={video_360} className='mx-3 text-white' download={`Jojinime - ${title} - 360P`}>Jojinime Direct Link</a>|
                                </div>
                        </div>
                    </li>
                    <li>
                        <div className='text-decoration-none text-white d-flex align-items-center' to='#'>
                            <div className='text-white px-4 py-1 text-center mr-3' style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '10px' }}>
                                480P
                            </div>
                            |
                                <div className='d-flex'>
                                <a href={video_480} className='mx-3 text-white' download={`Jojinime - ${title} - 480P`}>Jojinime Direct Link</a>|
                                </div>
                        </div>
                    </li>
                    <li>
                        <div className='text-decoration-none text-white d-flex align-items-center' to='#'>
                            <div className='text-white px-4 py-1 text-center mr-3' style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '10px' }}>
                                720P
                            </div>
                            |
                                <div className='d-flex'>
                                <a href={video_720} className='mx-3 text-white' download={`Jojinime - ${title} - 720P`}>Jojinime Direct Link</a>|
                                </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DownloadSection