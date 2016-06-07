const constants = require('../constants');
const drawComponent = require('../components/Draw');
import { routeActions } from 'redux-simple-router';

export const componentDidMountRoom = canvas => ({type: constants.COMPONENT_DID_MOUNT_ROOM, canvas: canvas});
export const mouseDown = (startX, startY) => ({type: constants.MOUSE_DOWN, startX: startX, startY: startY});

const mouseMoveAction = (endX, endY) => ({
    type: constants.MOUSE_MOVE,
    endX: endX,
    endY: endY
});

export const mouseMove = (endX, endY) => {
    return (dispatch, getState) => {
        const { draw } = getState();
        if (!(draw.isDrawing && draw.canDraw)) {
            return;
        }
        let context = draw.canvas.getContext('2d');
        context.lineWidth = 2;
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.shadowBlur = 0;
        context.beginPath();
        context.moveTo(draw.startX, draw.startY);
        context.lineTo(endX, endY);
        context.stroke();
        context.closePath();
        dispatch(mouseMoveAction(endX, endY));
    };
};

export const mouseUp = () => ({type: constants.MOUSE_UP});
export const mouseLeave = () => ({type: constants.MOUSE_LEAVE});

export const cleareCanvas = () => {
    return (dispatch, getState) => {
        const { draw } = getState();
        let context = draw.canvas.getContext('2d');
    	context.clearRect(0, 0, drawComponent.CANVAS_WIDTH, drawComponent.CANVAS_HEIGHT);
    };
};

export const enableDraw = () => ({type: constants.ENABLE_DRAW});
