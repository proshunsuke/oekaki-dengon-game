const React = require('react');
const { connect } = require('react-redux');
const { enterRoomsIfNeeded } = require('../actions/createRoom');
import { Button, Input, ButtonInput } from 'react-bootstrap';

class EnterRoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnterRoomRequest = this.handleEnterRoomRequest.bind(this);
    }

    handleEnterRoomRequest(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(enterRoomsIfNeeded({
            userName: this.refs.userName.refs.input.value
        }));
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleEnterRoomRequest}>
                    <Input type="text" label="ユーザ名" placeholder="ユーザー名を入力してください" labelClassName="col-xs-2"
                           wrapperClassName="col-xs-10" ref='userName'/>
                    <ButtonInput type="submit" value="送信" wrapperClassName="col-xs-offset-2 col-xs-10"/>
                </form>
            </div>
        )
    }
}

module.exports = connect()(EnterRoom);