import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { Link } from "gatsby"
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

//redux
import { getUserData, logout } from "../../static/redux/Actions/user";

const cookies = new Cookies()
const ROUTES = require('../../static/constants/Routes')
const COLORS = require('../../static/constants/Colors')

const NavbarComponent = (props) => {
    const { color, dispatch, user, noHamburger } = props
    const [state, setState] = useState({
        search: null || '', isModalOpen: false
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const modalToggle = () => setState({ ...state, isModalOpen: !state.isModalOpen })

    useEffect(() => {
        if (cookies.get('user')) getUserData(dispatch)
    }, [])

    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: color || '#222', zIndex: '1' }}>
                <div className='container d-flex'>
                    <Link className="navbar-brand font-weight-bold" style={{ fontSize: '40px' }} to='/'>
                        Jojinime<strong style={{ color: COLORS.MAIN }}>.</strong>
                    </Link>

                    {!noHamburger && <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>}

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto align-items-center">
                            <li className="nav-item mr-auto">
                                <Link className="nav-link" to='#' onClick={modalToggle}><i className='fa fa-search' /></Link>
                            </li>
                            <li className="nav-item active mr-auto">
                                <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
                            </li>
                            <li className="nav-item mr-auto">
                                <Link className="nav-link" to={ROUTES.COMBINEDLIST}>Anime List</Link>
                            </li>
                            <li className="nav-item mr-auto">
                                <Link className="nav-link" to={ROUTES.MOVIELIST}>Movie List</Link>
                            </li>
                            <li className="nav-item mr-auto">
                                <Link className="nav-link" to={ROUTES.ONGOINGLIST}>On - Going List</Link>
                            </li>
                            <li className="nav-item mr-auto">
                                <Link className="nav-link" to={ROUTES.SEARCHGENRE}>Genre List</Link>
                            </li>
                            <li className="nav-item dropdown mr-auto">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    More
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={ROUTES.ABOUT}>About Us</Link>
                                </div>
                            </li>
                            {!cookies.get('user') && <li className="nav-item mr-auto">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>}
                        </ul>

                        {user && <ul className="navbar-nav">
                            <li className="nav-item">
                                <div className='dropdown'>
                                    <div className='d-flex dropdown-toggle align-items-center' id="userDrop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <h6 className='mr-2 mb-0 font-weight-bold text-secondary'>Hello, {user.nickname}</h6>
                                        <img src={user?.profile_pict ? user?.profile_pict : 'https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg'} width="40" height="40" className="rounded-circle" />
                                    </div>
                                    <div className="dropdown-menu py-0 mt-3" style={{ maxWidth: '400px' }} aria-labelledby="userDrop">
                                        <a className="dropdown-item d-flex px-4 py-4" href="#">
                                            <img src={user?.profile_pict ? user?.profile_pict : 'https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg'} width="60" height="60" className="my-auto rounded-circle" />
                                            <div className='my-auto ml-4'>
                                                <h5 className='font-weight-bold mb-0 text-wrap'>{user.nickname}</h5>
                                                <h6 className='text-secondary text-wrap'>{user.email}</h6>
                                            </div>
                                        </a>
                                        {user.admin && <Link className="text-decoration-none dropdown-item d-flex py-3 px-5 bg-light text-secondary" to={`${ROUTES.ADMIN_DASHBOARD}`}>
                                            <i className='fa fa-cogs text-main my-auto' style={{ fontSize: '20px' }} />
                                            <h6 className='font-weight-bold ml-4 my-auto'>Admin Dashboard</h6>
                                        </Link>}
                                        <Link className="text-decoration-none dropdown-item d-flex py-3 px-5 bg-light text-secondary" to={ROUTES.DASHBOARDUSER}>
                                            <i className='fa fa-user text-main my-auto' style={{ fontSize: '20px' }} />
                                            <h6 className='font-weight-bold ml-4 my-auto'>Dashboard</h6>
                                        </Link>
                                        <Link className="text-decoration-none dropdown-item d-flex py-3 px-5 bg-light text-secondary" to={`${ROUTES.PROFILEUSERPUBLIC}/?id=${user?._id}`}>
                                            <i className='fa fa-globe-asia text-main my-auto' style={{ fontSize: '20px' }} />
                                            <h6 className='font-weight-bold ml-4 my-auto'>Public Profile</h6>
                                        </Link>
                                        <a className="text-decoration-none dropdown-item d-flex py-3 px-5 bg-light text-secondary border-top rounded-bottom"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => logout(props.dispatch, props.navigate)}>
                                            <i className='fa fa-power-off text-main my-auto' style={{ fontSize: '20px' }} />
                                            <h6 className='font-weight-bold ml-4 my-auto'>Logout</h6>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>}
                        {/* end of user data */}
                    </div>
                    {/* end of collapse */}
                </div>
                {/* end of container */}
            </nav>
            <Modal isOpen={state.isModalOpen} toggle={modalToggle} scrollable={true} centered={true} className='modal-custom' size='xl'>
                <ModalHeader toggle={modalToggle}></ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label >Cari Judul Anime</label>
                        <input type="text" className="form-control text-white" id='search' value={state.search} onChange={onChange}
                            style={{ background: 'unset', border: 'unset', boxShadow: 'unset', borderBottom: '2px solid white', fontSize: '30px' }} />
                        <small className="form-text text-muted">Masukan judul anime yang ingin dicari.</small>
                    </div>
                    <Link className='btn btn-main btn-block' to={ROUTES.SEARCHANIME} state={{ search: state.search }}>Search</Link>
                </ModalBody>
            </Modal>
            {/* end of modals */}
        </div >
    )
}

export default connect(state => ({
    user: state.user.user
}), null)(NavbarComponent)