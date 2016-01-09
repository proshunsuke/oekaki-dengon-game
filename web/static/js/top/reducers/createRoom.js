const constants = require('../constants');

const initialState = {
    userName: "",
    roomName: "",
    roomPassword: ""
}

function update(state = initialState, action) {
    console.log("createRoomのupdateのtype:" +action.type);
    if(action.type === constants.CREATE_ROOM_REQUEST) {
        console.log("heya joho: "+action.roomInfo);
        return {
            userName: state.userName,
            roomName: state.roomName,
            roomPassword: state.roomPassword
        };
    }
    return state;
}

module.exports = update;