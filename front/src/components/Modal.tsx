import { useState } from 'react'
import style from './modal.module.css'
import LinkBtn from './ui/LinkBtn'


interface props {
    callback: (str: string) => void
}

export default function Modal(props: props) {
    const [inputName, setInputName] = useState<string>('')

    return (
        <div className={style.content}>
            <h2>set new name</h2>
            <input type="text" value={inputName} onInput={(evt) => { setInputName(evt.currentTarget.value) }} />
            <LinkBtn action={() => { props.callback(inputName) }} dissabled={inputName.length < 1}>save</LinkBtn>
        </div>
    )
}