const constants = require('../constants');

// 以下のようなオブジェクトになっている
// {1: {status: 'waiting', name: 'room1'}, 2: {status: 'waiting', name: 'room2'}}
const rooms = (state = {}, action) => {
    switch (action.type) {
    case constants.FETCH_ROOMS_RECEIVE:
        return action.rooms;
    case constants.NOW_PLAYING:
	return action.rooms;
    default:
        return state;
    }
};

module.exports = rooms;
