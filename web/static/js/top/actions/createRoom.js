const constants = require('../constants');
import request from 'superagent';

function createRoomRequest(data) {
    return {
        type: constants.CREATE_ROOM_REQUEST,
        roomInfo: data
    };
}

export function createRoomRequestIfNeeded(data) {
    createRoomRequest(data);
    return request
        .post('/api/rooms')
        .send(data)
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if (err || !res.ok) {
                alert('Oh no! error');
            } else {
                alert('yay got ' + JSON.stringify(res.body));
            }
        });
}
