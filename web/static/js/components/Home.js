import React, { PropTypes } from 'react'
const { connect } = require('react-redux');
const ActiveRooms = require('./ActiveRooms');
const { fetchRoomsIfNeeded } = require('../actions/client');
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
                <ActiveRooms rooms={rooms}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({rooms: state.rooms})
Home.propTypes = { rooms: PropTypes.array.isRequired }
module.exports = connect(mapStateToProps)(Home);
