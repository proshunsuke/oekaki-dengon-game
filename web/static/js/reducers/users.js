const constants = require('../constants');

const initialize_state = [];

// TODO: room.jsを作り、その要素の1つとしてusersをもたせる
const users = (state = initialize_state, action) => {
    switch (action.type) {
    case constants.INITIALIZE_STATE:
	return Object.assign({}, state, initialize_state);
    case constants.OTHER_USER_JOINS_ROOM:
        return action.users;
    case constants.OTHER_USER_LEAVES_ROOM:
        return action.users;
    default:
        return state;
    }
};

module.exports = users;
