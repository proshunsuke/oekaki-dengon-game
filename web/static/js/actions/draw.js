const constants = require('../constants');
import { routeActions } from 'redux-simple-router';

export const componentDidMountRoom = context => ({type: constants.COMPONENT_DID_MOUNT_ROOM, context: context});
export const mouseDown = (startX, startY) => ({type: constants.MOUSE_DOWN, startX: startX, startY: startY});

const mouseMoveAction = (endX, endY, context) => ({
    type: constants.MOUSE_MOVE,
    endX: endX,
    endY: endY,
    context: context
});

export const mouseMove = (endX, endY) => {
    return (dispatch, getState) => {
        const { draw } = getState();
        if (!draw.isDrawing) {
            return;
        }
        let context = draw.context;
        context.lineWidth = 2;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.shadowBlur = 0;
        context.beginPath();
        context.moveTo(draw.startX, draw.startY);
        context.lineTo(endX, endY);
        context.stroke();
        context.closePath();
        dispatch(mouseMoveAction(endX, endY, context));
    };
};

export const mouseUp = () => ({type: constants.MOUSE_UP});
export const mouseLeave = () => ({type: constants.MOUSE_LEAVE});
