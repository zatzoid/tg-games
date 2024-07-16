import style from './lobby.module.css'
import React, { useEffect, Suspense } from "react"
import { CurrentContext } from "../../utlis/Context"
import { GameName, GameStatus, RoomAttr } from "../../utlis/types";
import Chat from "./Chat"
import LinkBtn from "../ui/LinkBtn";
import useWs from "../../hooks/useWs";
import CreateGame from "./CreateGame";
import AddPlayers from "./AddPlayers";
import Game from "./Game";
import GameWinner from "./GameWinner";
import Waiting from "./Waiting";
import Loader from '../ui/Loader';

export default function PageLobby() {
    const { userData } = React.useContext(CurrentContext);
    const { messageList, roomData, isCreator, isPLayer, isPlayerTurn, gameTurn, leaveLobby, disconnectWs, connectWs, sendMessage, changeRoomData } = useWs(userData);

    useEffect(() => {
        connectWs()
        return () => {
            disconnectWs()
        }
    }, [])
    useEffect(() => {
console.log(roomData);
    }, [roomData])


    function changePlayer(playerName: string, playerPos: number) {
        if (!roomData) return

        const newGame = { ...roomData.game }

        const userAlreadyInList = newGame.currentPlayers.findIndex(el => el.name === playerName);

        if (userAlreadyInList >= 0) {
            newGame.currentPlayers[userAlreadyInList].name = ''
        }


        newGame.currentPlayers[playerPos].name = playerName


        changeRoomData({ game: newGame })

    }

    function startGameWrapper() {
        if ((roomData as RoomAttr)?.game.currentPlayers.length < 2 || !roomData) return

        changeRoomData({

            game: {
                status: GameStatus.started,
                currentPlayers: roomData?.game.currentPlayers,
                name: roomData?.game.name,
                winner: ''
            }
        })
    }

    function stonePapperTurn(name: string, value: string) {
        gameTurn(name, value)
    }
    function startNewGame() {
        changeRoomData({
            game: {
                status: GameStatus.preparing,
                currentPlayers: [{ name: '', value: '' }, { name: '', value: '' }],
                name: GameName.null,
                winner: ''
            }
        })
    }

    function renderGameComponent(): JSX.Element {
        if (!roomData) return (<div>loading</div>)

        if (userData.name === roomData.creator && roomData.game.status === GameStatus.preparing) {
            return <CreateGame createGame={changeRoomData} />
        } else if (roomData.game.status === GameStatus.starting) {
            return <AddPlayers
                isCreator={isCreator.current}
                startGame={startGameWrapper}
                changePlayer={changePlayer}
                currentPlayers={roomData.game.currentPlayers} />

        } else if (roomData.game.status === GameStatus.started && isPLayer.current && isPlayerTurn) {
            return <Game stonePapperCallback={stonePapperTurn} gameData={roomData.game} />


        } else if (roomData.game.status === GameStatus.started && !isPLayer.current || roomData.game.status === GameStatus.started && !isPlayerTurn) {
            return <Waiting />
        } else if (roomData.game.status === GameStatus.ended) {
            return <GameWinner isHost={isCreator.current} startNewgame={startNewGame} game={roomData.game} />
        } else {
            return (<div className='main-container'><p className='main-context'>waiting for host</p></div>)
        }
    }

    return (
        <div>
            {roomData
                ?
                <div className={style.main}>
                    <LinkBtn action={() => { leaveLobby() }}>leave lobby</LinkBtn>
                    <div className='main-container'>
                        <p className='main-context'> lobby info</p>
                        <h2>{roomData.roomName}</h2>
                        <p>players: {roomData.usersInRoom.length}</p>
                        <ul className={style.userList}>{
                            roomData.usersInRoom.map((el) => {
                                return <li key={`userList-${el.id}`}>{el.name}</li>
                            })
                        }</ul>
                    </div>
                    <Suspense fallback={<Loader />}>
                        {renderGameComponent()}
                    </Suspense>
                    <Chat messageList={messageList} sendMessage={sendMessage} />
                </div>
                :
                <div>loading</div>
            }

        </div>
    )
}