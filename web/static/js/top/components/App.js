const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const { pushPath } = require('redux-simple-router');
import { Button } from 'react-bootstrap';

function App({ pushPath, children }) {
  return (
    <div>
      <header>
        Links:
        {' '}
        <Link to="/">Home</Link>
        {' '}
        <Link to="/foo">Foo</Link>
        {' '}
        <Link to="/bar">Bar</Link>
      </header>
      <div>
        <Button onClick={() => pushPath('/foo')}>Go to /foo</Button>
      </div>
      <div style={{marginTop: '1.5em'}}>{children}</div>
    </div>
  );
};

module.exports = connect(
  null,
  { pushPath }
)(App);
