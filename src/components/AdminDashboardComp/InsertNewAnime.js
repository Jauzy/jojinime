import React, {useState } from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import genres from '../../../static/constants/Genres'
import { DetailsSection } from '../../components/Index'
import { addAnime } from '../../../static/redux/Actions/anime'

const COLORS = require('../../../static/constants/Colors')

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black'
    }),
}

let InsertNewAnime = (props) => {
    const { user } = props
    const [state, setState] = useState({
        cover_image: '', title: '', title_english: '', title_japan: '',
        rating: '', score: '', duration: '', total_episode: '', status: '',
        airing: '', studio: '', genre: [], type: '', synopsis: '',

        isModalOpen: false
    })

    const modalToggle = () => {
        setState({ ...state, isModalOpen: !state.isModalOpen })
    }

    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value.toString(), valid: false })
    }

    const valid = () => {
        return state.cover_image.length > 0 && state.title.length > 0 && state.title_english.length > 0 && state.title_japan.length > 0 &&
            state.rating.length > 0 && state.score.length > 0 && state.duration.length > 0 && state.total_episode.length > 0 && state.total_episode.length > 0 &&
            state.status.length > 0 && state.airing.length > 0 && state.studio.length > 0 && state.genre.length > 0 && state.type.length > 0 &&
            state.synopsis.length > 0
    }

    const onSubmit = () => {
        addAnime(props.dispatch, state)
    }

    return (
        <div className='text-white'>
            <div className='shape-wave-top'></div>
            <div className='container bg-dark' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black', marginBottom: '150px' }}>
                <div style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '20px' }} className='p-4 '>
                    <div className='d-flex'>
                        <div>
                            <h4>Add New Anime to Database</h4>
                            <h6 className='text-white'>Logged in as <i className='fa fa-user-circle mx-2' />Admin {user?.fullname || user?.nickname}</h6>
                        </div>
                        <i className='fa fa-eye ml-auto my-auto' />
                    </div>
                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                    <div className='btn btn-secondary btn-block' style={{ cursor: 'unset' }} onClick={modalToggle}>
                        Click to Fill in The Form
                    </div>

                    <div className='mt-4'>
                        <h1 className='font-weight-bold text-center'>Editor Previews</h1>
                        <DetailsSection detail={state} />
                    </div>

                    <button className={'btn btn-block ' + (valid ? 'btn-main' : 'btn-secondary')} disabled={!valid()}
                        onClick={onSubmit}>
                        Submit
                    </button>

                    <Modal isOpen={state.isModalOpen} toggle={modalToggle} scrollable={true} centered={true} className='modal-custom' size='md'>
                        <ModalHeader toggle={modalToggle} className='align-items-center'>Adding New Anime to Database</ModalHeader>
                        <ModalBody className=''>

                            <FormGroup>
                                <Label for="cover_image">Cover Image</Label>
                                <Input invalid={state.cover_image == ''} onChange={onChange} id='cover_image' value={state.cover_image} />
                                <FormFeedback invalid>Required!</FormFeedback>
                                <FormText>Anime Cover Image Link Url</FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="title">Anime Title</Label>
                                <Input invalid={state.title == ''} onChange={onChange} id='title' value={state.title} />
                                <FormFeedback invalid>Required!</FormFeedback>
                                <FormText>Ex: Overlord, Renai Boukun, etc.</FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="title_english">Title English</Label>
                                <Input invalid={state.title_english == ''} onChange={onChange} id='title_english' value={state.title_english} />
                                <FormFeedback invalid>Required!</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="title_japan">Title Japan</Label>
                                <Input invalid={state.title_japan == ''} onChange={onChange} id='title_japan' value={state.title_japan} />
                                <FormFeedback invalid>Required!</FormFeedback>
                            </FormGroup>

                            <Label for="title_japan">Rating</Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isLoading={false}
                                onChange={(value) => setState({ ...state, rating: value.value })}
                                isSearchable={true}
                                styles={customStyles}
                                name="rating"
                                options={['G - Semua Umur', 'PG - Children', 'PG-13 - Teens 13 or older', 'R-17+ - (Violence & Profanity)',
                                    'R+ - Mild Nudity', 'Rx - Hentai', 'None'].map(item => ({ value: item, label: item }))} F
                            />
                            <FormText>Required: Age Restriction</FormText>

                            <FormGroup className='mt-3'>
                                <Label for="score">Score</Label>
                                <Input invalid={state.score == ''} onChange={onChange} id='score' value={state.score} />
                                <FormFeedback invalid>Required!</FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="total_episode">Total Episodes</Label>
                                <Input invalid={state.total_episode == ''} onChange={onChange} id='total_episode' value={state.total_episode} />
                                <FormFeedback invalid>Required!</FormFeedback>
                                <FormText>Ex: Fill ? if Anime is Ongoing</FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="duration">Duration</Label>
                                <Input invalid={state.duration == ''} onChange={onChange} id='duration' value={state.duration} />
                                <FormFeedback invalid>Required!</FormFeedback>
                                <FormText>Ex: 24 Menit per Episode.</FormText>
                            </FormGroup>

                            <Label for="status">Status</Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isLoading={false}
                                onChange={(value) => setState({ ...state, status: value.value })}
                                isSearchable={true}
                                styles={customStyles}
                                name="status"
                                options={['Ongoing', 'Completed'].map(item => ({ value: item, label: item }))}
                            />
                            <FormText>Required: Age Restriction</FormText>

                            <FormGroup className='mt-3'>
                                <Label for="airing">Airing</Label>
                                <Input invalid={state.airing == ''} onChange={onChange} id='airing' value={state.airing} />
                                <FormFeedback invalid>Required!</FormFeedback>
                                <FormText>From date to date.</FormText>
                            </FormGroup>

                            <FormGroup>
                                <Label for="studio">Studio</Label>
                                <Input invalid={state.studio == ''} onChange={onChange} id='studio' value={state.studio} />
                                <FormFeedback invalid>Required!</FormFeedback>
                            </FormGroup>

                            <Label for="genre">Genre</Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isLoading={false}
                                isMulti={true}
                                onChange={(value) => setState({ ...state, genre: value.map(item => (item.value)) })}
                                isSearchable={true}
                                styles={customStyles}
                                name="genre"
                                options={genres.map(item => ({ value: item, label: item }))}
                            />

                            <Label for="type" className='mt-3'>Type</Label>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                isLoading={false}
                                onChange={(value) => setState({ ...state, type: value.value })}
                                isSearchable={true}
                                styles={customStyles}
                                name="type"
                                options={['TV', 'Movie'].map(item => ({ value: item, label: item }))}
                            />

                            <Label for="sysnopsis" className='mt-3'>Synopsis</Label>
                            <Input type="textarea" id="synopsis" onChange={onChange} value={state.synopsis} />
                        </ModalBody>
                    </Modal>

                </div>
            </div>
        </div>
    )
}

export default connect(state => ({
    user: state.user.user
}), null)(InsertNewAnime)
