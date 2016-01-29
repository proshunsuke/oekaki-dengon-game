const React = require('react');
const { connect } = require('react-redux');
const { startSocket } = require('../actions/createRoom');

class Room extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        // 一旦やめとく
        //dispatch(startSocket());
    }

    render() {
        return <div>
            <p>ここルーム</p>
        </div>;
    }
}

module.exports = connect()(Room);