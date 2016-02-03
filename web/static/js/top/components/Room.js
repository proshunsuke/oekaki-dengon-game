const React = require('react');
const { connect } = require('react-redux');
const { joinRoom } = require('../actions/socketChannel');
import { findDOMNode } from 'react-dom';

class Room extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(joinRoom());
        const context = findDOMNode(this.refs.area).getContext('2d');
        this.paint(context);
    }

    paint(context) {
        context.save();
        context.translate(100, 100);
        context.rotate(this.props.rotation, 100, 100);
        context.fillStyle = '#F00';
        context.fillRect(-50, -50, 100, 100);
        context.restore();
    }

    render() {
        return <div>
            <p>ここルーム</p>
            <canvas width={200} height={200} ref='area'/>;
        </div>;
    }
}

module.exports = connect()(Room);