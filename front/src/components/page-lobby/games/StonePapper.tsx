import { useContext } from "react"
import { CurrentContext } from "../../../utlis/Context"
import scissorsImg from '../../../assets/scissors.svg'
import stoneImg from '../../../assets/stone.svg'
import papperImg from '../../../assets/paper.svg'
import style from './stonePapper.module.css'

interface props {
    callback: (name: string, value: string) => void

}


export default function StonePapper(props: props) {
    const { userData } = useContext(CurrentContext)

    return (
        <>
        <p className='main-context'>make ur choice</p>
            <div className={style.main}>
                <button className={style.btn} onClick={() => { props.callback(userData.name, 'scissors') }}>
                    <img src={scissorsImg} alt="scissors" />
                    scissors
                </button>
                <button className={style.btn} onClick={() => { props.callback(userData.name, 'stone') }}>
                    <img src={stoneImg} alt="scissors" />
                    stone
                </button>
                <button className={style.btn} onClick={() => { props.callback(userData.name, 'papper') }}>
                    <img src={papperImg} alt="scissors" />
                    papper
                </button>
            </div>
        </>
    )

}