const React = require('react');
const { connect } = require('react-redux');
const { joinRoom } = require('../actions/socketChannel');
const { componentDidMountRoom, mouseDown, mouseMove, mouseUp } = require('../actions/draw');
import { findDOMNode } from 'react-dom';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(joinRoom());
        const context = findDOMNode(this.refs.area).getContext('2d');
        dispatch(componentDidMountRoom(context));
        this.paint(context);
    }

    handleOnMouseDown(e) {
        e.preventDefault();
        const { dispatch, draw } = this.props;
        dispatch(mouseDown(e.clientX, e.clientY));
    }

    handleOnMouseMove(e) {
        e.preventDefault();
        const { dispatch, draw } = this.props;
        dispatch(mouseMove(e.clientX, e.clientY));
    }

    handleOnMouseUp(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(mouseUp());
    }

    paint(context) {
        context.save();
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, 600, 400);
        context.restore();
    }

    render() {
        const canvasStyle = {
            border: '1px solid #000000',
            width: 600,
            height: 400
        }

        return <div>
            <canvas
                style={canvasStyle} ref='area' onMouseDown={this.handleOnMouseDown.bind(this)}
                onMouseMove = {this.handleOnMouseMove.bind(this)}
                onMouseUp = {this.handleOnMouseUp.bind(this)}
            />
        </div>;
    }
}

function mapStateToProps(state) {
    const { draw } = state;
    return {
        draw
    }
}

module.exports = connect(mapStateToProps)(Room);