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
        const { dispatch } = this.props;
        return (
            <div>
                <Button onClick={() => dispatch(routeActions.push('/room'))}>部屋を作る</Button>
                <ActiveRooms />
            </div>
        );
    }
}

module.exports = connect()(Home);
