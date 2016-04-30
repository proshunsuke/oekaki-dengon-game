import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
const { connect } = require('react-redux');
const SettingButton = require('./SettingButton');

class OtherService extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
	const { client, rooms } = this.props;
	let SettingArea;
	// 待機中または設定中、かつリーダーの場合のみ設定ボタンが出る
	// TODO: roomsは非同期で取得してくる
	if (!(client.roomId in rooms)) {
	} else if (
	    (rooms[client.roomId].status === 'setting' || rooms[client.roomId].status === 'waiting') && client.role === 'leader') {
	    SettingArea = <SettingButton />;
	}
        return <div>
	    { SettingArea }
            </div>;
    }
}

module.exports = connect()(OtherService);


