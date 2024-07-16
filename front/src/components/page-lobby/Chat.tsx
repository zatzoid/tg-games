import { useState } from 'react'
import style from './lobby.module.css'

interface props {
    messageList: Message[]
    sendMessage: (msg: string) => void
}

export interface Message {
    body: string
    sender: string
    time: string
}


export default function Chat(props: props) {
    const [newMessage, setNewMessage] = useState<string>('')

    function renderMessages(): JSX.Element[] | JSX.Element {

        if (props.messageList.length < 1) {
            return (<li className={style.messagePlaceholder}>
                <p className='main-context'> no messages</p>
            </li>)
        }
        else {
            return props.messageList.map((el) => {
                if (el.body === 'connected' || el.body === 'disconnected') {
                    return (
                        <li className={style.message} key={el.sender + el.time}>
                            <p className='main-context'><span className='green'>{el.sender}</span> is <span className={`${el.body === 'connected' ? 'green' : 'red'}`}>{el.body}</span>{el.time}</p>
                        </li>
                    )
                } else if (el.sender === 'system') {
                    return (
                        <li className={style.message} key={el.sender + el.time}>
                            <p className='main-context'>{el.sender}: {el.body}</p>
                        </li>
                    )
                }
                else {
                    return (
                        <li className={style.message} key={el.sender + el.time}>
                            <h4 >{el.sender}</h4>
                            <p className='main-context'>{el.time}</p>
                            <p>{el.body}</p>
                        </li>
                    )
                }

            })
        }
    }

    function keyDown(evt: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (evt.code === 'Enter') {
            (evt.target as HTMLTextAreaElement).form?.requestSubmit()
        }
    }
    function submit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault()
        props.sendMessage(newMessage)
        setNewMessage('')

    }


    return (
        <div className={style.chat}>
            <p className='main-context'>chat</p>

            <ul className={style.messageList}>
                {renderMessages()}
            </ul>
            <form onSubmit={submit} className={style.form} >
                <textarea onKeyDown={keyDown} onInput={(evt) => { setNewMessage((evt.target as HTMLTextAreaElement).value) }} value={newMessage} name="body" placeholder="send message" ></textarea>
                <button type="submit" disabled={newMessage.length < 1}>

                    <svg xmlns="http://www.w3.org/2000/svg" fill='red' xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" viewBox="0 0 256 256" xmlSpace="preserve">

                        <defs>
                        </defs>
                        <g
                            style={{
                                stroke: 'none',
                                strokeWidth: 0,
                                strokeDasharray: 'none',
                                strokeLinecap: 'butt',
                                strokeLinejoin: 'miter',
                                strokeMiterlimit: 10,
                                fillRule: 'nonzero',
                                opacity: 1,
                            }}
                            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                        >
                            <path d="M 89.981 6.2 C 90 6.057 90.001 5.915 89.979 5.775 c -0.003 -0.021 -0.001 -0.041 -0.005 -0.062 c -0.033 -0.163 -0.098 -0.317 -0.183 -0.462 c -0.009 -0.016 -0.01 -0.033 -0.019 -0.049 c -0.015 -0.024 -0.039 -0.036 -0.055 -0.059 c -0.034 -0.048 -0.06 -0.102 -0.101 -0.146 c -0.051 -0.056 -0.113 -0.097 -0.17 -0.144 c -0.031 -0.025 -0.058 -0.054 -0.09 -0.076 c -0.134 -0.093 -0.28 -0.164 -0.436 -0.209 c -0.028 -0.008 -0.056 -0.009 -0.084 -0.015 c -0.132 -0.03 -0.267 -0.041 -0.404 -0.034 c -0.046 0.002 -0.089 0.006 -0.135 0.012 c -0.039 0.006 -0.079 0.002 -0.118 0.01 l -87 19.456 c -0.611 0.137 -1.073 0.639 -1.159 1.259 c -0.085 0.62 0.224 1.229 0.775 1.525 l 23.523 12.661 l 7.327 23.36 c 0.008 0.025 0.025 0.043 0.034 0.067 c 0.021 0.056 0.052 0.106 0.08 0.16 c 0.059 0.114 0.127 0.218 0.211 0.312 c 0.022 0.025 0.03 0.057 0.054 0.08 c 0.022 0.021 0.05 0.028 0.073 0.048 c 0.099 0.086 0.207 0.155 0.325 0.213 c 0.047 0.023 0.088 0.053 0.136 0.07 c 0.164 0.061 0.336 0.1 0.517 0.1 c 0.011 0 0.022 0 0.033 0 c 0.179 -0.004 0.349 -0.044 0.509 -0.107 c 0.041 -0.016 0.075 -0.044 0.114 -0.063 c 0.127 -0.063 0.244 -0.139 0.349 -0.235 c 0.02 -0.018 0.046 -0.024 0.065 -0.044 l 12.009 -12.209 l 23.18 12.477 c 0.221 0.119 0.466 0.18 0.711 0.18 c 0.188 0 0.378 -0.035 0.557 -0.107 c 0.412 -0.164 0.73 -0.504 0.869 -0.926 L 89.93 6.473 c 0.014 -0.044 0.015 -0.09 0.025 -0.135 C 89.966 6.292 89.975 6.247 89.981 6.2 z M 77.435 10.018 L 25.58 36.717 L 5.758 26.047 L 77.435 10.018 z M 74.32 14.997 L 36.813 43.768 c -0.003 0.002 -0.005 0.006 -0.007 0.008 c -0.112 0.087 -0.209 0.194 -0.294 0.314 c -0.018 0.025 -0.035 0.05 -0.051 0.076 c -0.017 0.028 -0.039 0.052 -0.055 0.081 c -0.054 0.1 -0.093 0.204 -0.122 0.309 c -0.001 0.005 -0.005 0.009 -0.006 0.014 L 32.96 56.977 l -5.586 -17.809 L 74.32 14.997 z M 35.992 57.249 l 2.693 -10.072 l 4.717 2.539 L 35.992 57.249 z M 69.177 60.184 L 40.479 44.737 l 45.09 -34.588 L 69.177 60.184 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                            <path d="M 12.9 85.482 c -0.38 0 -0.76 -0.144 -1.052 -0.431 c -0.591 -0.581 -0.599 -1.53 -0.018 -2.121 l 14.292 -14.528 c 0.581 -0.592 1.531 -0.598 2.121 -0.018 c 0.591 0.581 0.599 1.53 0.018 2.121 L 13.97 85.034 C 13.676 85.333 13.288 85.482 12.9 85.482 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                            <path d="M 36.431 79.593 c -0.38 0 -0.76 -0.144 -1.052 -0.431 c -0.591 -0.581 -0.599 -1.53 -0.018 -2.121 l 14.291 -14.527 c 0.582 -0.591 1.531 -0.598 2.121 -0.018 c 0.591 0.581 0.599 1.53 0.018 2.121 L 37.501 79.145 C 37.207 79.443 36.819 79.593 36.431 79.593 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                            <path d="M 8.435 67.229 c -0.38 0 -0.76 -0.144 -1.052 -0.431 c -0.591 -0.581 -0.599 -1.53 -0.018 -2.121 l 10.445 -10.618 c 0.581 -0.591 1.531 -0.598 2.121 -0.018 c 0.591 0.581 0.599 1.53 0.018 2.121 L 9.505 66.78 C 9.211 67.079 8.823 67.229 8.435 67.229 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                        </g>
                    </svg>

                </button>
            </form>

        </div>
    )

}