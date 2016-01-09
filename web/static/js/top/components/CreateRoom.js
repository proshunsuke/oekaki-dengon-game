const React = require('react');
const { connect } = require('react-redux');
const { createRoomRequestIfNeeded } = require('../actions/createRoom');
import { Button, Input, ButtonInput } from 'react-bootstrap';

class CreateRoomContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
    }

    handleCreateRoom(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        console.log(this.props);
        dispatch(createRoomRequestIfNeeded(e.target.value));
    }

    render() {
        return <div>
            <form className="form-horizontal" onSubmit={this.handleCreateRoom}>
                <Input type="text" label="ユーザ名" placeholder="ユーザー名を入力してください" labelClassName="col-xs-2"
                       wrapperClassName="col-xs-10"/>
                <Input type="text" label="部屋の名前" placeholder="部屋の名前を入力してください" labelClassName="col-xs-2"
                       wrapperClassName="col-xs-10"/>
                <Input type="password" label="パスワード" placeholder="パスワードを入力してください" labelClassName="col-xs-2"
                       wrapperClassName="col-xs-10"/>
                <ButtonInput type="submit" value="送信" wrapperClassName="col-xs-offset-2 col-xs-10"/>
            </form>
        </div>;
    }
}

module.exports = connect()(CreateRoomContainer);