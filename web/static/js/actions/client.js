const constants = require('../constants');
const { joinRoom } = require('./socketChannel');
import request from 'superagent';
import { routeActions } from 'redux-simple-router';
import { Socket } from 'phoenix';

const createRoomRequest = userName => ({type: constants.CREATE_ROOM_REQUEST, userName: userName});

const createRoomReceiveMain = data => ({
    type: constants.CREATE_ROOM_RECEIVE,
    roomId: data.room_id,
    userId: data.user_id,
    userName: data.user_name,
    role: data.role
});

export const createRoomReceive = data => {
    return dispatch => {
        dispatch(routeActions.push(`/room/${data.room_id}`));
	dispatch(createRoomReceiveMain(data));
    };
};

export const setRoomId = roomId => ({type: constants.SET_ROOM_ID, roomId: roomId});
const enterRoomReceive = data => ({type: constants.ENTER_ROOM_RECEIVE});

export const enterRoomsIfNeeded = (data) => {
    return (dispatch, getState) => {
        const { client } = getState();
        dispatch(joinRoom({
            roomId: client.roomId,
            userName: data.userName,
            isCreate: false
        }));
    };
};

export const createRoomRequestIfNeeded = data => {
    return dispatch => {
        dispatch(createRoomRequest(data.userName));
        return request
            .post('/api/room')
            .send(data)
            .set('Accept', 'application/json')
            .end((err, res) => {
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
    };
};

const fetchRooms = () => ({type: constants.FETCH_ROOMS});
export const fetchRoomsReceive = rooms => ({type: constants.FETCH_ROOMS_RECEIVE, rooms: rooms});
const fetchRoomsReceiveForClient = () => ({type: constants.FETCH_ROOMS_RECEIVE_FOR_CLIENT});

export const fetchRoomsIfNeeded = () => {
    return dispatch => {
        dispatch(fetchRooms());
        return request
            .get('/api/room')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('エラーが発生しました。部屋情報が取得出来ませんでした。');
                } else {
                    dispatch(fetchRoomsReceive(res.body));
                    dispatch(fetchRoomsReceiveForClient());
                }
            });
    };
};

const deleteUserFromListMain = users => ({
    type: constants.DELETE_USER_FROM_LIST,
    users: users
});

export const deleteUserFromList = user => {
    return (dispatch, getState) => {
	const { gameInfo } = getState();
	dispatch(deleteUserFromListMain(gameInfo.beforeSettingUsers.filter((value) => {return (user !== value);})));
    };
};

const addUserFromListMain = users => ({
    type: constants.ADD_USER_TO_LIST,
    users: users
});

export const addUserFromList = user => {
    return (dispatch, getState) => {
	const { gameInfo } = getState();
	dispatch(addUserFromListMain(gameInfo.afterSettingUsers.concat([user])));
    };
};

export const changeDrawTime = drawTime => ({type: constants.CHANGE_DRAW_TIME, drawTime: drawTime});
