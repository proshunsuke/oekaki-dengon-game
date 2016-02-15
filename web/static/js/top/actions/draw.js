const constants = require('../constants');
import { routeActions } from 'redux-simple-router'

export function componentDidMountRoom(context) {
    return {
        type: constants.COMPONENT_DID_MOUNT_ROOM,
        context: context
    }
}

export function mouseDown(startX, startY) {
    return {
        type: constants.MOUSE_DOWN,
        startX: startX,
        startY: startY
    }
}

function mouseMoveAction(endX, endY, context) {
    return {
        type: constants.MOUSE_MOVE,
        endX: endX,
        endY: endY,
        context: context
    }
}

export function mouseMove(endX, endY) {
    return (dispatch, getState) => {
        const { draw } = getState();
        if (!draw.isDrawing) {
            return;
        }
        let context = draw.context;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(draw.startX, draw.startY);
        context.lineTo(endX, endY);
        context.stroke();
        context.closePath();
        dispatch(mouseMoveAction(endX, endY, context));
    }
}

export function mouseUp() {
    return {
        type: constants.MOUSE_UP
    }
}

export function mouseLeave() {
    return {
        type: constants.MOUSE_LEAVE
    }
}
