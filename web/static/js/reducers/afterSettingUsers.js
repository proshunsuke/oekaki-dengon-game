const constants = require('../constants');

const afterSettingUsers = (state = [], action) => {
    switch (action.type) {
    case constants.RESET_AFTER_USERS:
	return [];
    case constants.ADD_USER_TO_LIST:
	return action.users;
    default:
        return state;
    }
};

module.exports = afterSettingUsers;
