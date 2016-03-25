import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class OtherService extends React.Component {
    render() {
	console.log('kokokiteru');
        return <div>
	    other service
        </div>;
    }
}

module.exports = connect()(OtherService);
