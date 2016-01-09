const constants = require('../constants');

function createRoomRequest() {
    return {
        type: constants.CREATE_ROOM_REQUEST,
        roomInfo: 'a'
    };
}

export function createRoomRequestIfNeeded(data) {
    return (dispatch) => {
        return dispatch(createRoomRequest);
    }
}
