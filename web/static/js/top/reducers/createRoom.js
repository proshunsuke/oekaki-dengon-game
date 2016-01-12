const constants = require('../constants');

function createRoom(state = {
    roomId: null,
    userName: null,
    role: null
}, action) {
    switch(action.type) {
        case constants.CREATE_ROOM_REQUEST:
            console.log("createRoom CREATE_ROOM_REQUEST");
            return;
        case constants.CREATE_ROOM_RECEIVE:
            console.log("createRoom CREATE_ROOM_RECEIVE");
            console.log(action.userId, action.roomId);
            return;
        default:
            return state;
    }
}

module.exports = createRoom;