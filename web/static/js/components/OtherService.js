import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class OtherService extends React.Component {
    render() {
        return <div>
	    other service
        </div>;
    }
}

module.exports = connect()(OtherService);
