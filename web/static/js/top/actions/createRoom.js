const constants = require('../constants');

function createRoomRequest() {
    return {
        type: constants.CREATE_ROOM,
        roomInfo: 'a'
    };
}

module.exports = { createRoomRequest };
