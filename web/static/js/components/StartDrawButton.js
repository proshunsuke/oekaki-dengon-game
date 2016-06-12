import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
const { cleareCanvas, enableDraw } = require('../actions/draw');
const { connect } = require('react-redux');

class StartDrawButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleStartDraw = this.handleStartDraw.bind(this);
    }
    handleStartDraw(e) {
        e.preventDefault();
	const { dispatch } = this.props;
	dispatch(cleareCanvas());
	dispatch(enableDraw());
    }
    render() {
        return <div>
	    <Button onClick={this.handleStartDraw}>描き始める</Button>
	    </div>;
    }
}

module.exports = connect()(StartDrawButton);
