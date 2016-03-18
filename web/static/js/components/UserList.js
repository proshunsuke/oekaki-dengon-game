import React, { PropTypes } from 'react';;
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

UserList.propTypes = { users: PropTypes.array.isRequired };
module.exports = connect()(UserList);
