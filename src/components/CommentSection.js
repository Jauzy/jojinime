import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'

const COLORS = require('../../static/constants/Colors')

const CommentCard = props => {
    const { likes, user, text, date } = props
    return (
        <div style={{ background: COLORS.SECONDARY }} className='d-flex shadow px-3 pt-3 pb-2 rounded-lg w-100 my-3'>
            <img src={user?.profile_pict ? user.profile_pict : "https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg"} width="50" height="50" className="rounded-circle" />
            <div className='mx-2 mb-2'>
                <Link className='d-flex flex-wrap text-decoration-none' to={`/profile/${user?._id}`}>
                    <h6 className='mx-1 font-weight-bold mb-0 text-main'>{user?.fullname}</h6>
                    <label className='mx-1 text-secondary mb-0'>@{user?.nickname}</label>
                    <label className='mx-1 text-secondary mb-0'>sehari lalu</label>
                </Link>
                <p className='mx-1 mb-2'>
                    {text}
                </p>
                <div className='d-flex mx-1'>
                    <Link className='text-decoration-none text-main mx-1'>
                        <i className='fa fa-heart mr-2' />
                        {likes.length} Like
                    </Link>
                    <Link className='text-decoration-none text-main mx-1'>
                        <i className='fa fa-comment mr-2' />
                        Balas
                    </Link>
                </div>
            </div>
        </div>
    )
}

const CommentSection = props => {
    const { comments, episode, user } = props
    const [state, setState] = useState({
        newComment: null
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const onSubmit = () => {
        props.newComment(episode._id, state.newComment)
    }

    useEffect(() => {
        if (episode)
            props.getComments(episode._id)
    }, [episode])

    return (
        <div className='container py-5'>
            <div className='px-4'>
                <div className='d-flex flex-wrap'>
                    {/* <h6 className='m-2'><i className='fa fa-heart mr-2' />23 Like</h6> */}
                    <h6 className='m-2'><i className='fa fa-comment mr-2' />{comments?.length} Komentar</h6>
                </div>
                <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                {user && <div className='d-flex align-items-center'>
                    <img src={user?.profile_pict} width="50" height="50" className="rounded-circle" />
                    <div className="form-group mx-3 my-auto w-100">
                        <textarea className="form-control" rows="2" placeholder='ikut berdiskusi...' id='newComment' value={state.newComment} onChange={onChange}></textarea>
                    </div>
                    <button className='btn btn-main' onClick={onSubmit}><i className='fa fa-paper-plane' /></button>
                </div>}

                {comments?.map(item => (
                    <CommentCard user={item.user} text={item.text} likes={item.likes} date={item.date} />
                ))}

            </div>
        </div>
    )
}

export default CommentSection