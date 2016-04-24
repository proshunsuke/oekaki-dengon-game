const constants = require('../constants');

const afterSettingUsers = (state = [], action) => {
    switch (action.type) {
    case constants.OTHER_USER_JOINS_ROOM:
        return [];
    case constants.OTHER_USER_LEAVES_ROOM:
        return [];
    case constants.ADD_USER_TO_LIST:
	return action.users;
    default:
        return state;
    }
};

module.exports = afterSettingUsers;
