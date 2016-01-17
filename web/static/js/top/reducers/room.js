const constants = require('../constants');

function room(state = {
    isRoomFetching: false
}, action) {
    switch(action.type) {
        case constants.FETCH_ROOMS:
           return Object.assign({}, state, {
                isRoomFetching: true
            });
        default:
            return state;
    }
}

module.exports = room;