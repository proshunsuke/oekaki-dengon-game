const constants = require('../constants');

function users(state = [{
    name: 'first'
}], action) {
    switch(action.type) {
        case constants.OTHER_USER_JOINED_ROOM:
            return [
                {
                    name: `testuser${state.length.toString()}`
                },
                ...state
            ];
        default:
            return state;
    }
}

module.exports = users;