const React = require('react');
const { connect } = require('react-redux');
const { increase, decrease } = require('../actions/count');
import { Button } from 'react-bootstrap';
const { pushPath } = require('redux-simple-router');

function Home({ number, increase, decrease, pushPath }) {
  return (
    <div>
      Some state changes:
      {number}
      <Button onClick={() => increase(1)}>Increase</Button>
      <Button onClick={() => decrease(1)}>Decrease</Button>
        <Button onClick={() => pushPath('/room')}>部屋を作る</Button>
    </div>
  );
};

module.exports = connect(
  state => ({ number: state.count.number }),
  { increase, decrease, pushPath }
)(Home);
