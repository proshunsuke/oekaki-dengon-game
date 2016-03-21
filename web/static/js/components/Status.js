import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class Status extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { client } = this.props;
        return <div>
	    roomId: {client.roomId}, userId: {client.userId}, userName: {client.userName}, role: {client.role}
	    </div>;
    }
}

module.exports = connect()(Status);
