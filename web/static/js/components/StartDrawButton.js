import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
// const { pressSettingButton } = require('../actions/socketChannel');
const { connect } = require('react-redux');

class StartDrawButton extends React.Component {
    constructor(props) {
        super(props);
        // this.handleSetting = this.handleSetting.bind(this);
    }
    handleSetting(e) {
        e.preventDefault();
	// const { dispatch } = this.props;
	// dispatch(pressSettingButton());
    }
    render() {
        return <div>
	    <Button onClick={this.handleSetting}>描き始める</Button>
	    </div>;
    }
}

module.exports = connect()(StartDrawButton);
