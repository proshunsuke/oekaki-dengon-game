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
        dispatch(fetchRoomsReceive(rooms));
    });
    channel.on('close_room', rooms => {
        dispatch(fetchRoomsReceive(rooms));
    });
    channel.on('now_setting', rooms => {
        dispatch(fetchRoomsReceive(rooms));
    });
    channel.on('now_waiting', rooms => {
        dispatch(fetchRoomsReceive(rooms));
    });
    channel.on('game_start', rooms => {
	dispatch(nowPlaying(rooms));
    });
    channel.on('game_finished', rooms => {
	dispatch(nowFinished(rooms));
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
const otherUserJoinsRoom = users => ({type: constants.OTHER_USER_JOINS_ROOM, users: users});
const otherUserLeavesRoom = users => ({type: constants.OTHER_USER_LEAVES_ROOM, users: users});
const beLeader = role => ({type: constants.BE_LEADER, role: role});

const onRoomJoin = (channel, dispatch, getState) => {
    channel.on('other_joins', result => {
	const users = result.users;
        dispatch(otherUserJoinsRoom(users));
	dispatch(resetBeforeUsers(users));
	dispatch(resetAfterUsers());
    });
    channel.on('other_leaves', result => {
	const users = result.users;
	const { client } = getState();
        dispatch(otherUserLeavesRoom(users));
	dispatch(resetBeforeUsers(users));
	dispatch(resetAfterUsers());

	// もうちょっと上手く出来そう
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
    channel.on('now_setting', rooms => {
	const { users } = getState();
	dispatch(fetchRoomsReceive(rooms));
	dispatch(resetBeforeUsers(users));
	dispatch(resetAfterUsers());
    });
    channel.on('now_waiting', rooms => {
	dispatch(fetchRoomsReceive(rooms));
    });
    channel.on('game_start', data => {
	dispatch(setGameInfo(data.orders, data.draw_time, data.orders[0]['id']));
	dispatch(nowPlaying(data.rooms));
	dispatch(drawTimer());
    });
    channel.on('next_user', data => {
	dispatch(setGameInfoWhenNextUser(data.next_user_id));
	dispatch(myTurn());
	dispatch(drawTimer());
    });
    channel.on('game_finished', data => {
	dispatch(setGameInfoWhenNextUser(null));
	dispatch(nowFinished(data.rooms));
	 // ここで呼ぶべきなのか、とりあえずここで
	const { enableDraw } = require('./draw');
	dispatch(enableDraw());
    });
    channel.on('previous_image', data => {
	const { client, draw } = getState();
	// ここ一旦全員に絵を返しているが、本来は描く人にだけ届くはず。今はこうして振り分けてる
	// ココらへん切り出す
	// 描く順番が自分の時
	if (client.userId === data.next_user_id) {
	    const image = new Image();
	    image.onload = () => {
		let context = draw.canvas.getContext('2d');
		context.drawImage(image, 0, 0);
	    };
	    image.src = data.url;
	}
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
const resetBeforeUsers = users => ({type: constants.RESET_BEFORE_USERS, users: users});
const resetAfterUsers = () => ({type: constants.RESET_AFTER_USERS});

export const pressSettingButton = () => {
    return (dispatch, getState) => {
	const { socketChannel, rooms, client } = getState();
        let channel = socketChannel.channel;
	if (rooms[client.roomId].status === 'setting' ) {
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

const setGameInfo = (orders, drawTime, currentGameOrderuserId) => ({
    type: constants.SET_GAME_INFO,
    afterSettingUsers: orders,
    drawTime: drawTime,
    currentGameOrderuserId: currentGameOrderuserId
});

const nowPlaying = rooms => ({type: constants.NOW_PLAYING, rooms: rooms});

export const pressGameStartButton = () => {
    return (dispatch, getState) => {
	const { socketChannel, rooms, client, gameInfo } = getState();
	let channel = socketChannel.channel;
	channel.push('game_start', {draw_time: gameInfo.drawTime,
				    orders: gameInfo.afterSettingUsers})
	    .receive('ok', response => {})
	    .receive('error', error => {
		console.error(`game start ng: ${error}`);
	    });
    };
};

const passRemainingTime = remainingTime => ({type: constants.PASS_REMAINING_TIME, remainingTime: remainingTime});

const drawTimer = () => {
    return (dispatch, getState) => {
	const drawTimerInterval = setInterval(() => {
	    const { socketChannel, client, gameInfo, draw } = getState();
	    let remainingTime = gameInfo.remainingTime-1;
	    if (gameInfo.remainingTime <= 0) {
		remainingTime = 0;
		clearInterval(drawTimerInterval);
		if (gameInfo.currentGameOrderuserId === client.userId) {
		    const channel = socketChannel.channel;
		    const canvasUrl = draw.canvas.toDataURL('image/png');
		    channel.push('next_user', {canvasUrl: canvasUrl})
			.receive('ok', response => {})
			.receive('error', error => {
			    console.error(`next_user ng: ${error}`);
			});
		}
	    }
	    dispatch(passRemainingTime(remainingTime));
	}, 1000);
    };
};

const setGameInfoWhenNextUser = userId => ({type: constants.SET_GAME_INFO_WHEN_NEXT_USER, currentGameOrderuserId: userId});

const nowFinished = rooms => ({type: constants.NOW_FINISHED, rooms: rooms});

export const pressBackToWaitingButton = () => {
    return (dispatch, getState) => {
	const { socketChannel, rooms, client } = getState();
        let channel = socketChannel.channel;
	    channel.push('now_waiting')
	    .receive('ok', response => {})
	    .receive('error', error => {
                console.error(`now setting ng: ${error}`);
	    });
    };
};

export const myTurn = () => ({type: constants.MY_TURN});
