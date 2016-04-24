import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
const { connect } = require('react-redux');
const SettingButton = require('./SettingButton');

class OtherService extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
	const { client } = this.props;
	let SettingArea;
	// leaderだけに設定ボタンが見えるように
	if (client.role === 'leader') {
	    SettingArea = <SettingButton />;
	}
        return <div>
	    { SettingArea }
            </div>;
    }
}

module.exports = connect()(OtherService);


