import React from 'react'
import placeholderImg from '../assets/23b9aff49cf111eea34622d0c3bbf3a3_upscaled.jpg'
import style from './header.module.css'
import { CurrentContext } from '../utlis/Context'


export default function Header() {
    const { userData } = React.useContext(CurrentContext);

    return (
        <header className={style.main}>
            <div className={style.img}>
                <img src={userData.avatar ? userData.avatar : placeholderImg} alt="img" />
            </div>
            <p className={style.name}>{userData.name}</p>
        </header>
    )
}