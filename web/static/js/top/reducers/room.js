const constants = require('../constants');

function room(state = {
    isRoomFetching: false,
    rooms: null
}, action) {
    switch(action.type) {
        case constants.FETCH_ROOMS:
           return Object.assign({}, state, {
                isRoomFetching: true
            });
        case constants.FETCH_ROOMS_RECEIVE:
            return Object.assign({}, state, {
                isRoomFetching: false,
                rooms: action.rooms
            });
        default:
            return state;
    }
}

module.exports = room;