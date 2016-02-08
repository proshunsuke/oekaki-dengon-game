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
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, 600, 400);
        context.restore();
    }

    render() {
        return <div>
            <p>ここルーム</p>
            ここ<canvas width={600} height={400} ref='area' onMouseDown={this.handleClickCanvas.bind(this)}/>まで
        </div>;
    }
}

module.exports = connect()(Room);