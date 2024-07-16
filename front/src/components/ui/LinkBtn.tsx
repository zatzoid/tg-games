import { NavLink } from 'react-router-dom'
import style from './link-btn.module.css'
interface props {
    action: string | ((evt: React.MouseEvent<HTMLButtonElement>) => void)
    children: string
    type?: "submit" | "reset" | "button" | undefined
    dissabled?: boolean
}

export default function LinkBtn(props: props) {

    if (typeof props.action === 'string') {
        return (
            <NavLink to={props.action} className={style.main}>
                {props.children}
            </NavLink>
        )
    } else {
        return (
            <button onClick={props.action} disabled={props.dissabled} className={style.main} type={props.type}>
                {props.children}
            </button>
        )
    }
}