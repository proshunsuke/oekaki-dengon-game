const constants = require('../constants');

const initializeState = {
    beforeSettingUsers: [],
    afterSettingUsers: [],
    drawTime: 120,
    currentGameOrderuserId: null,
    remainingTime: null
};

const gameInfo = (state = initializeState, action) => {
    switch (action.type) {
    case constants.INITIALIZE_STATE:
	return Object.assign({}, state, initializeState);
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
	console.log(action.afterSettingUsers);
	return Object.assign({}, state, {
            drawTime: action.drawTime,
	    afterSettingUsers: action.afterSettingUsers,
	    currentGameOrderuserId: action.currentGameOrderuserId,
	    remainingTime: action.drawTime
        });
    case constants.PASS_REMAINING_TIME:
	return Object.assign({}, state, {
	    remainingTime: action.remainingTime
        });
    case constants.SET_GAME_INFO_WHEN_NEXT_USER:
	return Object.assign({}, state, {
	    currentGameOrderuserId: action.currentGameOrderuserId,
	    remainingTime: state.drawTime
        });
    default:
        return state;
    }
};

module.exports = gameInfo;



