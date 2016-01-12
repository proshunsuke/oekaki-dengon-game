const constants = require('../constants');
import request from 'superagent';

function createRoomRequest(data) {
    return {
        type: constants.CREATE_ROOM_REQUEST,
        roomInfo: data
    };
}

function createRoomReceive(data) {
    console.log("actionのcreateRoomReceiveはきてる");
    return {
        type: constants.CREATE_ROOM_RECEIVE,
        roomId: data.room_id,
        userId: data.user_id
    }
}

export function createRoomRequestIfNeeded(data) {
    return dispatch => {
        console.log("ここにこないんだよ");
        dispatch(createRoomRequest(data));
        return request
            .post('/api/rooms')
            .send(data)
            .set('Accept', 'application/json')
            .end(function (err, res) {
                if (err || !res.ok) {
                    alert('エラーが発生しました。部屋が作られませんでした。');
                } else {
                    console.log("部屋が作られました。", res.body.data);
                    createRoomReceive(res.body.data);
                }
            });
    }
}
