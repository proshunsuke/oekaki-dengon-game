const constants = require('../constants');

function createRoom(state = {
    isCreateRoomFetching: false,
    roomId: null,
    userId: null,
    userName: null,
    role: null
}, action) {
    switch(action.type) {
        case constants.CREATE_ROOM_REQUEST:
            return Object.assign({}, state, {
                isCreateRoomFetching: true
            });
        case constants.CREATE_ROOM_RECEIVE:
            return Object.assign({}, state, {
                isCreateRoomFetching: false,
                roomId: action.roomId,
                userId: action.userId,
                userName: action.userName,
                role: action.role
            });
        default:
            return state;
    }
}

module.exports = createRoom;