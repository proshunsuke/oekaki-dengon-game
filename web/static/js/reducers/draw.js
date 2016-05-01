const constants = require('../constants');

const initialize_state = {
    isDrawing: false,
    startX: null,
    startY: null,
    context: null
};

const draw = (state = initialize_state, action) => {
    switch (action.type) {
    case constants.INITIALIZE_STATE:
	return Object.assign({}, state, initialize_state);
    case constants.COMPONENT_DID_MOUNT_ROOM:
        return Object.assign({}, state, {
            context: action.context
        });
    case constants.MOUSE_DOWN:
        return Object.assign({}, state, {
            isDrawing: true,
            startX: action.startX,
            startY: action.startY
        });
    case constants.MOUSE_MOVE:
        return Object.assign({}, state, {
            startX: action.endX,
            startY: action.endY,
            context: action.context
        });
    case constants.MOUSE_UP:
        return Object.assign({}, state, {
            isDrawing: false
        });
    case constants.MOUSE_LEAVE:
        return Object.assign({}, state, {
            isDrawing: false
        });
    default:
        return state;
    }
}

module.exports = draw;
