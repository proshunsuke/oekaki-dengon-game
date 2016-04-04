import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
const { connect } = require('react-redux');

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.handleSetting = this.handleSetting.bind(this);
    }
    handleSetting(e) {
        e.preventDefault();
	console.log("設定ボタン押した");
    }
    render() {
        return <div>
	    <Button onClick={this.handleSetting}>設定</Button>
	    </div>;
    }
}

module.exports = connect()(Setting);
