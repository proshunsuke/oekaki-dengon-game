import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class Status extends React.Component {
    constructor(props) {
        super(props);
	this.currentOrder = this.currentOrder.bind(this);
    }

    currentOrder() {
	const { client, rooms, gameInfo } = this.props;
	if (gameInfo.afterSettingUsers === [] || gameInfo.currentGameOrderuserId === null) {
	    return;
	}
	// TODO: ここうまく作れるはず
	console.log(gameInfo);
	const currentUser = gameInfo.afterSettingUsers.find((user, index) => (user['id'] === gameInfo.currentGameOrderuserId));
	return <p>{currentUser.name}</p>;
    }

    render() {
        const { client, rooms, gameInfo } = this.props;
	let gameStatus;
	// TODO: roomsは非同期で取得してくる
	if (!(client.roomId in rooms)) {
	    gameStatus = '待機中';
	} else if (rooms[client.roomId].status === 'setting') {
	    gameStatus = '設定中';
	} else if (rooms[client.roomId].status === 'waiting') {
	    gameStatus = '待機中';
	} else if (rooms[client.roomId].status === 'playing') {
	    gameStatus = 'プレイ中';
	} else if (rooms[client.roomId].status === 'finished') {
	    gameStatus = '終了';
	}
	
        return <div>
	    roomId: {client.roomId}, userId: {client.userId}, userName: {client.userName}, role: {client.role}, ゲームの状態: {gameStatus}, 現在のユーザ: {this.currentOrder()}, 残り時間: {gameInfo.remainingTime}
	    </div>;
    }
}

module.exports = connect()(Status);





