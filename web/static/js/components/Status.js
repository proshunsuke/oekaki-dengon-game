import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class Status extends React.Component {
    constructor(props) {
        super(props);
	this.currentOrder = this.currentOrder.bind(this);
    }

    currentOrder() {
	const { client, rooms, gameInfo } = this.props;
	if (gameInfo.afterSettingUsers === [] || gameInfo.currentOrder === null) {
	    return;
	}
	const currentUser = gameInfo.afterSettingUsers[gameInfo.currentOrder];
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
	}
	
        return <div>
	    roomId: {client.roomId}, userId: {client.userId}, userName: {client.userName}, role: {client.role}, ゲームの状態: {gameStatus}, 現在のユーザ番号: {this.currentOrder()}
	    </div>;
    }
}

module.exports = connect()(Status);





