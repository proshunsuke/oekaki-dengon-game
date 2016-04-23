import React, { PropTypes } from 'react';
const { connect } = require('react-redux');

class AfterSettingUserList extends React.Component {
    render() {
	const { afterSettingUsers } = this.props;
        return <ul>
	    設定後ユーザリスト
            {afterSettingUsers.map((user, i) =>
				    <li key={user.id}>{i}. name: {user.name}
				    </li>
				   )}
        </ul>;
    }
}

module.exports = connect()(AfterSettingUserList);
