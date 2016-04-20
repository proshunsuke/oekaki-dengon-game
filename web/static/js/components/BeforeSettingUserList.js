import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class BeforeSettingUserList extends React.Component {
    render() {
        return <div>
	    ここにユーザリスト
	    </div>;
    }
}

module.exports = connect()(BeforeSettingUserList);
