import style from './loader.module.css'
import Loader from './Loader'
export default function PageLoader() {

    return (
        <div className={style.wrapper}>
            <Loader></Loader>
        </div>
    )
}