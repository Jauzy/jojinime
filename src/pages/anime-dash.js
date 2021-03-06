import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'gatsby'
import * as queryString from "query-string";
import swal from 'sweetalert'
import axios from 'axios'

import { Layout, SEO } from '../components/Index'
import genres from '../../static/constants/Genres'
import { getAnimeById, updateInfo, deleteAnime } from '../../static/redux/Actions/anime'
import { getEpisodes } from '../../static/redux/Actions/episode'
import { SittingSvg } from '../components/SVG/Index'

import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select'

const COLORS = require('../../static/constants/Colors')
const ROUTES = require('../../static/constants/Routes')

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'white' : 'black'
    }),
}

const AnimeDashboard = props => {
    const { anime, navigate, user, episodes } = props
    const [state, setState] = useState({
        cover_image: '', title: '', title_english: '', title_japan: '',
        rating: '', score: '', duration: '', total_episode: '', status: '',
        airing: '', studio: '', genre: [], type: '', synopsis: '', batch_360: '',
        batch_480: '', batch_720: '',

        isModalOpen: false
    })

    const [update, setUpd] = useState({
        playlist_360: '', playlist_480: '', playlist_720: '', isPlaylistModalOpen: false
    })

    const [playlist, setPlaylist] = useState({
        playlist_360: [], playlist_480: [], playlist_720: []
    })

    const modalToggle = () => {
        setState({ ...state, isModalOpen: !state.isModalOpen })
    }

    const modalTogglePlaylist = () => {
        setUpd({ ...update, isPlaylistModalOpen: !update.isPlaylistModalOpen })
    }

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value.toString() })
    }

    const onChangeUpd = e => {
        setUpd({ ...update, [e.target.id]: e.target.value.toString() })
    }

    const onUpdatePlaylist = e => {
        updateInfo(props.dispatch, queryString.parse(props.location.search).id, update)
    }

    const onUpdate = () => {
        updateInfo(props.dispatch, queryString.parse(props.location.search).id, state)
    }

    const onDelete = () => {
        deleteAnime(props.dispatch, queryString.parse(props.location.search).id)
    }

    const retriveEpisodes = async (anime) => {
        if (anime) {
            let playlist_360 = null
            let playlist_480 = null
            let playlist_720 = null
            if (anime?.playlist_360)
                playlist_360 = await axios.get(anime?.playlist_360)
            if (anime?.playlist_480)
                playlist_480 = await axios.get(anime?.playlist_480)
            if (anime?.playlist_720)
                playlist_720 = await axios.get(anime?.playlist_720)

            setPlaylist({
                playlist_360: playlist_360 ? playlist_360.data?.playlist : [],
                playlist_480: playlist_480 ? playlist_480.data?.playlist : [],
                playlist_720: playlist_720 ? playlist_720.data?.playlist : []
            })
        }
    }

    useEffect(() => {
        if (user && !user?.admin) navigate('/')
    }, [user])

    useEffect(() => {
        setState({ ...anime })
        setUpd({
            playlist_360: anime?.playlist_360,
            playlist_480: anime?.playlist_480,
            playlist_720: anime?.playlist_720,
        })
        retriveEpisodes(anime)
    }, [anime])

    useEffect(() => {
        getAnimeById(props.dispatch, queryString.parse(props.location.search).id)
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
                                            <div className="b-game-card">
                                                <div className="b-game-card__cover rounded-lg" style={{ backgroundImage: `url(${anime?.cover_image})` }}>
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
                        <button className='btn btn-main' onClick={modalTogglePlaylist} style={{ cursor: 'pointer' }}>
                            <i className='fa fa-plus mr-2' />Update Playlist Link</button>
                    </div>

                    {[{ quality: '360', playlist: playlist.playlist_360 },
                    { quality: '480', playlist: playlist.playlist_480 },
                    { quality: '720', playlist: playlist.playlist_720 },].map(item => (
                        <div className='my-3'>
                            <h5 className='text-center'>{item.quality}P Quality</h5>
                            <hr style={{ borderColor: COLORS.MAIN }} />
                            <div className='row'>
                                {item.playlist?.map((item) => (
                                    <div className='col-xl-4'>
                                        <div className={`episode-card shadow rounded-lg p-3 mx-3 my-2`} style={{ cursor: 'pointer' }} key={'eps' + item.title}>
                                            <div className='row'>
                                                <div className='col-lg-auto d-flex justify-content-center align-items-center'>
                                                    <div>
                                                        <img src={item.image} width='150px' className='rounded-lg shadow-lg' />
                                                    </div>
                                                </div>
                                                <div className='col-lg d-flex align-items-center'>
                                                    <div>
                                                        <h6 className='text-secondary mb-0'>{anime?.title} - {anime?.title_japan}</h6>
                                                        <h4 className='mb-1'>{item.title.replace(/360|480|720|/gi, "").replace('Eps', "Episode")}</h4>
                                                        <h6>{item.description || 'Not Set'}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {(item.playlist?.length < 1 || !item.playlist) && <div>
                                <h1 className='text-center font-weight-bold my-4'>There's no Episodes Yet.</h1>
                            </div>}
                        </div>
                    ))}

                </div>

            </div>

            <Modal isOpen={update.isPlaylistModalOpen} toggle={modalTogglePlaylist} scrollable={true} centered={true} id='upd-playlist' className='modal-custom' size='md'>
                <ModalHeader toggle={modalTogglePlaylist} className='align-items-center'>Update Playlist Link</ModalHeader>
                <ModalBody className=''>

                    <FormGroup>
                        <Label for="playlist_360">Playlist 360</Label>
                        <Input onChange={onChangeUpd} id='playlist_360' value={update.playlist_360} />
                        <FormText>From JW Player Playlist.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="playlist_480">Playlist 480</Label>
                        <Input onChange={onChangeUpd} id='playlist_480' value={update.playlist_480} />
                        <FormText>From JW Player Playlist.</FormText>
                    </FormGroup>

                    <FormGroup>
                        <Label for="playlist_720">Playlist 720</Label>
                        <Input onChange={onChangeUpd} id='playlist_720' value={update.playlist_720} />
                        <FormText>From JW Player Playlist.</FormText>
                    </FormGroup>

                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-main' onClick={onUpdatePlaylist}>
                        Update Playlist
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