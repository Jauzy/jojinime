import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import animeAction from '../../../Modules/Redux/Actions/Anime'
import scheduleAction from '../../../Modules/Redux/Actions/Schedule'
import Cookies from 'universal-cookie'
import LoadingOverlay from 'react-loading-overlay';
import swal from 'sweetalert'

const COLORS = require('../../../Constants/Colors')
const cookies = new Cookies()

let ScheduleManager = (props) => {
    const { detail, loading, loading_sche, schedule } = props
    const [state, setState] = useState({
        mal_id: '', mal_id_valid: false,
        day: 'Senin'
    })

    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value.toString(), mal_id_valid: false })
    }

    const searchMALID = async () => {
        await props.getAnime(state.mal_id, null)
    }

    useEffect(() => {
        if (detail) {
            setState({ ...state, mal_id_valid: true })
        }
    }, [detail])

    useEffect(() => {
        props.getFullSchedule()
        document.title = 'Jojinime - Schedule Manager'
        document.getElementById('navbarContainer').style.backgroundColor = '#343A40'
    }, [])

    const dayInAWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Random']

    return (
        <div className='text-white'>
            <div className='shape-wave-top'></div>
            <div className='container bg-dark' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black', marginBottom: '150px' }}>

                <LoadingOverlay
                    active={props.loading_sche}
                    spinner
                    text='Loading your content...'>
                    <div style={{ backgroundColor: '#2D2D2D', borderRadius: '20px' }} className='p-4 '>

                        <div className='d-flex'>
                            <div>
                                <h4>Schedule Manager</h4>
                                <h6 className='text-white'>Logged in as <i className='fa fa-user-circle mx-2' />Admin {cookies.get("user").nickname}</h6>
                            </div>
                            <i className='fa fa-eye ml-auto my-auto' />
                        </div>
                        <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                        <div className='d-flex flex-wrap justify-content-center mt-4'>
                            {dayInAWeek.map((item, index) => (
                                <div style={{ width: '250px' }} className='my-2 mx-1 scheduleContainer' key={index + 'keyscheduleday'}>
                                    <div className='text-center bg-secondary text-white rounded-lg pb-1' style={{ paddingTop: '10px' }}>
                                        <h6>{item}</h6>
                                    </div>
                                    <div className='text-center mt-2 schedule-list'>
                                        {schedule?.filter(day => day.day == item).map((item, index) => (
                                            <Link className='text-decoration-none text-white' key={index + 'keyschedule'} to={`/anime/${item.mal_id}`}>
                                                <div className='border-bottom mb-2 py-2' style={{ borderRadius: '20px' }}>
                                                    {item.title}
                                                    <Link className='text-white text-decoration-none'
                                                        onClick={() => {
                                                            swal({
                                                                title: "Are you sure?",
                                                                text: "You\'re about to delete this schedule!",
                                                                icon: "warning",
                                                                buttons: true,
                                                                dangerMode: true,
                                                            })
                                                                .then((willDelete) => {
                                                                    if (willDelete) {
                                                                        props.deleteSchedule(item.mal_id)
                                                                    }
                                                                });
                                                        }}
                                                    ><i className='fa fa-times ml-2' /></Link>
                                                </div>
                                            </Link>
                                        ))}
                                        <Link className='text-white text-decoration-none'>
                                            <div className='border-bottom mb-2 py-2' style={{ borderRadius: '20px' }} data-toggle="modal" data-target="#scheduleModal"
                                                onClick={() => setState({ ...state, day: item })}
                                            >
                                                <i className='fa fa-plus' />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </LoadingOverlay>

                <div class="modal fade" id="scheduleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content bg-dark">
                            <div class="modal-header">
                                <h5 class="modal-title">Add New Schedule</h5>
                                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="">
                                    <label for="mal_id">Input: <strong>mal_id</strong></label>
                                    <div className='input-group'>
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i className='fa fa-file-video' /></div>
                                        </div>
                                        <input type="text" class={"form-control bg-dark text-white " + (state.mal_id_valid ? 'is-valid' : '')} placeholder='Mal_ID' id="mal_id" onChange={onChange} value={state.mal_id} />
                                        <button className='btn btn-primary' onClick={searchMALID}>
                                            {loading && <div class="spinner-border mr-3" style={{ width: '20px', height: '20px' }} role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div>}
                                        Search
                                        </button>
                                        <div class="valid-feedback">
                                            mal_id found For {detail?.title}
                                        </div>
                                    </div>
                                </div>
                                <div class="my-3" >
                                    <label for="mal_id">Input: <strong>day</strong></label>
                                    <div className='input-group'>
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><i className='fa fa-file-video' /></div>
                                        </div>
                                        <select class="form-control" onChange={onChange} id='day' value={state.day} disabled>
                                            {dayInAWeek.map(item => (
                                                <option value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" disabled={!state.mal_id_valid}
                                    onClick={() => {
                                        props.addNewSchedule(state.mal_id, state.day)
                                    }}
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.anime.loading,
        loading_sche: state.schedule.loading,
        detail: state.anime.detail,
        schedule: state.schedule.schedule,
        error: state.anime.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAnime: (mal_id, history) => dispatch(animeAction.getAnimeFromDB(mal_id, history)),
        getFullSchedule: () => dispatch(scheduleAction.getFullSchedule()),
        addNewSchedule: (mal_id, day) => dispatch(scheduleAction.addNewSchedule(mal_id, day)),
        deleteSchedule: (mal_id) => dispatch(scheduleAction.deleteSchedule(mal_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ScheduleManager))