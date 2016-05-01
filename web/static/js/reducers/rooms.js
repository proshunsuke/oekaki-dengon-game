const constants = require('../constants');

const initialize_state  = {};

// 以下のようなオブジェクトになっている
// {1: {status: 'waiting', name: 'room1'}, 2: {status: 'waiting', name: 'room2'}}
const rooms = (state = initialize_state, action) => {
    switch (action.type) {
    case constants.INITIALIZE_STATE:
	return Object.assign({}, state, initialize_state);
    case constants.FETCH_ROOMS_RECEIVE:
        return action.rooms;
    case constants.NOW_PLAYING:
	return action.rooms;
    default:
        return state;
    }
};

module.exports = rooms;
