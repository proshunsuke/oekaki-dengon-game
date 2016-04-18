import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

// 2箇所でハードコーディングしてるからやめたほうがよい
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;

class Setting extends React.Component {
    render() {
	const settingAreaStyle = {
            border: '1px solid #000000',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        };
        return <div>
	    ここは設定エリア
	    </div>;
    }
}

module.exports = connect()(Setting);
