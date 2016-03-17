const constants = require('../constants');

const users = (state = [], action) => {
    switch (action.type) {
        case constants.OTHER_USER_JOINS_ROOM:
            return action.users;
        case constants.OTHER_USER_LEAVES_ROOM:
            return action.users;
        default:
            return state;
    }
}

module.exports = users;