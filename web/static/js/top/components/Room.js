const React = require('react');
const { connect } = require('react-redux');
const { joinRoom } = require('../actions/socketChannel');
const { componentDidMountRoom, mouseDown, mouseMove, mouseUp, mouseLeave } = require('../actions/draw');
import { findDOMNode } from 'react-dom';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const CANVAS_SCALE_X = 300; // この値ちょっと不明
const CANVAS_SCALE_Y = 150; // この値ちょっと不明
const CANVAS_SCALE_RATE_X = CANVAS_SCALE_X / CANVAS_WIDTH;
const CANVAS_SCALE_RATE_Y = CANVAS_SCALE_Y / CANVAS_HEIGHT;

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
        const context = findDOMNode(this.refs.area).getContext('2d');
        dispatch(joinRoom());
        dispatch(componentDidMountRoom(context));
    }

    handleOnMouseDown(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const startX = (e.pageX - e.target.offsetLeft)*CANVAS_SCALE_RATE_X;
        const startY = (e.pageY - e.target.offsetTop)*CANVAS_SCALE_RATE_Y;
        dispatch(mouseDown(startX, startY));
    }

    handleOnMouseMove(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        const startX = (e.pageX - e.target.offsetLeft)*CANVAS_SCALE_RATE_X;
        const startY = (e.pageY - e.target.offsetTop)*CANVAS_SCALE_RATE_Y;
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

    render() {
        const canvasStyle = {
            border: '1px solid #000000',
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
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