const React = require('react');
const { connect } = require('react-redux');
const { joinRoom } = require('../actions/socketChannel');
import { findDOMNode } from 'react-dom';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickCanvas = this.handleClickCanvas.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(joinRoom());
        const context = findDOMNode(this.refs.area).getContext('2d');
        this.paint(context);
    }

    handleClickCanvas(e) {
        e.preventDefault();
        console.log('clickした');
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
            <canvas width={600} height={400} ref='area' onClick={this.handleClickCanvas.bind(this)}/>;
        </div>;
    }
}

module.exports = connect()(Room);