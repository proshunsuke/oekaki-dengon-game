const React = require('react');
const { connect } = require('react-redux');
import { Button } from 'react-bootstrap';
import { routeActions } from 'redux-simple-router'

class ActiveRooms extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { dispatch, rooms } = this.props;
        return (
            <ul>
                {rooms.map((room, i) =>
                    <li
                        key={i}>{i}. id: {room.id}, 部屋の名前: {room.name}, ステータス: {room.status}, 描く時間: {room.draw_time}
                        <Button onClick={() => dispatch(routeActions.push(`/room/${room.id}/enter`))}>部屋に入る</Button>
                    </li>
                )}
            </ul>
        )
    }
}

module.exports = connect()(ActiveRooms);