const React = require('react');
const { connect } = require('react-redux');
import { Button, Input, ButtonInput } from 'react-bootstrap';

class ActiveRooms extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                {this.props.rooms.map((room, i) =>
                    <li
                        key={i}>{i}. id: {room.id}, 部屋の名前: {room.name}, ステータス: {room.status}, 描く時間: {room.draw_time}
                        <Button>部屋に入る</Button>
                    </li>
                )}
            </ul>
        )
    }
}

module.exports = connect()(ActiveRooms);