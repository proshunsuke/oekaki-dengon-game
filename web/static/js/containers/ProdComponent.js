const React = require('react');
const { connect } = require('react-redux');

class DevToolsComponent extends React.Component {
    render() {
        return (
            <div></div>
        );
    }
}

module.exports = connect()(DevToolsComponent);