const React = require('react');
const { connect } = require('react-redux');
const { createRoomRequestIfNeeded } = require('../actions/createRoom');
import { Button, Input, ButtonInput } from 'react-bootstrap';

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
    }

    handleCreateRoom(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(createRoomRequestIfNeeded({
            userName: this.refs.userName.refs.input.value,
            roomName: this.refs.roomName.refs.input.value,
            roomPassword: this.refs.roomPassword.refs.input.value
        }));
    }

    render() {
        return <div>
            <form className="form-horizontal" onSubmit={this.handleCreateRoom}>
                <Input type="text" label="ユーザ名" placeholder="ユーザー名を入力してください" labelClassName="col-xs-2"
                       wrapperClassName="col-xs-10" ref='userName'/>
                <Input type="text" label="部屋の名前" placeholder="部屋の名前を入力してください" labelClassName="col-xs-2"
                       wrapperClassName="col-xs-10" ref='roomName'/>
                <Input type="password" label="パスワード" placeholder="パスワードを入力してください" labelClassName="col-xs-2"
                       wrapperClassName="col-xs-10" ref="roomPassword"/>
                <ButtonInput type="submit" value="送信" wrapperClassName="col-xs-offset-2 col-xs-10"/>
            </form>
        </div>;
    }
}

module.exports = connect()(CreateRoom);