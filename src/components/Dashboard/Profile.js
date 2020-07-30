import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { EditAvatar } from '../Index'
import { changePassword, updateUser, uploadPublicBanner, sendVerificationEmail} from '../../../static/redux/Actions/user'
import { NotificationManager } from 'react-notifications'

const COLORS = require('../../../static/constants/Colors')

const defaultState = {
    fullname: null, phone_no: null, about: null, birth_date: null, edit_mode: false,
    newpassword: null, oldpassword: null
}

const Profile = props => {
    const { user } = props
    const [state, setState] = useState({
        fullname: null, phone_no: null, about: null, birth_date: null, edit_mode: false, verified: false,
        newpassword: null, oldpassword: null, isModalOpen: false, isEditAvatarModalOpen: false,
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
        changePassword(props.dispatch, { oldPassword: state.oldpassword, newPassword: state.newpassword })
    }

    const toggleEditMode = () => {
        if (state.edit_mode) {
            updateUser(props.dispatch, state)
        }
        setState({ ...state, edit_mode: !state.edit_mode })
    }

    const handleFileInput = (e) => {
        let file = document.getElementById(e.target.id).files[0]
        if (file?.type.substring(0, 5) === "image") {
            if (file.size / 1024 / 1024 <= 1) {
                if (e.target.files && e.target.files.length > 0) {
                    let payload = new FormData()
                    payload.append('picture', file)
                    uploadPublicBanner(props.dispatch, payload)
                }
            }
            else
                NotificationManager.error("Ukuran Image Maks 4Mb", 'Error Upload Banner');
        } else
            NotificationManager.error("Format File Harus Image", 'Error Upload Banner');
    }

    useEffect(() => {
        setState({ ...state, ...user })
    }, [user])

    return (
        <div style={{ backgroundColor: 'transparent' }}>
            <div className='border' style={{ background: COLORS.MAIN }}>
                <img alt='banner' src={user?.public_banner || require('../../images/1080p.png')} style={{ objectFit: 'cover', width: '100%', height: '300px' }} />
            </div>
            <div className='container py-5 text-white'>
                <div className='row d-flex border-bottom pb-4'>
                    <div className='col-sm-auto m-auto'>
                        <img src={user?.profile_pict ? user?.profile_pict : 'https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg'} alt='profile' width="150" height="150" class="my-auto rounded-circle" />
                    </div>
                    <div className='col-sm m-auto d-flex'>
                        <div className='my-auto px-3'>
                            <h2>Foto Profil</h2>
                            <h5 className='text-secondary'>Ukuran foto profil dan banner tidak boleh lebih dari 1Mb.</h5>
                            <div className='d-flex flex-wrap'>
                                <button onClick={modalToggleAvatar} className='btn btn-main mx-2'>Edit Avatar</button>
                                <div className='d-flex align-items-center btn btn-secondary' style={{ cursor: 'unset' }}>
                                    Edit Banner
                                    <div className='ml-auto'>
                                        <div class="file-up-wrapper ml-2">
                                            <div class="file-upload">
                                                <input type="file" id='editBanner' onChange={handleFileInput} />
                                                <i class="fa fa-arrow-up"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                </table>
                <div className='d-flex mt-3 align-items-center'>
                    <button className='btn btn-main' onClick={modalToggle}>Ganti Password</button>
                    {state.verified && <div className='mx-2 btn btn-main'>
                        <i className='mr-2 fa fa-check p-1 rounded-circle' style={{ fontSize: '17px' }} /> Verified
                    </div>}

                    {!state.verified && <div className='mx-2 btn btn-danger' onClick={() => sendVerificationEmail(props.dispatch)}>
                        <i className='mr-2 fa fa-times p-1 rounded-circle' style={{ fontSize: '17px' }} /> Verify Email
                    </div>}

                </div>

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
    )
}

export default connect(state => ({
    user: state.user.user
}), null)(Profile)