import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class BeforeSettingUserList extends React.Component {
    render() {
	const { beforeSettingUsers } = this.props;
        return <ul>
	    設定前ユーザリスト
            {beforeSettingUsers.map((user, i) =>
				    <li key={user.id}>{i}. name: {user.name}
				    </li>
				   )}
        </ul>;
    }
}

module.exports = connect()(BeforeSettingUserList);
