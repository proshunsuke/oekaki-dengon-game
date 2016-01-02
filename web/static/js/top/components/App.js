const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const { pushPath } = require('redux-simple-router');
import { Button, Navbar, NavItem, MenuItem, NavDropdown, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function App({ pushPath, children }) {
  return (
    <div>
      <header>
          <Navbar>
              <Navbar.Header>
                  <Navbar.Brand>
                      <a href="#">React-Bootstrap</a>
                  </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                  <LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer>
                  <NavItem eventKey={2} href="#">Link</NavItem>
                  <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                      <MenuItem eventKey={3.1}>Action</MenuItem>
                      <MenuItem eventKey={3.2}>Another action</MenuItem>
                      <MenuItem eventKey={3.3}>Something else here</MenuItem>
                      <MenuItem divider />
                      <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
              </Nav>
          </Navbar>
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
