import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { joinRoom, publicMsgs } from '../../static/redux/Actions/utils'
import { Link } from 'gatsby'

function chatInit(selector) {
    let chat = document.querySelector(selector);
    let toggles = chat.querySelectorAll('.toggle')
    let close = chat.querySelector('.close-chat')

    // window.setTimeout(() => {
    //     chat.classList.add('is-active')
    // }, 1000)

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            chat.classList.add('is-active')
        })
    })

    close.addEventListener('click', () => {
        chat.classList.remove('is-active')
    })

    document.onkeydown = function (evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            chat.classList.remove('is-active')
        }
    };
}

const ChatWidget = props => {
    const { user, socket, roomUsers, publicMSGS } = props

    const outputMessage = (message) => {
        const div = document.createElement('div')
        if (user && message.user?.nickname === user.nickname)
            div.classList.add('message')
        else {
            div.classList.add('message')
            div.classList.add('reply')
        }
        div.innerHTML = `
            <a class='text-decoration-none text-${user && message.user?.nickname === user.nickname ? 'light' : 'dark'}' href='/user/public_profile?id=${message.user?._id}'>
                <h6 class='font-weight-bold'>${message?.user?.nickname ? message?.user?.nickname : message?.user}
                    <small className='ml-2'> ${message?.time}</small>
                </h6>
            </a>
            <p className="text mb-0 pb-0">
                ${message?.text}
            </p>
        `
        document.querySelector('.chat-messages').appendChild(div)
        document.querySelector('.chat-app_content').scrollTop = document.querySelector('.chat-messages').scrollHeight
    }

    const [state, setState] = useState({
        newMessage: ''
    })

    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const onSend = () => {
        const msg = state.newMessage
        socket.emit('chatMessage', user, msg, 'Public')
        setState({ ...state, newMessage: '' })
    }

    useEffect(() => {
        chatInit('#chat-app')
    }, [])

    useEffect(() => {
        if (publicMSGS) {
            publicMSGS.map(data => outputMessage(data))
        }
    }, [publicMSGS])

    useEffect(() => {
        if (socket) {
            if (!roomUsers) {
                socket.emit('joinRoom', { username: user?.nickname || 'Guest', room: 'Public' })
            }
        }
    }, [socket])

    useEffect(() => {
        if (socket) {
            socket.on("recoverMessage", data => {
                if (data) {
                    publicMsgs(props.dispatch, data)
                }
            });
            socket.on("message", data => {
                if (data)
                    outputMessage(data)
            });
            socket.on("roomUsers", data => {
                joinRoom(props.dispatch, data)
            });
        }
    }, [])

    return (
        <div>
            <div id="chat-app" className="chat-app">

                <div className="chat-app_toggle toggle">
                    <div className="icon send" onClick={onSend}>
                        <i className="fas fa-paper-plane"></i>
                    </div>
                    <div className="icon open">
                        <i className="fas fa-comment"></i>
                    </div>
                </div>

                <div className="chat-app_box">
                    <div className="chat-app_header">

                        <div className="close-chat"></div>

                        <div className="branding">
                            {/* <div className="avatar is-online">
                                <img src="https://placeimg.com/64/64/any" alt="" />
                            </div> */}

                            <div className="content">
                                <h3 className='font-weight-bold mb-0'>Public Room</h3>
                                <p className="subtitle"><strong>{roomUsers?.users.length}</strong> Users Online <i className='fa fa-circle' style={{color:'#0CC243'}} /></p>
                            </div>

                        </div>

                    </div>

                    <div className="chat-app_content">
                        <div className="messages chat-messages py-4" id='chat-box'>

                            {/* <div className="message reply">
                                <h6 className='font-weight-bold'>Weeb Developer<small className='text-secondary ml-2'>15m</small></h6>
                                <p className="text mb-0 pb-0">
                                    Request Rekomendasi Anime Ecchi Dong
                                </p>
                            </div> */}

                            {/* <div className="message">
                                <h6 className='font-weight-bold'>You<small className='ml-2'>15m</small></h6>
                                <p className="text mb-0 pb-0">
                                    Tobat Anying
                                </p>
                            </div> */}

                        </div>
                    </div>

                    <div className="chat-app_footer">
                        <div className="tools">
                            {/* <a className="button-icon">
                                <i className="far fa-smile-wink"></i>
                            </a>
                            <a className="button-icon">
                                <i className="fas fa-paperclip"></i>
                            </a> */}
                            <a className="copyright">
                                Powered by Jojinime
                            </a>
                        </div>
                        <input className="chat-input" id='newMessage' value={state.newMessage} onKeyDown={(e) => {
                            if (e.key === 'Enter') onSend()
                        }} onChange={onChange} type="text" placeholder="Type..." />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default connect(state => ({
    user: state.user.user,
    socket: state.utils.socket,
    loading: state.user.loading,
    roomUsers: state.utils.roomUsers,
    publicMSGS: state.utils.publicMSGS
}), null)(ChatWidget)