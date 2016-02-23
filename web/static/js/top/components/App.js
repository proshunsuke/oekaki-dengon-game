const React = require('react');
const { Link } = require('react-router');
const { connect } = require('react-redux');
const { startSocket, joinLobby } = require('../actions/socketChannel');
import { Button, Navbar, NavItem, MenuItem, NavDropdown, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(startSocket());
        dispatch(joinLobby());
    }

    render() {
        const { children } = this.props;
        return (
            <div>
                <header>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">お絵かき伝言ゲーム</Link>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>
                            <LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer>
                        </Nav>
                    </Navbar>
                </header>
                <div style={{marginTop: '1.5em'}}>{children}</div>
            </div>
        );
    }
}

module.exports = connect()(App);
