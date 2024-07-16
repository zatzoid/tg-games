import LinkBtn from "../ui/LinkBtn"
import Modal from "../Modal"

interface props {
    changeUserName: (str: string) => void
    isTelegram: boolean
}

export default function PageMain(props: props) {

    return (
        <div className="main">
            
            <nav className="main-nav">
                <LinkBtn action={'/rooms?find=false'}>create room</LinkBtn>
                <LinkBtn action={'/rooms?find=true'}>find room</LinkBtn>
            </nav>

           {!props.isTelegram && <Modal callback={props.changeUserName}></Modal>}

        </div >
    )
}