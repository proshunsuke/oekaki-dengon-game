const constants = require('../constants');

const beforeSettingUsers = (state = [], action) => {
    switch (action.type) {
    case constants.OTHER_USER_JOINS_ROOM:
        return action.users;
    case constants.OTHER_USER_LEAVES_ROOM:
        return action.users;
    case constants.RESET_BEFORE_USERS:
	return action.users;
    case constants.DELETE_USER_FROM_LIST:
	return action.users;
    default:
        return state;
    }
};

module.exports = beforeSettingUsers;
