import React, { PropTypes } from 'react';
const { connect } = require('react-redux');
const Status = require('./Status');
const UserList = require('./UserList');
const Draw = require('./Draw');
const Setting = require('./Setting');
const OtherService = require('./OtherService');

class Room extends React.Component {
    render() {
        const { users, client, game } = this.props;
	let drawOrSettingArea;
	// リーダーの時設定中の時は設定画面を出す
	if (game.isSetting && client.role === 'leader') {
	    drawOrSettingArea = <Setting />;
	} else {
	    drawOrSettingArea = <Draw />;
	}

        return <div>
	    <Status client={client}/>
	    <OtherService client={client}/>
            { drawOrSettingArea }
            <UserList users={users}/>
        </div>;
    }
}

const mapStateToProps = state => ({users: state.users, client: state.client, game: state.game});
Room.propTypes = { users: PropTypes.array.isRequired };
module.exports = connect(mapStateToProps)(Room);
