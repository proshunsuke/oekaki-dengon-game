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
        let channel = socket.channel('lobby', {roomName: 'test'});
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

function otherUserJoinedRoom(result) {
    return {
        type: constants.OTHER_USER_JOINED_ROOM,
        users: result.users
    }
}

function onRoom(channel, dispatch) {
    channel.on('join', result => {
        dispatch(otherUserJoinedRoom(result));
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
                    roomId: createRoom.roomId
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

function leaveOtherChannelAction() {
    return {
        type: constants.LEAVE_OTHER_CHANNEL
    }
}

export function leaveOtherChannel() {
    return (dispatch, getState) => {
        const { socketChannel } = getState();
        let channel = socketChannel.channel;
        if (channel == null) {
            return;
        }
        channel.leave()
            .receive('ok', messages => {
                console.log('leave channel', messages);
                dispatch(leaveOtherChannelAction());
            } )
            .receive('error', reason => console.log('failed leave', reason))
            .after(10000, () => console.log('Networking issue. Still waiting...'));
    }
}