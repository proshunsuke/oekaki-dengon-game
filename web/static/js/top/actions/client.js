const constants = require('../constants');
const { joinRoom } = require('./socketChannel');
import request from 'superagent';
import { routeActions } from 'redux-simple-router'
import { Socket } from 'phoenix';

function createRoomRequest(userName) {
    return {
        type: constants.CREATE_ROOM_REQUEST,
        userName: userName
    };
}

export function createRoomReceive(data) {
    return dispatch => {
        dispatch(routeActions.push(`/room/${data.room_id}`));
        return {
            type: constants.CREATE_ROOM_RECEIVE,
            roomId: data.room_id,
            userId: data.user_id,
            userName: data.user_name,
            role: data.role
        }
    }
}

export function setRoomId(roomId) {
    return {
        type: constants.SET_ROOM_ID,
        roomId: roomId
    }
}

function enterRoomReceive(data) {
    return {
        type: constants.ENTER_ROOM_RECEIVE
    }
}

export function enterRoomsIfNeeded(data) {
    return (dispatch, getState) => {
        const { createRoom } = getState();
        dispatch(joinRoom({
            roomId: createRoom.roomId,
            userName: data.userName,
            isCreate: false
        }));
    }
}


export function createRoomRequestIfNeeded(data) {
    return dispatch => {
        dispatch(createRoomRequest(data.userName));
        return request
            .post('/api/room')
            .send(data)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    alert('エラーが発生しました。部屋が作られませんでした。');
                } else {
                    dispatch(joinRoom({
                        roomId: res.body.data.room_id,
                        userName: data.userName,
                        isCreate: true
                    }));
                }
            });
    }
}