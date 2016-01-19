const constants = require('../constants');
import request from 'superagent';
import { routeActions } from 'redux-simple-router'

function fetchRooms() {
    return {
        type: constants.FETCH_ROOMS
    };
}

function fetchRoomsReceive(rooms) {
    return {
        type: constants.FETCH_ROOMS_RECEIVE,
        rooms: rooms
    }
}

export function fetchRoomsIfNeeded() {
    return dispatch => {
        dispatch(fetchRooms());
        return request
            .get('/api/room')
            .end(function (err, res) {
                if (err || !res.ok) {
                    alert('エラーが発生しました。部屋情報が取得出来ませんでした。');
                } else {
                    dispatch(fetchRoomsReceive(res.body.data));
                }
            });
    }
}
