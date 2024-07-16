import { CreateRoomAttr, RoomAttr } from "./types";


class API {
    private _link
    private _headers
    constructor() {
        this._link = 'http://localhost:3000'
        this._headers = { 'Content-Type': 'application/json' }
    }

    _checkError(res: Response) {

        if (res.status >= 500) {
            return Promise.reject('Ошибка в работе сервера.');
        }
        return res.json()
            .then(data => {

                if (res.ok) {

                    return data
                } else {

                    return Promise.reject(`${data.message || 'не обработанная ошибочка'}, status:: ${res.status}`);
                }
            });
    }
    createRoom(data: CreateRoomAttr) {
        return fetch(`${this._link}/create-room`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data),
        })
            .then(this._checkError)
    }
  /*   async connectToRoom(port: string) {
        return fetch(`${this._link}/connect-room?roomPort=${port}`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkError)

    } */

    async connectToWs(port: number, useId: string, userName: string): Promise<WebSocket> {
        try {
            const websocket = new WebSocket(`ws://localhost:${port}?userId=${useId}&userName=${userName}`);

            return websocket
        } catch (error) {
            console.log(error);
            return Promise.reject('fail ws')
        }


    }

    async getRooms(): Promise<RoomAttr[]> {
        return fetch(`${this._link}/get-rooms`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkError)
    }

    /*    getCards(data) {
           console.log('from front::', data);
          
       } */

}

export const api = new API()