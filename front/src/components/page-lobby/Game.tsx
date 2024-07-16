import { GameName, GameSettings } from '../../utlis/types'
import StonePapper from './games/StonePapper'


interface props {
    gameData: GameSettings
    stonePapperCallback: (name: string, value: string) => void
}

export default function Game(props: props) {


    return (
        <div className='main-container'>
            <p className='main-context'>game is started: {GameName.stonePapper}</p>
            {props.gameData.name === GameName.stonePapper ?
                <StonePapper callback={props.stonePapperCallback} />
                :
                ''
            }
        </div>

    )

}