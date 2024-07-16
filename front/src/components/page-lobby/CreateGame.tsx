import styleForm from '../ui/form.module.css'
import LinkBtn from '../ui/LinkBtn'
import { useRef } from 'react'
import { GameName, GameStatus, RoomAttr } from '../../utlis/types'
interface props {
    createGame: (data: Partial<RoomAttr>) => void
}

export default function CreateGame(props: props) {
    const playerCount = useRef<HTMLInputElement>(null)
    const gameName = useRef<HTMLSelectElement>(null)
    function wrapperSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault()
        props.createGame({
            game: {
                status: GameStatus.starting,
                name: ((gameName.current as HTMLSelectElement).value as GameName),
                currentPlayers: [{ name: '', value: '' }, { name: '', value: '' }],
                winner: ''
            }

        })
    }

    return (
        <div >

            <div className='main-container'>
                <p className='main-context'>create a game</p>
                <form className={styleForm.form} onSubmit={wrapperSubmit}>
                    <label >
                        chois game:
                        <select required ref={gameName}>
                            <option value={GameName.stonePapper}>stonePapper</option>
                           {/*  <option value={GameName.xo}>xo</option> */}

                        </select>
                    </label>
                    <label >
                        count of players:
                        <input ref={playerCount} type="number" value={2} max={9} disabled className={styleForm.inputNum} />

                    </label>
                    <LinkBtn action={() => { console.log('createGame'); }} type='submit'> create game</LinkBtn>

                </form>


            </div>
        </div>
    )
}