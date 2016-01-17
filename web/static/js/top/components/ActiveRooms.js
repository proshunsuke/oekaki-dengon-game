const React = require('react');
const { connect } = require('react-redux');
import { Button, Input, ButtonInput } from 'react-bootstrap';

class ActiveRooms extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            これ
        </div>;
    }
}

module.exports = connect()(ActiveRooms);