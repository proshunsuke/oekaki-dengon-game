import React, { PropTypes } from 'react';
const { connect } = require('react-redux');
const BeforeSettingUserList = require('./BeforeSettingUserList');
const AfterSettingUserList = require('./AfterSettingUserList');
const { changeDrawTime } = require('../actions/client');

// 2箇所でハードコーディングしてるからやめたほうがよい
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

class Setting extends React.Component {
    constructor(props) {
	super(props);
	this.handleChangeDrawTime = this.handleChangeDrawTime.bind(this);
    }

    handleChangeDrawTime(e) {
        e.preventDefault();
	const { dispatch } = this.props;
	dispatch(changeDrawTime(e.target.value));
    }
    
    render() {
	const { gameInfo } = this.props;
	const settingAreaStyle = {
            border: '1px solid #000000',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        };
        return <div style={settingAreaStyle} ref='area'>
	    描く時間<input
        type="text"
	defaultValue = { gameInfo.drawTime }
	onChange = { this.handleChangeDrawTime }
	    />
	    <BeforeSettingUserList gameInfo={gameInfo} />
	    <AfterSettingUserList gameInfo={gameInfo} />
	    </div>;
    }
}

module.exports = connect()(Setting);
