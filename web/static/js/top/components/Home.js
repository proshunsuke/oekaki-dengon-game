const React = require('react');
const { connect } = require('react-redux');
import { Button } from 'react-bootstrap';
import { routeActions } from 'redux-simple-router'

function Home({ dispatch }) {
  return (
    <div>
        <Button onClick={() => dispatch(routeActions.push('/room'))}>部屋を作る</Button>
    </div>
  );
};

module.exports = connect(
    null
)(Home);
