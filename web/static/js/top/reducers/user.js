const constants = require('../constants');

function user(state = {
    users: []
}, action) {
    switch(action.type) {
        case constants.OTHER_USER_JOINED_ROOM:
            console.log("だれか入ってきた", action.msg);
            state.users.push({name: 'testuser'});
            return Object.assign({}, state, {
                users: state.users
            });
        default:
            return state;
    }
}

module.exports = user;