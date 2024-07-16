export interface UserData {
    name: string
    id: string
    avatar: string

}

export interface ApiStatus {
    status: number
    message: string

}
export interface Player {
    name: string
    value: string
}
export interface GameSettings {
    name: GameName
    status: GameStatus
    currentPlayers: GamePlayer[]
    winner: string

}
export interface GamePlayer{
    name: string
    value: string
}
export interface User{
    name: string
    id: string
}
export interface CreateRoomAttr {
    roomName: string
    creator: string
    usersInRoom: User[]

}

export interface RoomAttr {
    roomName: string
    creator: string
    usersInRoom: User[]
    port: number
    game: GameSettings
}

export enum GameStatus {
    preparing = 'preparing',//форма создания
    starting = 'starting',//набор игроков
    started = 'started',//игра началась
    ended = 'ended',//объявление победителя

}
export enum GameName {
    xo = 'xo',
    stonePapper = 'stonePapper',
    null = ''
}

export enum ActionType {
    connected = 'connected',
    disconnected = 'disconnected',
    message = 'message',
    roomChange = 'roomChange',
    xo = 'xo',
    stonePapper = 'stonePapper'
}



