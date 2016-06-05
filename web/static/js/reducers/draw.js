const constants = require('../constants');

const initializeState = {
    isDrawing: false,
    startX: null,
    startY: null,
    canvas: null,
    canDraw: true
};

const draw = (state = initializeState, action) => {
    switch (action.type) {
    case constants.INITIALIZE_STATE:
	return Object.assign({}, state, initializeState);
    case constants.COMPONENT_DID_MOUNT_ROOM:
        return Object.assign({}, state, {
            canvas: action.canvas
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
            startY: action.endY
        });
    case constants.MOUSE_UP:
        return Object.assign({}, state, {
            isDrawing: false
        });
    case constants.MOUSE_LEAVE:
        return Object.assign({}, state, {
            isDrawing: false
        });
    case constants.MY_TURN:
	return Object.assign({}, state, {
	    canDraw: false
	});
    default:
        return state;
    }
};

module.exports = draw;
