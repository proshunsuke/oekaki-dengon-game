const constants = require('../constants');

const gameInfo = (state = {
    beforeSettingUsers: [],
    afterSettingUsers: [],
    drawTime: 120
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
    case constants.CHANGE_DRAW_TIME:
	return Object.assign({}, state, {
            drawTime: action.drawTime
        });
    case constants.SET_GAME_INFO:
	return Object.assign({}, state, {
            drawTime: action.drawTime,
	    afterSettingUsers: action.afterSettingUsers
        });
    default:
        return state;
    }
};

module.exports = gameInfo;



