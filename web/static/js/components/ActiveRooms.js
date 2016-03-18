import React, { PropTypes } from 'react';
const { connect } = require('react-redux');
const { setRoomId } = require('../actions/client');
import { Button } from 'react-bootstrap';
import { routeActions } from 'redux-simple-router';

class ActiveRooms extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnterRoom = this.handleEnterRoom.bind(this);
    }

    handleEnterRoom(roomId, e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(setRoomId(roomId));
        dispatch(routeActions.push(`/room/${roomId}/enter`));
    }

    render() {
        const { rooms } = this.props;
        return (
            <ul>
                {rooms.map((room, i) =>
                    <li
                        key={room.id}>{i}. id: {room.id}, 部屋の名前: {room.name}, ステータス: {room.status},
                        描く時間: {room.draw_time}
                        <Button onClick={this.handleEnterRoom.bind(this, room.id)}>部屋に入る</Button>
                    </li>
                )}
            </ul>
        );
    }
}

ActiveRooms.propTypes = { rooms: PropTypes.array.isRequired };
module.exports = connect()(ActiveRooms);
