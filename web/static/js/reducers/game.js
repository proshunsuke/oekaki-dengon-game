const constants = require('../constants');

const game = (state = {
    isSetting: false
}, action) => {
    switch (action.type) {
    case constants.NOW_SETTING:
        return Object.assign({}, state, {
            isSetting: true
        });
    case constants.NOW_WAITING:
        return Object.assign({}, state, {
            isSetting: false
        });
    default:
        return state;
    }
};

module.exports = game;
