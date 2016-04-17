import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class Setting extends React.Component {
    render() {
        return <div>
	    ここは設定エリア
	    </div>;
    }
}

module.exports = connect()(Setting);
