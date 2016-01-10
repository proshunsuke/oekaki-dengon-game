const constants = require('../constants');

const initialState = {
}

function update(state = initialState, action) {
    if(action.type === constants.CREATE_ROOM_REQUEST) {
        return { };
    }
    return state;
}

module.exports = update;