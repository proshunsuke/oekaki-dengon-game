const constants = require('../constants');

function socket(state = {
    socket: null
}, action) {
    switch(action.type) {
        case constants.START_SOCKET:
            return Object.assign({}, state, {
                socket: action.socket
            });
        default:
            return state;
    }
}

module.exports = socket;