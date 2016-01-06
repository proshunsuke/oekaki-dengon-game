const constants = require('../constants');

const initialState = {
    userName: "",
    roomName: "",
    roomPassword: ""
}

function update(state = initialState, action) {
    if(action.type === constants.CREATE_ROOM) {
        return {
            userName: state.userName,
            roomName: state.roomName,
            roomPassword: state.roomPassword
        };
    }
    return state;
}

module.exports = update;