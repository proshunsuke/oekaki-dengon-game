const constants = require('../constants');

function createRoomRequest(data) {
    console.log("createRoomRequest: ", data);
    return {
        type: constants.CREATE_ROOM_REQUEST,
        roomInfo: data
    };
}

export function createRoomRequestIfNeeded(data) {
    console.log("createRoomRequestIfNeeded", data);
    return dispatch => {
        return dispatch(createRoomRequest(data));
    }
}
