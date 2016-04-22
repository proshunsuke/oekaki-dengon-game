import React, { PropTypes } from 'react';
const { connect } = require('react-redux');
const BeforeSettingUserList = require('./BeforeSettingUserList');

// 2箇所でハードコーディングしてるからやめたほうがよい
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

class Setting extends React.Component {
    render() {
	const { beforeSettingUsers } = this.props;
	const settingAreaStyle = {
            border: '1px solid #000000',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        };
        return <div style={settingAreaStyle} ref='area'>
	    <BeforeSettingUserList beforeSettingUsers={beforeSettingUsers}/>
	    ここは設定エリア
	    </div>;
    }
}

module.exports = connect()(Setting);
