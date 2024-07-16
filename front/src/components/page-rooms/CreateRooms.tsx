
import styleForm from '../ui/form.module.css'
import { CreateRoomAttr } from "../../utlis/types";
import useApi from "../../hooks/useApi";
import LinkBtn from "../ui/LinkBtn";
import React, { useRef } from 'react';
import { CurrentContext } from '../../utlis/Context';


export default function CreateRooms() {
    const { userData } = React.useContext(CurrentContext);
    const { apiStatus, createRoom } = useApi();
    const roomName = useRef<HTMLInputElement>(null)


    function submitWrapper(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const roomAttrs: CreateRoomAttr = {
            creator: userData.name,
            roomName: (roomName.current?.value as string),
            usersInRoom: [],
           
          
        }


        createRoom(roomAttrs)


    }

    return (
        <div>
            <form onSubmit={submitWrapper} className={styleForm.form}>
               
                <label >
                    choice room name:
                    <input ref={roomName} type="text" required minLength={2} defaultValue={`${userData.name}'s lobby`} />
                </label>

                <LinkBtn action={() => { }} type="submit" dissabled={apiStatus.status === 102}> create room</LinkBtn>
            </form>
        </div>
    )
}