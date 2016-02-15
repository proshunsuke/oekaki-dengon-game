const React = require('react');
const { connect } = require('react-redux');
const { joinRoom } = require('../actions/socketChannel');
const { componentDidMountRoom, mouseDown, mouseMove, mouseUp, mouseLeave } = require('../actions/draw');
import { findDOMNode } from 'react-dom';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseMove = this.handleOnMouseMove.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
        this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
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
        const { dispatch } = this.props;
        const rect = e.target.getBoundingClientRect();
        console.log(rect.top);
        const startX = e.clientX - rect.top;
        const startY = e.clientY - rect.right;
        dispatch(mouseDown(startX, startY));
    }

    handleOnMouseMove(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const rect = e.target.getBoundingClientRect();
        const startX = e.clientX - rect.top;
        const startY = e.clientY - rect.right;
        dispatch(mouseMove(startX, startY));
    }

    handleOnMouseUp(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(mouseUp());
    }

    handleOnMouseLeave(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(mouseLeave());
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
                style={canvasStyle} ref='area'
                onMouseDown={this.handleOnMouseDown.bind(this)}
                onMouseMove = {this.handleOnMouseMove.bind(this)}
                onMouseUp = {this.handleOnMouseUp.bind(this)}
                onMouseLeave = {this.handleOnMouseLeave.bind(this)}
            />
        </div>;
    }
}

module.exports = connect()(Room);