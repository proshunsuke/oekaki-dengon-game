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

export function joinLobby() {
    return (dispatch, getState) => {
        const { socketChannel } = getState();
        const socket = socketChannel.socket;
        let channel = socket.channel('lobby');
        console.log('channel', channel);
        channel.join()
            .receive('ok', messages => {
                console.log('catching up', messages)
                let payload = {
                    text: 'test message'
                };

                channel.push('join', payload)
                    .receive('ok', response => {
                        console.log('joined', response);
                    })
                    .receive('error', error => {
                        console.error(error);
                    });
            } )
            .receive('error', reason => console.log('failed join', reason))
            .after(10000, () => console.log('Networking issue. Still waiting...'));
        return {
            type: constants.JOIN_LOBBY,
            channel: channel
        }
    }
}