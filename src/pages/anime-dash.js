import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import * as queryString from "query-string";
import swal from 'sweetalert'

import { Layout, SEO } from '../components/Index'
import genres from '../../static/constants/Genres'
import { getAnimeById, updateInfo, deleteAnime } from '../../static/redux/Actions/anime'
import { getEpisodes, addEpisode, updateInfoEps, deleteEps } from '../../static/redux/Actions/episode'
import { SittingSvg } from '../components/SVG/Index'

import ReactTimeAgo from 'react-time-ago'
import Select from 'react-select'
import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black'
    }),
}

const defaultEpisode = {
    title: '', desc: '', stream_360: '', stream_480: '', stream_720: '',
}

const AnimeDashboard = props => {
    const { anime, navigate, user, episodes } = props
    const [state, setState] = useState({
        cover_image: '', title: '', title_english: '', title_japan: '',
        rating: '', score: '', duration: '', total_episode: '', status: '',
        airing: '', studio: '', genre: [], type: '', synopsis: '', batch_360: '',
        batch_480: '', batch_720: '',

        isModalOpen: false, isModalAddEpisodeOpen: false
    })

    const [episode, setEps] = useState({
        title: '', desc: '', stream_360: '', stream_480: '', stream_720: '',
    })

    const [update, setUpd] = useState({
        title: '', desc: '', stream_360: '', stream_480: '', stream_720: '',
    })

    const modalToggle = () => {
        setState({ ...state, isModalOpen: !state.isModalOpen })
    }

    const modalToggleAddEpisode = () => {
        setState({ ...state, isModalAddEpisodeOpen: !state.isModalAddEpisodeOpen })
    }

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value.toString() })
    }

    const onChangeEps = e => {
        setEps({ ...episode, [e.target.id]: e.target.value.toString() })
    }

    const onChangeUpd = e => {
        setUpd({ ...update, [e.target.id]: e.target.value.toString() })
    }

    const onUpdate = () => {
        updateInfo(props.dispatch, queryString.parse(props.location.search).id, state)
    }

    const onDelete = () => {
        deleteAnime(props.dispatch, queryString.parse(props.location.search).id)
    }

    const onAddNewEps = () => {
        addEpisode(props.dispatch, queryString.parse(props.location.search).id, episode)
        setEps({ ...defaultEpisode })
        modalToggleAddEpisode()
    }

    const onUpdateEps = (episodeID) => {
        updateInfoEps(props.dispatch, episodeID, queryString.parse(props.location.search).id, update)
        setUpd({ ...defaultEpisode })
    }

    const onDeleteEps = (episodeID) => {
        deleteEps(props.dispatch, episodeID, queryString.parse(props.location.search).id)
    }

    useEffect(() => {
        if (user && !user?.admin) navigate('/')
    }, [user])

    useEffect(() => {
        setState({ ...anime })
    }, [anime])

    useEffect(() => {
        getAnimeById(props.dispatch, queryString.parse(props.location.search).id)
        getEpisodes(props.dispatch, queryString.parse(props.location.search).id)
    }, [])

    return (
        <Layout navigate={navigate} navbarColor={COLORS.DARKSECONDARY}>
            <SEO title={anime?.title + ' Dashboard'} />
            <div>

                <div className='text-white container-fluid mt-5' style={{ overflowX: 'hidden' }}>
                    <div className='row' style={{ backgroundColor: COLORS.DARKSECONDARY }}>
                        <div className='col-md d-flex'>
                            <div className='m-auto'>
                                <div className='row'>
                                    <div className='col-md-auto d-flex'>
                                        <Link className='m-3 steam-game-container text-white m-auto' to={ROUTES.ANIMEPAGE + `?id=${anime?._id}`}>
                                            <div class="b-game-card">
                                                <div class="b-game-card__cover rounded-lg" style={{ backgroundImage: `url(${anime?.cover_image})` }}>
                                                    <div className='list-card'>
                                                        <div className='list-bg py-1 px-3 bg-dark'><i className='fa fa-eye mr-2' />{anime?.total_episode} Episode</div>
                                                        <div className='list-bg py-1 px-3'><i className='fa fa-eye mr-2' />{anime?.total_episode} Episode</div>
                                                        <div className='list-bg list-score py-1 px-3 bg-dark'><i className='fa fa-star mr-2' />{anime?.score}</div>
                                                        <div className='list-bg list-score py-1 px-3'><i className='fa fa-star mr-2' />{anime?.score}</div>
                                                        <div className='list-bg list-title text-truncate bg-dark p-2'>{anime?.title}</div>
                                                        <div className='list-bg list-title text-truncate p-2'>{anime?.title}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className='col-md d-flex'>
                                        <div className='m-auto py-5' style={{ maxWidth: '500px' }}>
                                            <h6>{anime?.title} / Dashboard</h6>
                                            <h1 className='font-weight-bold'>{anime?.title}</h1>
                                            <button className='btn btn-main mx-2' onClick={modalToggle}>Edit Info</button>
                                            <button className='btn btn-danger mx-2' onClick={() => {
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "You're about to delete this anime!",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                })
                                                    .then((willDelete) => {
                                                        if (willDelete) {
                                                            onDelete()
                                                        }
                                                    });
                                            }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-5'>
                            <SittingSvg />
                        </div>
                    </div>
                </div>

                <div className='p-4' style={{ backgroundColor: COLORS.LIGHTSECONDARY }}>
                    <div className='my-3 d-flex flex-wrap align-items-center'>
                        <h1 className='mr-auto font-weight-bold'>Episodes List</h1>
                        <button className='btn btn-main' onClick={modalToggleAddEpisode}>
                            <i className='fa fa-plus mr-2' />Add New Episode</button>
                    </div>
                    <div className='row'>
                        {episodes?.map(eps => (
                            <div className='col-lg-4'>
                                <div className='episode-card shadow rounded-lg p-3 mx-3 my-2' style={{ cursor: 'pointer' }}
                                    onClick={() => setUpd({ ...eps })} data-target={`#modal${eps.title.replace(/\s+/g, '-')}`} data-toggle='modal'>
                                    <small>{anime?.title_japan}
                                        <strong className='text-secondary'><i className='fa fa-clock mr-1 ml-2' /><ReactTimeAgo date={new Date(eps.date_uploaded)} /></strong>
                                    </small><br />
                                    <h4 className='mb-1'>{anime?.title} {eps.title}</h4>
                                    <h6>{eps.desc || 'Not Set'}</h6>
                                </div>

                                <div className="modal fade" id={`modal${eps.title.replace(/\s+/g, '-')}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="modal-header align-items-center">
                                                <h5 className="modal-title">Edit {anime?.title} {eps?.title}</h5>
                                                <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="modal-body">

                                                <FormGroup>
                                                    <Label for="episode_title">Episode Title</Label>
                                                    <Input invalid={update.title === ''} onChange={onChangeUpd} id='title' value={update.title} />
                                                    <FormFeedback invalid>Required! Episode Title Cant Be Change After Submit!</FormFeedback>
                                                    <FormText>Ex: Episode 1, Episode 2, Ova 1, etc.</FormText>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="episode_desc">Episode Desc</Label>
                                                    <Input onChange={onChangeUpd} id='desc' value={update.desc} />
                                                    <FormText>Optional, Look for Episode Desc in MAL.</FormText>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="stream_360">Stream 360p Link</Label>
                                                    <Input invalid={update.stream_360 === ''} onChange={onChangeUpd} id='stream_360' value={update.stream_360} />
                                                    <FormFeedback invalid>Required!</FormFeedback>
                                                    <FormText>Streaming Link Url.</FormText>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="stream_480">Stream 480p Link</Label>
                                                    <Input invalid={update.stream_480 === ''} onChange={onChangeUpd} id='stream_480' value={update.stream_480} />
                                                    <FormFeedback invalid>Required!</FormFeedback>
                                                    <FormText>Streaming Link Url.</FormText>
                                                </FormGroup>

                                                <FormGroup>
                                                    <Label for="stream_720">Stream 720p Link</Label>
                                                    <Input invalid={update.stream_720 === ''} onChange={onChangeUpd} id='stream_720' value={update.stream_720} />
                                                    <FormFeedback invalid>Required!</FormFeedback>
                                                    <FormText>Streaming Link Url.</FormText>
                                                </FormGroup>

                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => {
                                                    onDeleteEps(eps?._id)
                                                }}>Delete</button>
                                                <button type="button" className="btn btn-primary" data-dismiss="modal" disabled={state.anime_title?.length < 2}
                                                    onClick={() => {
                                                        onUpdateEps(eps?._id)
                                                    }}
                                                >Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    {episodes?.length < 1 && <div>
                        <h1 className='text-center font-weight-bold my-4'>There's no Episodes Yet.</h1>
                    </div>}
                </div>

            </div>

            <Modal isOpen={state.isModalAddEpisodeOpen} toggle={modalToggleAddEpisode} scrollable={true} centered={true} id='add-eps' className='modal-custom' size='md'>
                <ModalHeader toggle={modalToggleAddEpisode} className='align-items-center'>Add New Episode</ModalHeader>
                <ModalBody className=''>

                    <FormGroup>
                        <Label for="episode_title">Episode Title</Label>
                        <Input invalid={episode.title === ''} onChange={onChangeEps} id='title' value={episode.title} />
                        <FormFeedback invalid>Required! Episode Title Cant Be Change After Submit!</FormFeedback>
                        <FormText>Ex: Episode 1, Episode 2, Ova 1, etc.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="episode_desc">Episode Desc</Label>
                        <Input onChange={onChangeEps} id='desc' value={episode.desc} />
                        <FormText>Optional, Look for Episode Desc in MAL.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="stream_360">Stream 360p Link</Label>
                        <Input invalid={episode.stream_360 === ''} onChange={onChangeEps} id='stream_360' value={episode.stream_360} />
                        <FormFeedback invalid>Required!</FormFeedback>
                        <FormText>Streaming Link Url.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="stream_480">Stream 480p Link</Label>
                        <Input invalid={episode.stream_480 === ''} onChange={onChangeEps} id='stream_480' value={episode.stream_480} />
                        <FormFeedback invalid>Required!</FormFeedback>
                        <FormText>Streaming Link Url.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="stream_720">Stream 720p Link</Label>
                        <Input invalid={episode.stream_720 === ''} onChange={onChangeEps} id='stream_720' value={episode.stream_720} />
                        <FormFeedback invalid>Required!</FormFeedback>
                        <FormText>Streaming Link Url.</FormText>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-main' onClick={onAddNewEps}>
                        Submit Eps
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={state.isModalOpen} toggle={modalToggle} scrollable={true} centered={true} id='edit-info' className='modal-custom' size='md'>
                <ModalHeader toggle={modalToggle} className='align-items-center'>Edit Info {anime?.title}</ModalHeader>
                <ModalBody className=''>

                    <FormGroup>
                        <Label for="cover_image">Cover Image</Label>
                        <Input invalid={state.cover_image === ''} onChange={onChange} id='cover_image' value={state.cover_image} />
                        <FormFeedback invalid>Required!</FormFeedback>
                        <FormText>Anime Cover Image Link Url</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="title">Anime Title</Label>
                        <Input invalid={state.title === ''} onChange={onChange} id='title' value={state.title} />
                        <FormFeedback invalid>Required!</FormFeedback>
                        <FormText>Ex: Overlord, Renai Boukun, etc.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="title_english">Title English</Label>
                        <Input invalid={state.title_english === ''} onChange={onChange} id='title_english' value={state.title_english} />
                        <FormFeedback invalid>Required!</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="title_japan">Title Japan</Label>
                        <Input invalid={state.title_japan === ''} onChange={onChange} id='title_japan' value={state.title_japan} />
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
                        value={{ value: state.rating, label: state.rating }}
                        options={['G - Semua Umur', 'PG - Children', 'PG-13 - Teens 13 or older', 'R-17+ - (Violence & Profanity)',
                            'R+ - Mild Nudity', 'Rx - Hentai', 'None'].map(item => ({ value: item, label: item }))} F
                    />
                    <FormText>Required: Age Restriction</FormText>

                    <FormGroup className='mt-3'>
                        <Label for="score">Score</Label>
                        <Input invalid={state.score === ''} onChange={onChange} id='score' value={state.score} />
                        <FormFeedback invalid>Required!</FormFeedback>
                    </FormGroup>

                    <FormGroup>
                        <Label for="total_episode">Total Episodes</Label>
                        <Input invalid={state.total_episode === ''} onChange={onChange} id='total_episode' value={state.total_episode} />
                        <FormFeedback invalid>Required!</FormFeedback>
                        <FormText>Ex: Fill ? if Anime is Ongoing</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="duration">Duration</Label>
                        <Input invalid={state.duration === ''} onChange={onChange} id='duration' value={state.duration} />
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
                        value={{ value: state.status, label: state.status }}
                        options={['Ongoing', 'Completed'].map(item => ({ value: item, label: item }))}
                    />
                    <FormText>Required: Age Restriction</FormText>

                    <FormGroup className='mt-3'>
                        <Label for="airing">Airing</Label>
                        <Input invalid={state.airing === ''} onChange={onChange} id='airing' value={state.airing} />
                        <FormFeedback invalid>Required!</FormFeedback>
                        <FormText>From date to date.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="studio">Studio</Label>
                        <Input invalid={state.studio === ''} onChange={onChange} id='studio' value={state.studio} />
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
                        value={state.genre?.map(item => ({ value: item, label: item }))}
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
                        value={{ value: state.type, label: state.type }}
                        options={['TV', 'Movie'].map(item => ({ value: item, label: item }))}
                    />

                    <Label for="sysnopsis" className='mt-3'>Synopsis</Label>
                    <Input type="textarea" id="synopsis" onChange={onChange} value={state.synopsis} />

                    <FormGroup className='mt-3'>
                        <Label for="batch_360">Batch 360 Link</Label>
                        <Input onChange={onChange} id='batch_360' value={state.batch_360} />
                        <FormText>Link batch download.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="batch_480">Batch 480 Link</Label>
                        <Input onChange={onChange} id='batch_480' value={state.batch_480} />
                        <FormText>Link batch download.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="batch_720">Batch 720 Link</Label>
                        <Input onChange={onChange} id='batch_720' value={state.batch_720} />
                        <FormText>Link batch download.</FormText>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-main' onClick={onUpdate}>
                        Update Info
                    </button>
                </ModalFooter>
            </Modal>

        </Layout>
    )
}

export default connect(state => ({
    user: state.user.user,
    anime: state.anime.anime,
    episodes: state.episode.episodes,
}), null)(AnimeDashboard)