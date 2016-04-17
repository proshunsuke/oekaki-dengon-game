const constants = require('../constants');
const { fetchRoomsReceive, createRoomReceive } = require('./client');
import request from 'superagent';
import { routeActions } from 'redux-simple-router';
import { Socket } from 'phoenix';

export const startSocket = () => {
    let socket = new Socket('/oekaki-ws');
    socket.connect();

    return {
        type: constants.START_SOCKET,
        socket: socket
    };
};

const joinLobbyAction = channel => ({type: constants.JOIN_LOBBY, channel: channel});

const onLobby = (channel, dispatch) => {
    channel.on('join', msg => console.log('other joined lobby', msg));
    channel.on('create_room', rooms => {
        dispatch(fetchRoomsReceive(rooms.rooms));
    });
    channel.on('close_room', rooms => {
        dispatch(fetchRoomsReceive(rooms.rooms));
    });
    channel.on('now_setting', rooms => {
        dispatch(fetchRoomsReceive(rooms.rooms));
    });
    channel.on('now_waiting', rooms => {
        dispatch(fetchRoomsReceive(rooms.rooms));
    });
};

export const joinLobby = () => {
    return (dispatch, getState) => {
        const { socketChannel } = getState();
        const socket = socketChannel.socket;
        let channel = socket.channel('lobby');
        onLobby(channel, dispatch);
        channel.join()
            .receive('ok', messages => {
                console.log('catching up', messages);
                let payload = {
                    text: 'joined'
                };

                channel.push('join', payload)
                    .receive('ok', response => {
                        console.log('joined lobby', response);
                        dispatch(joinLobbyAction(channel));
                    })
                    .receive('error', error => {
                        console.error(error);
                    });
            })
            .receive('error', reason => console.log('failed join', reason))
            .after(10000, () => console.log('Networking issue. Still waiting...'));
    };
};

const joinRoomAction = channel => ({type: constants.JOIN_ROOM, channel: channel});
const otherUserJoinsRoom = result => ({type: constants.OTHER_USER_JOINS_ROOM, users: result.users});
const otherUserLeavesRoom = result => ({type: constants.OTHER_USER_LEAVES_ROOM, users: result.users});
const beLeader = role => ({type: constants.BE_LEADER, role: role});

const onRoomJoin = (channel, dispatch, getState) => {
    channel.on('other_joins', result => {
        dispatch(otherUserJoinsRoom(result));
    });
    channel.on('other_leaves', result => {
        dispatch(otherUserLeavesRoom(result));
	const users = result.users;
	const { client} = getState();
	for (let user of users) {
	    // 自分がリーダーになる
	    if (user.id === client.userId && user.role === 'leader' && client.role === 'general') {
		dispatch(beLeader(user.role));
	    }
	}
    });
    channel.on('joined', result => {
        dispatch(createRoomReceive(result));
    });
    channel.on('now_setting', msg => {
	dispatch(pressSettingButtonNowSetting());
    });
    channel.on('now_waiting', msg => {
	dispatch(pressSettingButtonNowWaiting());
    });
};

export function joinRoom(data) {
    return (dispatch, getState) => {
        const { socketChannel } = getState();
        const socket = socketChannel.socket;
        let channel = socket.channel(`room:${data.roomId}`, data);
        onRoomJoin(channel, dispatch, getState);
        channel.join()
            .receive('ok', messages => {
                console.log('catching up', messages);
                channel.push('other_joins', { roomId: data.roomId })
                    .receive('ok', response => {
                        console.log(`joined room:${data.roomId}`, response);
                        dispatch(joinRoomAction(channel));
                    })
                    .receive('error', error => {
			alert(error);
                    });
            })
            .receive('error', error =>{
		alert(`failed join: ${error.reason}`);
	    })
            .after(10000, () => console.log('Networking issue. Still waiting...'));
    };
}

const leaveOtherChannelAction = () => ({type: constants.LEAVE_OTHER_CHANNEL});

export const leaveOtherChannel = () => {
    return (dispatch, getState) => {
        const { socketChannel } = getState();
        let channel = socketChannel.channel;
        if (channel == null) {
            return;
        }
        channel.leave()
            .receive('ok', messages => {
                console.log('leave channel', messages);
                dispatch(leaveOtherChannelAction());
            })
            .receive('error', reason => console.log('failed leave', reason))
            .after(10000, () => console.log('Networking issue. Still waiting...'));
    };
};

const pressSettingButtonNowSetting = () => ({type: constants.NOW_SETTING});
const pressSettingButtonNowWaiting = () => ({type: constants.NOW_WAITING});

export const pressSettingButton = () => {
    return (dispatch, getState) => {
	const { socketChannel, game } = getState();
        let channel = socketChannel.channel;
	if (game.isSetting) {
	    channel.push('now_waiting')
            .receive('ok', response => {})
            .receive('error', error => {
                console.error(`now setting ng: ${error}`);
            });
	} else {
	    channel.push('now_setting')
            .receive('ok', response => {})
            .receive('error', error => {
                console.error(`now setting ng: ${error}`);
            });
	}
    };
};

