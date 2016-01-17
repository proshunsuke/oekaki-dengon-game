const React = require('react');
const { connect } = require('react-redux');
const ActiveRooms = require('./ActiveRooms');
const { fetchRoomsIfNeeded } = require('../actions/room');
import { Button } from 'react-bootstrap';
import { routeActions } from 'redux-simple-router'

class Home extends React.Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchRoomsIfNeeded());
    }

    render() {
        const { dispatch, rooms } = this.props;
        return (
            <div>
                <Button onClick={() => dispatch(routeActions.push('/room'))}>部屋を作る</Button>
                <ActiveRooms rooms = {rooms}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { room } = state;
    let rooms = room.rooms;
    // ここもうちょっとなんとかなりそう
    if (rooms == null) {
        rooms = []
    }
    return {
        rooms
    }
}

module.exports = connect(mapStateToProps)(Home);
