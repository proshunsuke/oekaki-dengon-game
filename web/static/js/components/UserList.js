const React = require('react');
const { connect } = require('react-redux');

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { users } = this.props;
        return <ul>
            {users.map((user, i) =>
                <li key={user.id}>{i}. name: {user.name}
                </li>
            )}
        </ul>;
    }
}

Room.propTypes = { users: PropTypes.array.isRequired }
module.exports = connect()(UserList);