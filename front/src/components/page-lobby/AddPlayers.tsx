import style from './lobby.module.css'
import Player from './Player'
import LinkBtn from '../ui/LinkBtn'
import { GamePlayer } from '../../utlis/types'

interface props {
    currentPlayers: GamePlayer[]
    changePlayer: (playerName: string, playerPos: number) => void
    startGame: (s: string) => void
    isCreator: boolean
}


export default function AddPlayers(props: props) {
    function renderPlayers(): JSX.Element | JSX.Element[] {
        return props.currentPlayers.map((el, i) => {
            return <Player callback={props.changePlayer} key={`player_${el.name}_${i}`} userName={el.name} index={i} />
        })

    }

    return (
        <div className='main-container'>
            <p className='main-context'>add players</p>

            <div className={style.vs}>
                {renderPlayers()}
                <p className='main-context'>vs</p>
            </div>
            {props.isCreator
                &&
                <LinkBtn
                    action={() => props.startGame('startGame')}
                    dissabled={props.currentPlayers.some(el => el.name === '')}>
                    startGame
                </LinkBtn>}



        </div>
    )
}
