import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
const { pressBackToWaitingButton } = require('../actions/socketChannel');
const { connect } = require('react-redux');

class BackToWaitingButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackToWaiting = this.handleBackToWaiting.bind(this);
    }
    handleBackToWaiting(e) {
        e.preventDefault();
	const { dispatch } = this.props;
	dispatch(pressBackToWaitingButton());
    }
    render() {
        return <div>
	    <Button onClick={this.handleBackToWaiting}>待機中に戻る</Button>
	    </div>;
    }
}

module.exports = connect()(BackToWaitingButton);
