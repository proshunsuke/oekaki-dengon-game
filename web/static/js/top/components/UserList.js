const React = require('react');
const { connect } = require('react-redux');

class UserList extends React.Component {
    render() {
        const { users } = this.props;
        console.log('users', users);
        return <ul>
            {users.map((user, i) =>
                <li key={i}>{i}. name: {user.name}
                </li>
            )}
        </ul>;
    }
}

module.exports = connect()(UserList);