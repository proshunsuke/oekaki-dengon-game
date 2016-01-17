const constants = require('../constants');
import request from 'superagent';
import { routeActions } from 'redux-simple-router'

function fetchRooms() {
    return {
        type: constants.FETCH_ROOMS
    };
}

export function fetchRoomsIfNeeded() {
    return dispatch => {
        return dispatch(fetchRooms());
        // ここサーバーのfetch room api を叩く
    }
}
