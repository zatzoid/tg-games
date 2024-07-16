
const { createSession, currentSessions } = require('../utils/websocket');



module.exports.createRoom = async (req, res, next) => {
    try {
        /* 
         gameName: string
         roomName: string
         creator: string
         playersMax: number
         currentPlayers: string[]
         */

        const { body } = req

        const wsData = await createSession(body);
        res.status(200).send({ port: wsData.port });

    } catch (error) {
        console.log(error);
    }
}


//выключен
//подключение сразу к вс
module.exports.connectToRoom = async (req, res, next) => {
    try {
        const PORT = Number(req.query.roomPort)

        const targetSession = currentSessions.find(el => el.port === PORT)
    
        res.status(200).send(JSON.stringify(targetSession))

    } catch (error) {
        console.log(error);
    }

}


// выключен
module.exports.getRooms = async (req, res, next) => {
    try {
       
        res.status(200).send(JSON.stringify(currentSessions))

    } catch (error) {
        console.log(error);
    }
}