import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
const { press_setting_button } = require('../actions/client');
const { connect } = require('react-redux');

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleSetting = this.handleSetting.bind(this);
    }
    handleSetting(e) {
        e.preventDefault();
	const { dispatch } = this.props;
	dispatch(press_setting_button());
	console.log("設定ボタン押した");
    }
    render() {
        return <div>
	    <Button onClick={this.handleSetting}>設定</Button>
	    </div>;
    }
}

module.exports = connect()(Setting);
