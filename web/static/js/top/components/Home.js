const React = require('react');
const { connect } = require('react-redux');
const ActiveRooms = require('./ActiveRooms');
import { Button } from 'react-bootstrap';
import { routeActions } from 'redux-simple-router'

class Home extends React.Component {
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


//function Home({ dispatch }) {
//    console.log('aaaaaaa');
//  return (
//    <div>
//        <Button onClick={() => dispatch(routeActions.push('/room'))}>部屋を作る</Button>
//        <ActiveRooms />
//    </div>
//  );
//};

module.exports = connect()(Home);
