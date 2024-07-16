import { GameSettings } from "../../utlis/types";
import LinkBtn from "../ui/LinkBtn";

interface props{
    game: GameSettings
    startNewgame: ()=>void
    isHost: boolean
}

export default function GameWinner(props: props) {


    return(
        <div className="main-container">
            {props.game.winner}
            {props.isHost &&   <LinkBtn action={props.startNewgame}> create new game</LinkBtn>
        }
          
        </div>
    )
    
}