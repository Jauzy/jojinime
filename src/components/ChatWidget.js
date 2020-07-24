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
        if (message.nickname == user.nickname)
            div.classList.add('message')
        else div.classList.add('message reply')
        div.innerHTML = `
            <h6 style='font-weight:bold'>${message.nickname}<small className='ml-2'> ${message.time}</small></h6>
            <p class="text mb-0 pb-0">
                ${message.text}
            </p>
        `
        document.querySelector('.chat-messages').appendChild(div)
    }

    const [state, setState] = useState({
        newMessage: null
    })
    
    const onChange = e => {
        setState({ ...state, [e.target.id]: e.target.value })
    }

    const onSend = () => {
        const msg = state.newMessage
        setState({ ...state, newMessage: null })
    }

    useEffect(() => {
        chatInit('#chat-app')
    }, [])

    return (
        <div>
            <div id="chat-app" class="chat-app">

                <div class="chat-app_toggle toggle">
                    <div class="icon send" onClick={onSend}>
                        <i class="fas fa-paper-plane"></i>
                    </div>
                    <div class="icon open">
                        <i class="fas fa-comment"></i>
                    </div>
                </div>

                <div class="chat-app_box">
                    <div class="chat-app_header">

                        <div class="close-chat"></div>

                        <div class="branding">
                            {/* <div class="avatar is-online">
                                <img src="https://placeimg.com/64/64/any" alt="" />
                            </div> */}

                            <div class="content">
                                <p class="title mb-0">Chatroom</p>
                                <p class="subtitle">Diskusi apa saja dengan para pengunjung lainnya.</p>
                            </div>

                        </div>

                    </div>

                    <div class="chat-app_content">
                        <div class="messages chat-messages" ref={chatMessage}>

                            {/* <div class="message reply">
                                <h6 className='font-weight-bold'>Weeb Developer<small className='text-secondary ml-2'>15m</small></h6>
                                <p class="text mb-0 pb-0">
                                    Request Rekomendasi Anime Ecchi Dong
                                </p>
                            </div> */}

                            {/* <div class="message">
                                <h6 className='font-weight-bold'>You<small className='ml-2'>15m</small></h6>
                                <p class="text mb-0 pb-0">
                                    Tobat Anying
                                </p>
                            </div> */}

                        </div>
                    </div>

                    <div class="chat-app_footer">
                        <div class="tools">
                            <a class="button-icon">
                                <i class="far fa-smile-wink"></i>
                            </a>
                            <a class="button-icon">
                                <i class="fas fa-paperclip"></i>
                            </a>
                            <a class="copyright">
                                Powered by Jojinime
                            </a>
                        </div>
                        <input class="chat-input" id='newMessage' value={state.newMessage} onChange={onChange} type="text" placeholder="Type..." />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChatWidget