import React from "react";
import { CurrentContext } from "../../utlis/Context";


interface props {
    userName: string
    index: number
    callback: (playerName: string, playerPos: number)=>void
}


export default function Player(props: props) {
    const {userData} = React.useContext(CurrentContext)

    function callBackWrapper(newVal: string){
        console.log(newVal);
        props.callback(newVal, props.index)
    }

    return (
        <>
            {
                props.userName
                    ?
                    <button disabled={props.userName !== userData.name}
                     onClick={()=>callBackWrapper('')} 
                     id={`player_${props.index}`}>{props.userName}</button>
                    :
                    <button onClick={()=>callBackWrapper(userData.name)} id={`player_${props.index}`}>+</button>

            }

        </>

    )

}
