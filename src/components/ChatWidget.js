import React, { useEffect, useState, useRef } from 'react'

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
    const { user } = props
    const chatMessage = useRef(null)
    
    const outputMessage = (message) => {
        const div = document.createElement('div')
        if (message.nickname === user.nickname)
            div.classList.add('message')
        else div.classList.add('message reply')
        div.innerHTML = `
            <h6 style='font-weight:bold'>${message.nickname}<small className='ml-2'> ${message.time}</small></h6>
            <p className="text mb-0 pb-0">
                ${message.text}
            </p>
        `
        document.querySelector('.chat-messages').appendChild(div)
    }

    const [state, setState] = useState({
        newMessage: ''
    })
    
    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const onSend = () => {
        // const msg = state.newMessage
        setState({ ...state, newMessage: null })
    }

    useEffect(() => {
        chatInit('#chat-app')
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
                                <p className="title mb-0">Chatroom</p>
                                <p className="subtitle">Diskusi apa saja dengan para pengunjung lainnya.</p>
                            </div>

                        </div>

                    </div>

                    <div className="chat-app_content">
                        <div className="messages chat-messages" ref={chatMessage}>

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
                            <a className="button-icon">
                                <i className="far fa-smile-wink"></i>
                            </a>
                            <a className="button-icon">
                                <i className="fas fa-paperclip"></i>
                            </a>
                            <a className="copyright">
                                Powered by Jojinime
                            </a>
                        </div>
                        <input className="chat-input" id='newMessage' value={state.newMessage} onChange={onChange} type="text" placeholder="Type..." />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChatWidget