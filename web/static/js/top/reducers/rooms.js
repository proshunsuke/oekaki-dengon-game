const constants = require('../constants');

const rooms = (state = [], action) => {
    switch(action.type) {
        case constants.FETCH_ROOMS_RECEIVE:
            return action.rooms;
        default:
            return state;
    }
}

module.exports = rooms;