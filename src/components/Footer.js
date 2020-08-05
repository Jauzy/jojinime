import React, { useState } from 'react'
import { Link } from 'gatsby'

const ROUTES = require('../../static/constants/Routes')

const Footer = (props) => {
    const [state, setState] = useState({
        search: ''
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    return (
        <footer className="footer-bs">
            <div className="row">
                <div className="col-md-3 footer-brand animated fadeInLeft">
                    <h2 className='font-weight-bold'>JOJINIME<strong className='text-main'>.</strong></h2>
                    <p>
                        Jojinime adalah web streaming dan download anime non profit yang dibuat berdasarkan motivasi terwujudnya Web Anime yang Canggih, Cepat, juga tanpa Iklan dan ClickBait yang mengganggu. Web ini menggunakan server Google Platform yang terpercaya untuk kecepatan Streaming nya.
                    </p>
                    <p>© {new Date().getFullYear()} Jojinime, All rights reserved</p>
                </div>
                <div className="col-md-4 footer-nav animated fadeInUp">
                    <h4>Menu —</h4>
                    <div className="col-md-6">
                        <ul className="pages">
                            <li><Link to={ROUTES.COMBINEDLIST}>Anime List</Link></li>
                            <li><Link to={ROUTES.MOVIELIST}>Movie List</Link></li>
                            <li><Link to={ROUTES.ONGOINGLIST}>Ongoing List</Link></li>
                            <li><Link to={ROUTES.SEARCHGENRE}>Genre List</Link></li>
                            <li><Link to={ROUTES.LOGINUSER}>Login</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <ul className="list">
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2 footer-social animated fadeInDown">
                    <h4>Follow Us</h4>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">RSS</a></li>
                    </ul>
                </div>
                <div className="col-md-3 footer-ns animated fadeInRight">
                    <h4>Search Anime</h4>
                    <p>Temukan Anime Favoritmu Disini</p>
                    <div className="input-group">
                        <input type="text" className="form-control" onChange={onChange} value={state.search} id='search' placeholder="Search title..." />
                        <span className="input-group-btn">
                            <Link className="btn btn-main" to={ROUTES.SEARCHANIME} state={{ search: state.search }}><span className="fa fa-search"></span></Link>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer