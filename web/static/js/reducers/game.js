const constants = require('../constants');

const game = (state = {
    isSetting: false
}, action) => {
    switch (action.type) {
    case constants.PRESS_SETTING_BUTTON:
	console.log(`isSetting: ${state.isSetting}`);
        return Object.assign({}, state, {
            isSetting: state.isSetting === true ? false : true // 設定ボタンを押すたびにtrue, falseを入れ替え
        });
    default:
        return state;
    }
};

module.exports = game;
