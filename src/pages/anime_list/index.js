import React, { useEffect, useState } from 'react'
import anime from 'animejs'
import { Container } from 'reactstrap'
import { Link } from 'gatsby'
import { connect } from 'react-redux'
import { Layout, SEO } from "../../components/Index"
import genres from '../../../static/constants/Genres'
import { getAnimes } from '../../../static/redux/Actions/anime'
import { SittingSvg } from '../../components/SVG/Index'
import $ from 'jquery'
import Parallax from 'parallax-js'

import { SteamGame } from '../../components/Cards/Index'
const COLORS = require('../../../static/constants/Colors')
const ROUTES = require('../../../static/constants/Routes')

const Combined = (props) => {
    const { user, anime_list } = props
    const firstLetter = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
    const [mode, setMode] = useState('list')
    const [width, setWidth] = useState(1000)

    useEffect(() => {
        anime({
            targets: '#anime-wrapper',
            translateX: [-1000, 0],
            duration: 2000
        });
        getAnimes(props.dispatch)
    }, [])

    useEffect(() => {
        if (window && $(window)) {
            setWidth($(window).width())
            if (mode === 'library') {

                function updateSize() {
                    setWidth($(window).width())
                }
                window.addEventListener('resize', updateSize);

                var makeWinHeight = function () {
                    var vh = $(window).height();
                    var projects = vh / 2;
                    $('#scene, .layer.main').height(vh);
                    $('#scene .col a, #scene .col').height(projects);
                }
                $(document).ready(function () {
                    makeWinHeight();

                });
                $(window).resize(function () {
                    makeWinHeight();
                });

                var scene = document.getElementById('scene');
                var parallax = new Parallax(scene, {
                    hoverOnly: true
                });
            }
        }
    }, [mode])

    return (
        <Layout navigate={props.navigate} navbarColor={COLORS.LIGHTSECONDARY}>
            <SEO title='Anime List' />
            {mode === 'list' && <div>
                <div className='shape-wave-top'></div>

                <Container>
                    <div className='container bg-dark ' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black', }} id='anime-wrapper'>
                        <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4'>
                            <div className='row'>
                                <div className='col-lg'>
                                    <div className='d-flex align-items-center flex-wrap'>
                                        <div>
                                            <h4>Anime List Subtitle Indonesia</h4>
                                            <h5>アニメ一覧</h5>
                                        </div>
                                        {width > 992 && <button className='ml-auto btn btn-main' onClick={() => setMode('library')}><i className='fa fa-photo-video mr-2' />Change to Library</button>}
                                    </div>
                                    <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                                    <div className='d-flex flex-wrap justify-content-center mb-3'>
                                        <a className='btn btn-secondary m-1 p-0 d-flex' style={{ width: '25px', height: '25px', fontSize: 'auto' }} href='#Sec'>
                                            <small className='m-auto'>#</small>
                                        </a>
                                        {firstLetter.split(" ").map((item) => (
                                            <a className='btn btn-secondary m-1 p-0 d-flex' key={item + 'box'} style={{ width: '25px', height: '25px', fontSize: 'auto' }}
                                                href={'#' + item + '-section'}
                                            >
                                                <small className='m-auto'>{item}</small>
                                            </a>
                                        ))}
                                    </div>

                                    {firstLetter.split(" ").map(item => (
                                        <section className='px-3 font-open-sans' id={item + '-section'} key={item + '-section'}>
                                            <h6 className='text-left font-weight-bold'>{item}</h6>
                                            <hr style={{ borderWidth: '2px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />
                                            <ul className='two-column'>
                                                {anime_list?.filter(anime => anime.title.charAt(0) === item).map((anime) => (
                                                    <small className='font-weight-bol' key={anime.title}>
                                                        <li>
                                                            <Link className='text-decoration- text-white' to={`${ROUTES.ANIMEPAGE}?id=${anime._id}`}>{anime.title}</Link>
                                                            {user?.favourite?.filter(fav => fav._id === anime._id)[0] && <i className='fa fa-heart text-danger ml-1' style={{ fontSize: '10px' }} />}
                                                            {anime.type === 'Movie' && <strong className='text-secondary'> : Movie</strong>}
                                                            {anime.status === 'Ongoing' && <strong className='text-main'> : Ongoing</strong>}
                                                        </li>
                                                    </small>
                                                ))}
                                            </ul>
                                        </section>
                                    ))}
                                </div>
                                <div className='col-lg-4'>
                                    <div className=''>
                                        <div className='rounded-lg'>
                                            <SittingSvg />
                                        </div>
                                        <div className='p-3 bg-dark'>
                                            <h6>Genre:</h6>
                                            {genres.map((item) => (
                                                <Link className='btn btn-main m-1' key={item + '-genre'} to={ROUTES.SEARCHGENRE} state={{ genre: item }} >{item}</Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>

                <div className='shape-wave-bottom'></div>
            </div>}

            {mode === 'library' && <section id="scene" data-pointer-events="true" data-x-origin="0.5" data-y-origin="0.5" data-scalar-y="150.0" data-scalar-x="100.0" data-friction-x="0.05" data-friction-y="0.05">
                <div className="layer main" data-depth="1.0">
                    <div style={{ fontSize: '10vw' }} className='text-center font-weight-bold'>JOJINIME<strong className='text-main'>.</strong></div>
                    <div className='d-flex par-title'>
                        <h4 className='mx-auto'>@{new Date().getFullYear()} Jojinime Anime Discovery AllRights Reserved.</h4>
                    </div>

                    <div className='d-flex par-title mb-3'>
                        <button className='btn btn-main ml-auto' style={{ width: '300px' }}
                            onClick={() => setMode('list')}>
                            <i className='fa fa-list mr-3' />Change Mode to List
                        </button>
                    </div>

                    <div className='d-flex align-items-center par-title'>
                        <i className='fa fa-circle text-main' />
                        <h1 className='ml-3' style={{ width: '440px' }}><strong>All Animes</strong></h1>
                        <div className='rounded-lg bg-secondary w-100 mx-4' style={{ height: '5px', width: 'auto' }}></div>
                        <button className='btn btn-main ml-auto' style={{ width: '300px' }} onClick={() => {
                            $('#all-animes').slideToggle()
                        }}>
                            Toggle View <i className='ml-2 fa fa-eye' />
                        </button>
                    </div>
                    <div id='all-animes'>
                        {anime_list?.map(anime => (
                            <div className="par-col">
                                <SteamGame anime={anime} />
                            </div>
                        ))}
                    </div>

                    <div className='d-flex align-items-center par-title'>
                        <i className='fa fa-circle text-main' />
                        <h1 className='ml-3' style={{ width: '440px' }}><strong>All Movies</strong></h1>
                        <div className='rounded-lg bg-secondary w-100 mx-4' style={{ height: '5px', width: 'auto' }}></div>
                        <button className='btn btn-main ml-auto' style={{ width: '300px' }} onClick={() => {
                            $('#all-movies').slideToggle()
                        }}>
                            Toggle View <i className='ml-2 fa fa-eye' />
                        </button>
                    </div>
                    <div id='all-movies'>
                        {anime_list?.filter(anime => anime.type === 'Movie').map(anime => (
                            <div className="par-col">
                                <SteamGame anime={anime} />
                            </div>
                        ))}
                    </div>

                    <div className='d-flex align-items-center par-title'>
                        <i className='fa fa-circle text-main' />
                        <h1 className='ml-3' style={{ width: '440px' }}><strong>All Ongoings</strong></h1>
                        <div className='rounded-lg bg-secondary w-100 mx-4' style={{ height: '5px', width: 'auto' }}></div>
                        <button className='btn btn-main ml-auto' style={{ width: '300px' }} onClick={() => {
                            $('#all-ongoings').slideToggle()
                        }}>
                            Toggle View <i className='ml-2 fa fa-eye' />
                        </button>
                    </div>
                    <div id='all-ongoings'>
                        {anime_list?.filter(anime => anime.status === 'Ongoing').map(anime => (
                            <div className="par-col">
                                <SteamGame anime={anime} />
                            </div>
                        ))}
                    </div>

                </div>
            </section>}

        </Layout >
    )
}

export default connect(state => ({
    user: state.user.user,
    anime_list: state.anime.animes
}), null)(Combined)