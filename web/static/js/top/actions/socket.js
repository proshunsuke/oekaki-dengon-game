const constants = require('../constants');
import request from 'superagent';
import { routeActions } from 'redux-simple-router'
import { Socket } from 'phoenix';

export function startSocket() {
    let socket = new Socket('/ws');
    socket.connect();

    return {
        type: constants.START_SOCKET
    }
}