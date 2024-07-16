import { useState } from "react";
import { ApiStatus, CreateRoomAttr, RoomAttr } from "../utlis/types";
import { useNavigate } from "react-router-dom";
import { api } from "../utlis/api";

export default function useApi() {
    const [apiStatus, setApiStatus] = useState<ApiStatus>({ status: 0, message: 'init' })
    const navigate = useNavigate()
    //102 loading

    function startReq() {

        setApiStatus({ status: 102, message: 'loading...' })
    }
    function errorHandler(err: ApiStatus) {
        setApiStatus(err)
    }

    async function createRoom(roomData: CreateRoomAttr) {
        try {
            startReq()

            const lobbyPort = await api.createRoom(roomData)
            navigate(`/lobby?roomPort=${lobbyPort.port}`)

        } catch (error: ApiStatus | unknown) {

            console.log(error);
            errorHandler((error as ApiStatus))
        }
    }
    async function getRooms(): Promise<RoomAttr[]> {
        try {
            startReq()
            const rooms = await api.getRooms();
            if(rooms.length > 0){
               setApiStatus({status: 200, message: 'ok'})
               
            }else{
                throw new Error('no rooms')
            }
            return rooms
            
        } catch (error) {
            console.log(error);
            errorHandler(error as ApiStatus)
            return[]
        }
    }


    return { apiStatus, createRoom, getRooms }


}