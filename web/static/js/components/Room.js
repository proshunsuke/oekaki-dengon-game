import React, { PropTypes } from 'react';
const { connect } = require('react-redux');
const Status = require('./Status');
const UserList = require('./UserList');
const Draw = require('./Draw');
const Setting = require('./Setting');
const OtherService = require('./OtherService');

class Room extends React.Component {
    render() {
        const { users, client, gameInfo, rooms } = this.props;
	let drawOrSettingArea;
	// リーダーの時設定中の時は設定画面を出す
	// TODO: roomsは非同期で取得してくる
	if (!(client.roomId in rooms)) {
	    drawOrSettingArea = <Draw />;
	} else if (rooms[client.roomId].status === 'setting' && client.role === 'leader') {
	    drawOrSettingArea = <Setting gameInfo={gameInfo} />;
	} else {
	    drawOrSettingArea = <Draw />;
	}

        return <div>
	    <Status client={client} rooms={rooms}/>
	    <OtherService client={client} rooms={rooms}/>
            { drawOrSettingArea }
            <UserList users={users}/>
        </div>;
    }
}

const mapStateToProps = state => ({
    users: state.users,
    client: state.client,
    gameInfo: state.gameInfo,
    rooms: state.rooms
});
Room.propTypes = { users: PropTypes.array.isRequired };
module.exports = connect(mapStateToProps)(Room);
