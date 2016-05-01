const constants = require('../constants');

const initialize_state = {
    socket: null,
    channel: null
};

const socketChannel = (state = initialize_state, action) => {
    switch (action.type) {
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
        case constants.LEAVE_OTHER_CHANNEL:
            return Object.assign({}, state, {
                channel: null
            });
        default:
            return state;
    }
}

module.exports = socketChannel;
