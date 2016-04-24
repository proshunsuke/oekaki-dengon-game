const constants = require('../constants');

const gameInfo = (state = {
    beforeSettingUsers: [],
    afterSettingUsers: []
}, action) => {
    switch (action.type) {
    case constants.RESET_BEFORE_USERS:
	return Object.assign({}, state, {
            beforeSettingUsers: action.users
        });
    case constants.DELETE_USER_FROM_LIST:
	return Object.assign({}, state, {
            beforeSettingUsers: action.users
        });
    case constants.RESET_AFTER_USERS:
	return Object.assign({}, state, {
            afterSettingUsers: []
        });
    case constants.ADD_USER_TO_LIST:
	return Object.assign({}, state, {
            afterSettingUsers: action.users
        });
    default:
        return state;
    }
};

module.exports = gameInfo;
