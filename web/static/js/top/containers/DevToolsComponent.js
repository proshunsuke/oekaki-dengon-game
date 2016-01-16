const React = require('react');
const { connect } = require('react-redux');
const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

class DevToolsComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { store } = this.props;
        return (
            <DebugPanel top right bottom>
                <DevTools store={store} monitor={LogMonitor} />
            </DebugPanel>
        );
    }
}

module.exports = connect()(DevToolsComponent);