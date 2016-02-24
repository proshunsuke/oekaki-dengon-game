const constants = require('../constants');
import request from 'superagent';
import { routeActions } from 'redux-simple-router'
import { Socket } from 'phoenix';

export function startSocket() {
    let socket = new Socket('/oekaki-ws');
    socket.connect();

    return {
        type: constants.START_SOCKET,
        socket: socket
    }
}

function joinLobbyAction(channel) {
    return {
        type: constants.JOIN_LOBBY,
        channel: channel
    }
}

function onLobby(channel) {
    channel.on('join', msg => console.log('other joined lobby', msg));
}

export function joinLobby() {
    return (dispatch, getState) => {
        const { socketChannel } = getState();
        const socket = socketChannel.socket;
        let channel = socket.channel('lobby');
        onLobby(channel);
        channel.join()
            .receive('ok', messages => {
                console.log('catching up', messages)
                let payload = {
                    text: 'joined'
                };

                channel.push('join', payload)
                    .receive('ok', response => {
                        console.log('joined lobby', response);
                        dispatch(joinLobbyAction(channel));
                    })
                    .receive('error', error => {
                        console.error(error);
                    });
            } )
            .receive('error', reason => console.log('failed join', reason))
            .after(10000, () => console.log('Networking issue. Still waiting...'));
    }
}

function joinRoomAction(channel) {
    return {
        type: constants.JOIN_ROOM,
        channel: channel
    }
}

function otherUserJoinedRoom(msg) {
    return {
        type: constants.OTHER_USER_JOINED_ROOM,
        msg: msg
    }
}

function onRoom(channel, dispatch) {
    channel.on('join', msg => {
        dispatch(otherUserJoinedRoom(msg));
    });
}

export function joinRoom() {
    return (dispatch, getState) => {
        const { socketChannel, createRoom } = getState();
        const socket = socketChannel.socket;
        let channel = socket.channel(`room:${createRoom.roomId}`);
        onRoom(channel, dispatch);
        channel.join()
            .receive('ok', messages => {
                console.log('catching up', messages)
                let payload = {
                    text: `joined room:${createRoom.roomId}`
                };

                channel.push('join', payload)
                    .receive('ok', response => {
                        console.log(`joined room:${createRoom.roomId}`, response);
                        dispatch(joinRoomAction(channel));
                    })
                    .receive('error', error => {
                        console.error(error);
                    });
            } )
            .receive('error', reason => console.log('failed join', reason))
            .after(10000, () => console.log('Networking issue. Still waiting...'));
    }
}