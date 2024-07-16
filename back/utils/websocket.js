require('dotenv').config();
const { WebSocket } = require('ws');
const { StonePapper } = require('./stonePapper');

const currentSessions = []
module.exports = { currentSessions }
module.exports.createSession = async (body) => {
    try {
        /* 
      type of CreateRoomAttr
        */

        const port = getUniquePort();
        // ws room created
        const wss = new WebSocket.Server({ port });
        // ws added
        const sessionData = {
            port: port,
            ...body,
            game: {
                name: '',
                currentPlayers: [{ name: '', value: '' }, { name: '', value: '' }],
                status: 'preparing',
                winner: ''
            }
        }

        currentSessions.push(sessionData)


        wss.on('connection', (ws, req) => {
            const urlParams = new URLSearchParams(req.url.split('?')[1]);
            ws.user = { name: urlParams.get('userName'), id: urlParams.get('userId') }

            // при открытии страницы с лобаком, идет сразу коннект на вс
            // при коннекте новго юзера
            // он послыает меседж с типом коннектед, после чего,
            //все челам приходит обновленный стейт для рум даты

            ws.on('message', (message) => {
                const { actionType, payload } = JSON.parse(message)
                switch (actionType) {
                    case 'connected':
                        for (let i = 0; i < currentSessions.length; i++) {
                            if (currentSessions[i].port === port) {
                                currentSessions[i].usersInRoom.push({ name: ws.user.name, id: ws.user.id })
                                sendAll(wss, actionType, { session: currentSessions[i], user: ws.user.name })
                                return
                            }
                        }
                        break;

                    case 'message':
                        // Рассылка сообщений всем клиентам в сессии
                        sendAll(wss, actionType, payload)

                        break;

                    case 'roomChange':
                        for (let i = 0; i < currentSessions.length; i++) {
                            if (currentSessions[i].port === port) {
                                currentSessions[i] = {
                                    ...currentSessions[i],
                                    ...payload
                                }

                                sendAll(wss, actionType, { session: currentSessions[i] })
                                return
                            }
                        }
                        break;
                    case 'stonePapper':
                        for (let i = 0; i < currentSessions.length; i++) {
                            if (currentSessions[i].port === port) {
                                currentSessions[i].game.currentPlayers =
                                    currentSessions[i].game.currentPlayers.map((el) => {
                                        if (el.name !== payload.name) return el
                                        else {
                                            return { name: el.name, value: payload.value }
                                        }
                                    })
                                const winnerIs = StonePapper(currentSessions[i].game.currentPlayers);
                                if (!winnerIs) return
                                else {
                                    currentSessions[i].game.winner = winnerIs
                                    currentSessions[i].game.status = 'ended'
                                    sendAll(wss, 'roomChange', { session: currentSessions[i] })
                                }

                                return
                            }
                        }


                        break;

                    default:
                        break;
                }



            });

            ws.on('close', () => {
                console.log(`Connection closed in room ${port}`);

                for (let i = 0; i < currentSessions.length; i++) {
                    if (currentSessions[i].port === port) {
                        currentSessions[i].usersInRoom = currentSessions[i].usersInRoom.filter((el) => el.id !== ws.user.id)
                        if (currentSessions[i].game.currentPlayers.some(el => el.name === ws.user.name)) {
                            sendAll(wss, 'roomChange', {
                                session: {
                                    ...currentSessions[i],
                                    game: {
                                        status: 'preparing',
                                        currentPlayers: [{ name: '', value: '' }, { name: '', value: '' }],
                                        name: '',
                                        winner: ''
                                    }
                                }
                            },
                                `User ${ws.user.name} leave the lobby. Game  was closed`)
                        } else {
                            sendAll(wss, 'disconnected', { session: currentSessions[i], user: ws.user.name })
                        }



                        if (currentSessions[i].usersInRoom.length < 1) {
                            wss.close()
                            currentSessions.splice(i, 1)
                        }
                        return
                    }
                }



            })
        })


        return sessionData
    } catch (error) {

        return error
    }
}


function getUniquePort() {
    const minPort = 3010;
    const maxPort = 4000;
    let port;

    do {
        port = Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
    } while (currentSessions.some(session => session.port === port));

    return port;
}

function sendAll(wss, actionType, payload, message = '') {
    wss.clients.forEach(client => {
        client.send(JSON.stringify({ actionType, payload, message }))
    })
}

