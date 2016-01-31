const constants = require('../constants');

function socketChannel(state = {
    socket: null,
    channel: null
}, action) {
    switch(action.type) {
        case constants.START_SOCKET:
            return Object.assign({}, state, {
                socket: action.socket
            });
        case constants.JOIN_LOBBY:
            return Object.assign({}, state, {
                channel: action.channel
            });
        case constants.JOIN_ROOM:
            return Object.assign({}, state, {
                channel: action.channel
            });
        default:
            return state;
    }
}

module.exports = socketChannel;