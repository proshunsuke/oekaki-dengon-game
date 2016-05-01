const constants = require('../constants');

const initialize_state = {
    isCreateRoomFetching: false,
    isRoomFetching: false,
    roomId: null,
    userId: null,
    userName: null,
    role: null
};

const client = (state = initialize_state, action) => {
    switch (action.type) {
    case constants.INITIALIZE_STATE:
	return Object.assign({}, state, initialize_state);
    case constants.FETCH_ROOMS:
        return Object.assign({}, state, {
            isRoomFetching: true
        });
    case constants.FETCH_ROOMS_RECEIVE_FOR_CLIENT:
        return Object.assign({}, state, {
            isRoomFetching: false
        });
    case constants.CREATE_ROOM_REQUEST:
        return Object.assign({}, state, {
            isCreateRoomFetching: true,
            userName: action.userName
        });
    case constants.CREATE_ROOM_RECEIVE:
        return Object.assign({}, state, {
            isCreateRoomFetching: false,
            roomId: action.roomId,
            userId: action.userId,
            userName: action.userName,
            role: action.role
        });
    case constants.SET_ROOM_ID:
        return Object.assign({}, state, {
            isCreateRoomFetching: false,
            roomId: action.roomId
        });
    case constants.BE_LEADER:
        return Object.assign({}, state, {
	    role: action.role
        });
    default:
        return state;
    }
};

module.exports = client;
