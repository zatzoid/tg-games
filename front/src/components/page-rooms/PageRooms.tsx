import FindRooms from "./FindRooms";
import CreateRooms from "./CreateRooms";
import LinkBtn from "../ui/LinkBtn";

export default function PageRooms() {


    //render

    return (

        <div>
            <nav className="main-nav">
                <LinkBtn action={'/'}> go to main page</LinkBtn>
            </nav>
            {
                window.location.search.split('?find=')[1] === 'true'
                    ?
                    <FindRooms />
                    :
                    <CreateRooms />

            }

           
        </div>

    )


}