const React = require('react');
const { connect } = require('react-redux');
const UserList = require('./UserList');
const Draw = require('./Draw');

class Room extends React.Component {
    render() {
        const { users } = this.props;

        return <div>
            <Draw />
            <UserList users = {users} />
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

module.exports = connect(mapStateToProps)(Room);