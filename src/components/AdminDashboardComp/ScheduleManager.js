import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import { getAnimes } from '../../../static/redux/Actions/anime'
import { addSchedule, deleteSchedule, getFullSchedule } from '../../../static/redux/Actions/schedule'

const COLORS = require('../../../static/constants/Colors')

let ScheduleManager = (props) => {
    const { anime_list, schedules, user } = props
    const [state, setState] = useState({
        anime: anime_list?.[0]?._id,
        day: 'Senin'
    })

    const onChange = (e) => {
        setState({ ...state, [e.target.id]: e.target.value.toString() })
    }

    const onAdd = () => {
        addSchedule(props.dispatch, state)
        setState({ ...state, anime_title: anime_list?.[0]?.title, day: 'Senin' })
    }

    const onDel = (anime) => {
        deleteSchedule(props.dispatch, anime)
    }

    useEffect(() => {
        getAnimes(props.dispatch)
        getFullSchedule(props.dispatch)
    }, [])

    const dayInAWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu', 'Random']

    return (
        <div className='text-white'>
            <div className='shape-wave-top'></div>
            <div className='container bg-dark' style={{ borderRadius: '20px', boxShadow: '0px 0px 10px black', marginBottom: '150px' }}>

                <div style={{ backgroundColor: COLORS.DARKSECONDARY, borderRadius: '20px' }} className='p-4 '>

                    <div className='d-flex'>
                        <div>
                            <h4>Schedule Manager</h4>
                            <h6 className='text-white'>Logged in as <i className='fa fa-user-circle mx-2' />Admin {user?.fullname || user?.nickname}</h6>
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
                                    {schedules?.filter(day => day.day === item).map((item, index) => (
                                        <div className='text-decoration-none text-white' key={index + 'keyschedule'}>
                                            <div className='border-bottom mb-2 py-2 d-flex justify-content-center align-items-center' style={{ borderRadius: '20px' }}>
                                                {item.anime?.title}
                                                <div className='text-white text-decoration-none' style={{cursor:'pointer'}}
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
                                                                    onDel(item.anime?._id)
                                                                }
                                                            });
                                                    }}
                                                ><i className='fa fa-times ml-2' /></div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className='text-white text-decoration-none' style={{cursor:'pointer'}}>
                                        <div className='btn btn-main btn-block' style={{ borderRadius: '20px' }} data-toggle="modal" data-target="#scheduleModal"
                                            onClick={() => setState({ ...state, day: item })}
                                        >
                                            <i className='fa fa-plus' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal fade" id="scheduleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark">
                            <div className="modal-header align-items-center">
                                <h5 className="modal-title">Add New Schedule</h5>
                                <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="" >
                                    <label htmlFor="mal_id"><strong>Anime Title</strong></label>
                                    <div className='input-group'>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className='fa fa-heading' /></div>
                                        </div>
                                        <select className="form-control" onChange={onChange} id='anime' value={state.anime}>
                                            {anime_list?.map(item => (
                                                <option value={item._id}>{item.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="my-3" >
                                    <label htmlFor="mal_id"><strong>Day</strong></label>
                                    <div className='input-group'>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className='fa fa-calendar' /></div>
                                        </div>
                                        <select className="form-control" onChange={onChange} id='day' value={state.day} disabled>
                                            {dayInAWeek.map(item => (
                                                <option value={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" disabled={state.anime_title?.length < 2}
                                    onClick={onAdd}
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default connect(state => ({
    user: state.user.user,
    anime_list: state.anime.animes,
    schedules: state.schedule.schedules
}), null)(ScheduleManager)