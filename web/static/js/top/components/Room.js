const React = require('react');
const { connect } = require('react-redux');
const { joinRoom } = require('../actions/socketChannel');

class Room extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(joinRoom());
    }

    render() {
        return <div>
            <p>ここルーム</p>
        </div>;
    }
}

module.exports = connect()(Room);