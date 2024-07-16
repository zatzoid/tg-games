import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi"
import { RoomAttr } from "../../utlis/types";
import PageLoader from "../ui/PageLoader";
import RoomList from "./RoomList";

export default function FindRooms() {
    const { getRooms, apiStatus } = useApi();
    const [rooms, setRooms] = useState<RoomAttr[]>([])

    useEffect(() => {
        getRoomsFetch()

    }, [])
    async function getRoomsFetch() {
        try {
            const room = await getRooms();
            setRooms(room)

        } catch (error) {
            console.log(error);
        }
    }
    return (
       <>{ apiStatus.status === 102 
        ? <PageLoader/>
        :<RoomList itemList={rooms}/>
        
       }</>
    )
}