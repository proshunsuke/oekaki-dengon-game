const React = require('react');
const { connect } = require('react-redux');
import {Socket, LongPoller} from "phoenix"

class Room extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <p>ここルーム</p>
        </div>;
    }
}

module.exports = connect()(Room);