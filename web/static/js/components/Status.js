import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class Status extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { client, game } = this.props;
	let gameStatus;
	if (game.isSetting) {
	    gameStatus = '設定中';
	} else {
	    gameStatus = '待機中';
	}
	
        return <div>
	    roomId: {client.roomId}, userId: {client.userId}, userName: {client.userName}, role: {client.role}, ゲームの状態: {gameStatus}
	    </div>;
    }
}

module.exports = connect()(Status);





