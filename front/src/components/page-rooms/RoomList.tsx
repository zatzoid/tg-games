import { RoomAttr } from "../../utlis/types"
import LinkBtn from "../ui/LinkBtn"
import style from './rooms.module.css'
interface props {
    itemList: RoomAttr[]
}


export default function RoomList(props: props) {
    function renderRooms(): JSX.Element[] | JSX.Element {
        if (props.itemList.length < 1) {
            return <li><p>no rooms</p></li>
        } else {
            return props.itemList.map((el) => {
                return (
                    <li key={el.creator + el.roomName}>
                        <div>
                            <h3>{el.roomName}</h3>
                            <p>players: {el.usersInRoom.length}</p>
                        </div>
                        <LinkBtn action={`/lobby?roomPort=${el.port}`} >connect</LinkBtn>
                    </li>)
            })
        }
    }
    return (
        <div>
            <ul className={style.roomList}>{renderRooms()}</ul>

        </div>
    )
}