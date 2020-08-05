import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { getComment, pushComment, pushLike, removeLike} from '../../static/redux/Actions/comment'
import { connect } from 'react-redux'

const COLORS = require('../../static/constants/Colors')

let CommentCard = props => {
    const { comment, anime, loggedInUser} = props
    const { user, likes, text } = comment

    const like = () => {
        if (comment._id)
            pushLike(props.dispatch, anime?._id, comment._id)
    }

    const removelike = () => {
        if (comment._id)
            removeLike(props.dispatch, anime?._id, comment._id)
    }

    return (
        <div style={{ background: COLORS.SECONDARY }} className='d-flex shadow px-3 pt-3 pb-2 rounded-lg w-100 my-3'>
            <img src={user?.profile_pict ? user.profile_pict : "https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg"} width="50" height="50" className="rounded-circle" />
            <div className='mx-2 mb-2'>
                <Link className='d-flex flex-wrap text-decoration-none' to={`/user/public_profile?id=${user?._id}`}>
                    {user?.admin && <h6 className='mx-1 text-danger mb-0'>Admin</h6>}
                    <h6 className='mx-1 font-weight-bold mb-0 text-main'>{user?.fullname || user?.nickname}</h6>
                    <label className='mx-1 text-secondary mb-0'>@{user?.nickname}</label>
                    <label className='mx-1 text-secondary mb-0'>{new Date(comment?.date).toLocaleDateString()}</label>
                </Link>
                <p className='mx-1 mb-2'>
                    {text}
                </p>
                <div className='d-flex mx-1'>
                    {likes?.findIndex(item => item === loggedInUser?._id) === -1 && <div className='mx-2 heart' style={{ cursor: 'pointer' }} onClick={like}>
                        <i className='fa fa-heart mr-2' />
                        {likes.length} Like
                    </div>}
                    {likes?.findIndex(item => item === loggedInUser?._id) !== -1 && <div className='mx-2 text-danger' style={{ cursor: 'pointer' }} onClick={removelike}>
                        <i className='fa fa-heart mr-2' />
                        {likes.length} Like
                    </div>}
                    <div className='mx-2 comment-ico' style={{cursor:'pointer'}} onClick={() => {
                        document.getElementById('newComment').value = `@${user.nickname} `
                        document.getElementById('newComment').focus()
                    }}>
                        <i className='fa fa-comment mr-2' />
                        Balas
                    </div>
                </div>
            </div>
        </div>
    )
}

CommentCard = connect(state => ({
    anime: state.anime.anime,
    loggedInUser : state.user.user
}), null)(CommentCard)

const CommentSection = props => {
    const { comments, anime, user } = props
    const [state, setState] = useState({
        newComment: ''
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const onSubmit = () => {
        pushComment(props.dispatch, anime?._id, state.newComment)
        setState({ ...state, newComment: '' })
    }

    useEffect(() => {
        if (anime)
            getComment(props.dispatch, anime?._id)
    }, [anime])

    return (
        <div className='container py-5'>
            <div className=''>
                <div className='d-flex flex-wrap'>
                    {/* <h6 className='m-2'><i className='fa fa-heart mr-2' />23 Like</h6> */}
                    <h6 className='m-2'><i className='fa fa-comment mr-2' />{comments?.length} Komentar</h6>
                </div>
                <hr style={{ borderWidth: '5px', borderColor: COLORS.MAIN }} className='rounded-lg mt-1' />

                {user && <div className='d-flex align-items-center'>
                    <img src={user?.profile_pict || 'https://storage.googleapis.com/file-upload-test-bucket/createit_default_profile_pict.svg'} width="50" height="50" className="rounded-circle" />
                    <div className="form-group mx-3 my-auto w-100">
                        <textarea className="form-control" rows="2" placeholder='ikut berdiskusi...' id='newComment' value={state.newComment} onChange={onChange}></textarea>
                    </div>
                    <button className='btn btn-main' onClick={onSubmit}><i className='fa fa-paper-plane' /></button>
                </div>}

                {comments?.map(item => (
                    <CommentCard comment={item} />
                ))}

            </div>
        </div>
    )
}

export default connect(state => ({
    anime: state.anime.anime,
    user: state.user.user,
    comments: state.comment.comments
}), null)(CommentSection)