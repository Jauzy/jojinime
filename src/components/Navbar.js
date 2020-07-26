import React, { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { Link } from "gatsby"
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

//redux
import { getUserData } from "../../static/redux/Actions/user";

const cookies = new Cookies()
const ROUTES = require('../../static/constants/Routes')
const COLORS = require('../../static/constants/Colors')
const USERACTION = require('../../static/constants/userAction')

const NavbarComponent = (props) => {
    const { color, dispatch } = props
    let user = cookies.get('user')
    const [state, setState] = useState({
        search: null || '', isModalOpen: false
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const modalToggle = () => setState({ ...state, isModalOpen: !state.isModalOpen })

    useEffect(() => {
        getUserData(dispatch)
    }, [])

    return (
        <div className=''>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: color || '#222', zIndex: '1' }}>
                <div className='container d-flex'>
                    <Link className="navbar-brand font-weight-bold" style={{ fontSize: '40px' }} to='/'>
                        Jojinime<strong style={{ color: COLORS.MAIN }}>.</strong>
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto align-items-center">
                            <li className="nav-item active">
                                <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={ROUTES.COMBINEDLIST}>Anime List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={ROUTES.MOVIELIST}>Movie List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={ROUTES.ONGOINGLIST}>On - Going List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={ROUTES.SEARCHGENRE}>Genre List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='#' onClick={modalToggle}><i className='fa fa-search' /></Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    More
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={ROUTES.ABOUT}>About Us</Link>
                                </div>
                            </li>
                            {!cookies.get('user') && <li className="nav-item">
                                <Link className="nav-link" to='/login'>Login</Link>
                            </li>}
                        </ul>

                        {user && <ul className="navbar-nav">
                            <li className="nav-item d-flex">
                                <div className='dropdown d-flex flex-wrap'>
                                    <h6 className='my-auto mr-2 font-weight-bold text-secondary'>Hello, {user.nickname}</h6>
                                    <a className="nav-link dropdown-toggle my-auto" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src={user?.profile_pict ? user?.profile_pict : 'https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg'} width="40" height="40" className="rounded-circle" />
                                    </a>
                                    <div className="dropdown-menu py-0" style={{ maxWidth: '400px' }} aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item d-flex px-4 py-4" href="#">
                                            <img src={user?.profile_pict ? user?.profile_pict : 'https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg'} width="60" height="60" className="my-auto rounded-circle" />
                                            <div className='my-auto ml-4'>
                                                <h5 className='font-weight-bold mb-0 text-wrap'>{user.nickname}</h5>
                                                <h6 className='text-secondary text-wrap'>{user.email}</h6>
                                            </div>
                                        </a>
                                        <Link className="text-decoration-none dropdown-item d-flex py-3 px-5 bg-light text-secondary" to='/dashboard'>
                                            <i className='fa fa-user text-main my-auto' style={{ fontSize: '20px' }} />
                                            <h6 className='font-weight-bold ml-4 my-auto'>Dashboard</h6>
                                        </Link>
                                        <Link className="text-decoration-none dropdown-item d-flex py-3 px-5 bg-light text-secondary" to={`${ROUTES.PROFILEUSERPUBLIC}/?id=${user?._id}`}>
                                            <i className='fa fa-user text-main my-auto' style={{ fontSize: '20px' }} />
                                            <h6 className='font-weight-bold ml-4 my-auto'>Public Profile</h6>
                                        </Link>
                                        <a className="text-decoration-none dropdown-item d-flex py-3 px-5 bg-light text-secondary border-top rounded-bottom"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => USERACTION.logout(props.navigate)}>
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
                    <Link className='btn btn-main btn-block' to='/search_anime' state={{ search: state.search }}>Submit</Link>
                </ModalBody>
            </Modal>
            {/* end of modals */}
        </div >
    )
}

export default connect(null, null)(NavbarComponent)