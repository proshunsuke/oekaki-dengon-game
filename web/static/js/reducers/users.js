const constants = require('../constants');

// TODO: room.jsを作り、その要素の1つとしてusersをもたせる
const users = (state = [], action) => {
    switch (action.type) {
    case constants.OTHER_USER_JOINS_ROOM:
        return action.users;
    case constants.OTHER_USER_LEAVES_ROOM:
        return action.users;
    default:
        return state;
    }
};

module.exports = users;
