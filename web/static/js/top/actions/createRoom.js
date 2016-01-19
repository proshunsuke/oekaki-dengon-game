const constants = require('../constants');
import request from 'superagent';
import { routeActions } from 'redux-simple-router'

function createRoomRequest(data) {
    return {
        type: constants.CREATE_ROOM_REQUEST,
        roomInfo: data
    };
}

function createRoomReceive(data) {
    return dispatch => {
        dispatch(routeActions.push(`/room/${data.room_id}`))
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

function enterRoom() {
    return {
        type: constants.ENTER_ROOM
    }
}

function enterRoomReceive(data) {
    console.log('enterRoomReceive');
    console.log(data);
    return {
        type: constants.ENTER_ROOM_RECEIVE
    }
}

export function enterRoomsIfNeeded(data) {
    return (dispatch, getState) => {
        dispatch(enterRoom());
        const { createRoom } = getState();
        return request
            .post(`/api/room/${createRoom.roomId}`)
            .send({"userName": data.userName})
            .end(function (err, res) {
                if (err || !res.ok) {
                    alert('エラーが発生しました。部屋に入れませんでした。');
                } else {
                    dispatch(enterRoomReceive(res.body.data));
                }
            });
    }
}


export function createRoomRequestIfNeeded(data) {
    return dispatch => {
        dispatch(createRoomRequest(data));
        return request
            .post('/api/room')
            .send(data)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    alert('エラーが発生しました。部屋が作られませんでした。');
                } else {
                    dispatch(createRoomReceive(res.body.data));
                }
            });
    }
}
