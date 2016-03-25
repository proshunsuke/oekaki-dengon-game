import React, { PropTypes } from 'react';
const { connect } = require('react-redux');
const Status = require('./Status');
const UserList = require('./UserList');
const Draw = require('./Draw');
const OtherService = require('./OtherService');

class Room extends React.Component {
    render() {
        const { users, client } = this.props;

        return <div>
	    <Status client={client}/>
	    <OtherService />
            <Draw />
            <UserList users={users}/>
        </div>;
    }
}

const mapStateToProps = state => ({users: state.users, client: state.client});
Room.propTypes = { users: PropTypes.array.isRequired };
module.exports = connect(mapStateToProps)(Room);
