import React from 'react'
import { Link } from 'gatsby'

const ROUTES = require('../../static/constants/Routes')

const Footer = (props) => {
    const { className } = props
    return (
        <div>
            <div className={"bg-dark text-white font-roboto " + className}>
                <div className="px-10">
                    <div className="px-5 py-5">
                        <div className="row">
                            <div className="col-md-7">
                                <h6 className="font-weight-bolder text-white mb-2 mt-3 font-roboto">About Us</h6>
                                <h4 className="font-weight-bolder">Jojinime</h4>
                                <p className="text-break">
                                    Jojinime adalah web streaming dan download anime non profit yang dibuat berdasarkan motivasi terwujudnya Web Anime yang Canggih, Cepat, juga tanpa Iklan dan ClickBait yang mengganggu.
                                    Web ini menggunakan direct link tanpa link shortener pada link downloadnya, sehingga user dapat lebih mudah untuk mendownload anime.
                                </p>
                            </div>
                            <div className="col-md d-flex flex-column">
                                <h6 className="font-weight-bolder text-white mb-2 mt-3 font-roboto">Info</h6>
                                <p>Web Masih Dalam Tahap Pengembangan, Laporkan Bug Jika ditemukan pada Admin.</p>
                            </div>
                            <div className="col-md d-flex flex-column">
                                <h6 className="font-weight-bolder text-white mb-2 mt-3 font-roboto">Navigation</h6>
                                <ul className="navbar-nav mb-3">
                                    <li className="nav-item"><Link className="text-white" to={ROUTES.SEARCHANIME}>Search Anime</Link></li>
                                    <li className="nav-item"><Link className="text-white" to={ROUTES.SEARCHGENRE}>Search Genre</Link></li>
                                    <li className="nav-item"><Link className="text-white" to={ROUTES.COMBINEDLIST}>Anime List</Link></li>
                                    <li className="nav-item"><Link className="text-white" to={ROUTES.HOME}>Home</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-10 bg-secondary">
                    <div className="px-4 py-2 d-flex flex-row">
                        <div className="align-self-center mx-auto">
                            <div className="text-decoration-none px-1 text-white">@ {new Date().getFullYear()} Jojinime. All rights reserved.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer