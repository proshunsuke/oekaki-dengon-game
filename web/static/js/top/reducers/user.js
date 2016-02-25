const constants = require('../constants');

function user(state = {
    users: [{name: 'first'}]
}, action) {
    switch(action.type) {
        case constants.OTHER_USER_JOINED_ROOM:
            console.log("だれか入ってきた", action.msg);
            const tmpUserList = state.users;
            tmpUserList.push({name: `testuser${tmpUserList.length.toString()}`});
            console.log(tmpUserList);
            return Object.assign({}, state, {
                users: tmpUserList
            });
        default:
            return state;
    }
}

module.exports = user;