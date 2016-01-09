const constants = require('../constants');

const initialState = {
    userName: "",
    roomName: "",
    roomPassword: ""
}

function update(state = initialState, action) {
    console.log("update");
    console.log(action);
    if(action.type === constants.CREATE_ROOM_REQUEST) {
        return {
            userName: state.userName,
            roomName: state.roomName,
            roomPassword: state.roomPassword
        };
    }
    return state;
}

module.exports = update;