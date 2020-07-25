import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import userAction from '../../../Modules/Redux/Actions/User'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { EditAvatar } from '../../../Components/Index'
import LoadingOverlay from 'react-loading-overlay'

const COLORS = require('../../../Constants/Colors')

const defaultState = {
    fullname: null, phone_no: null, about: null, birth_date: null, edit_mode: false,
    newpassword: null, oldpassword: null
}

const Profile = props => {
    const { user } = props
    const [state, setState] = useState({
        fullname: null, phone_no: null, about: null, birth_date: null, edit_mode: false,
        newpassword: null, oldpassword: null, isModalOpen: false, isEditAvatarModalOpen: false
    })

    const modalToggle = () => setState({ ...state, isModalOpen: !state.isModalOpen })
    const modalToggleAvatar = () => setState({ ...state, isEditAvatarModalOpen: !state.isEditAvatarModalOpen })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const onUndo = () => {
        setState({ ...defaultState, ...user, edit_mode: false })
    }

    const onChangePassword = () => {
        modalToggle()
        props.changePassword(state.oldpassword, state.newpassword)
    }

    const toggleEditMode = () => {
        if (state.edit_mode) {
            props.updateUser(state)
        }
        setState({ ...state, edit_mode: !state.edit_mode })
    }

    useEffect(() => {
        setState({ ...state, ...user })
    }, [user])

    useEffect(() => {
        document.title = 'Jojinime - User Profile'
    }, [])

    return (
        <LoadingOverlay spinner active={props.loading} text='Loading please wait...'>
            <div style={{ backgroundColor: COLORS.SECONDARY }}>
                <div className='container py-5 text-white'>
                    <div className='row d-flex border-bottom pb-4'>
                        <div className='col-md-auto m-auto'>
                            <img src={user?.profile_pict ? user?.profile_pict : "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"} width="150" height="150" class="my-auto rounded-circle" />
                        </div>
                        <div className='col-md m-auto d-flex'>
                            <div className='my-auto'>
                                <h2>Foto Profile</h2>
                                <h5 className='text-secondary'>Ukuran foto profil tidak boleh lebih dari 1Mb.</h5>
                                <button onClick={modalToggleAvatar} className='btn btn-main'>Edit Foto</button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 d-flex text-wrap'>
                        <h1 className='font-weight-bold my-auto'>Tentang Anda</h1>
                        <i className={`fa fa-${state.edit_mode ? 'save' : 'pen'} my-auto ml-3 text-main`} style={{ cursor: 'pointer', fontSize: '30px' }}
                            onClick={toggleEditMode} />
                        {state.edit_mode && <i className={`fa fa-undo my-auto ml-3 text-main`} style={{ cursor: 'pointer', fontSize: '30px' }}
                            onClick={onUndo} />}
                    </div>
                    <table className='mt-3' style={{ width: '100%' }}>
                        <tr>
                            <td><h4>Nickname</h4></td>
                            <td>
                                <h4>: <strong>{state.nickname}</strong></h4>
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Nama Lengkap</h4></td>
                            <td>
                                {state.edit_mode &&
                                    <h4 class="input-group">
                                        : <input type="text" style={{ border: 'unset', borderBottom: '1px solid white', background: 'unset', boxShadow: 'unset', maxWidth: '400px' }}
                                            class="form-control text-white" placeholder="Nama Lengkap" id='fullname' value={state.fullname} onChange={onChange} />
                                    </h4>
                                }

                                {!state.edit_mode && <h4>:
                                {state.fullname ? <strong> {state.fullname}</strong> : <strong className='text-secondary'> Edit untuk menambahkan.</strong>}
                                </h4>}
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Nomor Telepon</h4></td>
                            <td>
                                {state.edit_mode &&
                                    <h4 class="input-group">
                                        : <input type="text" style={{ border: 'unset', borderBottom: '1px solid white', background: 'unset', boxShadow: 'unset', maxWidth: '400px' }}
                                            class="form-control text-white" placeholder="Nomor Telepon" id='phone_no' value={state.phone_no} onChange={onChange} />
                                    </h4>
                                }

                                {!state.edit_mode && <h4>:
                                {state.phone_no ? <strong> {state.phone_no}</strong> : <strong className='text-secondary'> Edit untuk menambahkan.</strong>}
                                </h4>}
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Tentang</h4></td>
                            <td>
                                {state.edit_mode &&
                                    <h4 class="input-group">
                                        : <textarea style={{ border: 'unset', borderBottom: '1px solid white', background: 'unset', boxShadow: 'unset', maxWidth: '400px' }}
                                            class="form-control text-white" placeholder="Tentang Anda" id='about' value={state.about} onChange={onChange} rows='2' />
                                    </h4>
                                }
                                {!state.edit_mode && <h4>:
                                {state.about ? <strong> {state.about}</strong> : <strong className='text-secondary'> Edit untuk menambahkan.</strong>}
                                </h4>}
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Tanggal Lahir</h4></td>
                            <td>
                                {state.edit_mode &&
                                    <h4 class="input-group">
                                        : <input type="date" style={{ border: 'unset', borderBottom: '1px solid white', background: 'unset', boxShadow: 'unset', maxWidth: '400px' }}
                                            class="form-control text-white" placeholder="Tanggal Lahir" id='birth_date' value={state.birth_date} onChange={onChange} />
                                    </h4>
                                }
                                {!state.edit_mode && <h4>:
                                {state.birth_date ? <strong> {new Date(state.birth_date).toLocaleDateString()}</strong> :
                                        <strong className='text-secondary'> Edit untuk menambahkan.</strong>}
                                </h4>}
                            </td>
                        </tr>
                        <tr>
                            <td><h4>Email</h4></td>
                            <td><h4>: <strong>{user?.email}</strong></h4></td>
                        </tr>
                        <tr>
                            <td><button className='btn btn-main' onClick={modalToggle}>Ganti Password</button></td>
                            <td></td>
                        </tr>
                    </table>

                    <Modal isOpen={state.isModalOpen} toggle={modalToggle} scrollable={true} centered={true} className='modal-custom' size='xl'>
                        <ModalHeader toggle={modalToggle}></ModalHeader>
                        <ModalBody>
                            <div class="form-group">
                                <label >Password Saat Ini</label>
                                <input type="password" class="form-control text-white" id='oldpassword' value={state.oldpassword} onChange={onChange}
                                    style={{ background: 'unset', border: 'unset', boxShadow: 'unset', borderBottom: '2px solid white', fontSize: '30px' }} />
                                <small id="emailHelp" class="form-text text-muted">Masukan Password Anda Saat Ini.</small>
                            </div>
                            <div class="form-group">
                                <label >Password Baru</label>
                                <input type="password" class="form-control text-white" id='newpassword' value={state.newpassword} onChange={onChange}
                                    style={{ background: 'unset', border: 'unset', boxShadow: 'unset', borderBottom: '2px solid white', fontSize: '30px' }} />
                                <small class="form-text text-muted">Masukan Password Baru, Password Baru tidak boleh sama dengan password saat ini.</small>
                            </div>
                            <button className='btn btn-main btn-block' onClick={onChangePassword} data-dismiss='modal'
                                disabled={!state.newpassword || !state.oldpassword || state.oldpassword == state.newpassword}>Submit</button>
                        </ModalBody>
                    </Modal>

                    <Modal isOpen={state.isEditAvatarModalOpen} toggle={modalToggleAvatar} scrollable={true} centered={true} className='modal-custom' size='xl'>
                        <ModalHeader toggle={modalToggleAvatar}></ModalHeader>
                        <ModalBody>
                            <EditAvatar modalToggleAvatar={modalToggleAvatar} />
                        </ModalBody>
                    </Modal>

                </div>
            </div>
        </LoadingOverlay>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        error: state.user.error,
        user: state.user.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserData: () => dispatch(userAction.getUserData()),
        updateUser: (payload) => dispatch(userAction.updateUser(payload)),
        changePassword: (oldPassword, newPassword) => dispatch(userAction.changePassword(oldPassword, newPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile))