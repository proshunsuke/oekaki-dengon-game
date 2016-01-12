const constants = require('../constants');

function createRoom(state = {
    isFetching: false,
    roomId: null,
    userId: null,
    userName: null,
    role: null
}, action) {
    switch(action.type) {
        case constants.CREATE_ROOM_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case constants.CREATE_ROOM_RECEIVE:
            return Object.assign({}, state, {
                isFetching: false,
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