const constants = require('../constants');

function users(state = [], action) {
    switch(action.type) {
        case constants.OTHER_USER_JOINED_ROOM:
            return action.users;
        default:
            return state;
    }
}

module.exports = users;