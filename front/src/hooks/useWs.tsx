import { useRef, useState } from "react";
import { api } from "../utlis/api";
import getTime from "../utlis/getTime";
import { Message } from "../components/page-lobby/Chat";
import { ActionType, GameStatus, RoomAttr, UserData } from "../utlis/types";
import { useNavigate } from "react-router-dom";

export default function useWs(userData: UserData) {
    const navigate = useNavigate()
    const socket = useRef<WebSocket>()
    const [messageList, setMessageList] = useState<Message[]>([])
    const [roomData, setRoomData] = useState<RoomAttr>()
    const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(false);
    const isPLayer = useRef<boolean>(false);
    const isCreator = useRef<boolean>(false)

    async function connectWs() {
        try {
            socket.current = await api.connectToWs(Number(window.location.search.split('?roomPort=')[1]),userData.id, userData.name)

            socket.current.onopen = () => {
                socketSend(ActionType.connected, {message: 'null' })
                console.log('Connected to WebSocket on port:: ' + Number(window.location.search.split('?roomPort=')[1]));
            };

            socket.current.onmessage = (event) => {
                const { actionType, payload, message = '' } = JSON.parse(event.data);

                switch (actionType) {
                    case ActionType.message:
                        setMessageList(prev => [payload, ...prev])
                        break;
                    case ActionType.connected:
                        setRoomData((payload.session as RoomAttr))
                        isCreator.current = payload.session.creator === userData.name
                        setMessageList(prev => [{ body: 'connected', sender: payload.user, time: getTime() }, ...prev])
                        break;
                    case ActionType.disconnected:
                        setRoomData(payload.session)
                        setMessageList(prev => [{ body: 'disconnected', sender: payload.user, time: getTime() }, ...prev])
                        break;
                    case ActionType.roomChange:
                        setRoomData(payload.session)
                        if(message){
                            setMessageList(prev => [{ body: message , sender: 'system', time: getTime() }, ...prev])
                        }
                        if ((payload.session as RoomAttr).game.status === GameStatus.started) {
                            isPLayer.current = (payload.session as RoomAttr).game.currentPlayers.some(el => el.name === userData.name)
                            setIsPlayerTurn(true)
                        }
                        break;
                    case ActionType.xo:
                        setRoomData(payload.session)
                        setMessageList(prev => [{ body: 'room settings change', sender: 'system', time: getTime() }, ...prev])
                        break;

                    default:
                        break;
                }

            };

            socket.current.onclose = () => {
                //socket.current?.send(JSON.stringify({ actionType: 'disconnected', payload: { userName: userData.name } }))
            };
        } catch (error) {
            setMessageList(prev => [{ body: JSON.stringify(error), sender: 'system', time: getTime() }, ...prev])
            console.log(error);
        }
    }

    function sendMessage(msg: string) {

        socketSend(ActionType.message, {
            body: msg,
            sender: userData.name,
            time: getTime()
        })

    }

    function leaveLobby() {
        navigate('/')
    }

    function disconnectWs() {
        socketSend(ActionType.disconnected, { userName: userData.name })
        socket.current?.close(1000, JSON.stringify({ userName: userData.name }))
    }
    function changeRoomData(data: Partial<RoomAttr>) {
        socketSend(ActionType.roomChange, data)

    }

    function gameTurn(name: string, value: string) {
        setIsPlayerTurn(false)
        socketSend(ActionType.stonePapper, { name, value })
    }

    /*  function createGame(data: { gameName: string, playerCount: string }) {
        socketSend(ac)
     } */

    function socketSend(actionType: ActionType, payload: object) {
        socket.current?.send(JSON.stringify({ actionType, payload }))
    }


    return { messageList, roomData, isCreator, isPLayer, isPlayerTurn, gameTurn, leaveLobby, disconnectWs, connectWs, sendMessage, changeRoomData }
}