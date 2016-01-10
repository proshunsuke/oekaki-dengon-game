const React = require('react');
const { connect } = require('react-redux');
import { Button } from 'react-bootstrap';
const { pushPath } = require('redux-simple-router');

function Home({ pushPath }) {
  return (
    <div>
        <Button onClick={() => pushPath('/room')}>部屋を作る</Button>
    </div>
  );
};

module.exports = connect(
    null,
  { pushPath }
)(Home);
