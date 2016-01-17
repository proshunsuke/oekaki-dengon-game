const React = require('react');
const { connect } = require('react-redux');
import { Button, Input, ButtonInput } from 'react-bootstrap';

class ActiveRooms extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <ul>
                {this.props.rooms.map((room, i) =>
                    <li key={i}>{room.name}</li>
                )}
            </ul>
        )
    }
}

module.exports = connect()(ActiveRooms);