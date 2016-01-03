const React = require('react');
const { connect } = require('react-redux');
const { increase, decrease } = require('../actions/count');
import { Button } from 'react-bootstrap';

function Home({ number, increase, decrease }) {
  return (
    <div>
      Some state changes:
      {number}
      <Button onClick={() => increase(1)}>Increase</Button>
      <Button onClick={() => decrease(1)}>Decrease</Button>
    </div>
  );
};

module.exports = connect(
  state => ({ number: state.count.number }),
  { increase, decrease }
)(Home);
