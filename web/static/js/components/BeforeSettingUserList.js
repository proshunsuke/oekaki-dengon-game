import React, { PropTypes } from 'react';
const { connect } = require('react-redux');
const { deleteUserFromList, addUserFromList } = require('../actions/client');

class BeforeSettingUserList extends React.Component {
    constructor(props) {
	super(props);
	this.handleSelectUser = this.handleSelectUser.bind(this);
    }

    handleSelectUser(user, e) {
	e.preventDefault();
	const { dispatch } = this.props;
	dispatch(deleteUserFromList(user));
	dispatch(addUserFromList(user));
    }

    
    render() {
	const { gameInfo } = this.props;
        return <ul>
	    設定前ユーザリスト
            {gameInfo.beforeSettingUsers.map((user, i) =>
				    <li key={user.id} onClick={this.handleSelectUser.bind(this, user)}>{i}. name: {user.name}
				    </li>
				   )}
        </ul>;
    }
}

module.exports = connect()(BeforeSettingUserList);
