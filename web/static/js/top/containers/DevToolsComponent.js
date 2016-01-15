const React = require('react');
const { Provider, connect } = require('react-redux');

class DevToolsComponent extends React.Component {
    render() {
        const { store } = this.props;
        return (
            <div>
                <p>ここにdevtools</p>
            </div>
        );
    }
}

module.exports = connect()(DevToolsComponent);