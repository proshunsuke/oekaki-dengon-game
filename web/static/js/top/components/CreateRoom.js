const React = require('react');
const { connect } = require('react-redux');
const { createRoomRequest } = require('../actions/createRoom');
import { Button, Input, ButtonInput } from 'react-bootstrap';

function CreateRoom(userName, roomName, roomPassword, createRoomRequest) {
    return <div>
        <form className="form-horizontal" onSubmit={() => createRoomRequest}>
            <Input type="text" label="ユーザ名" placeholder="ユーザー名を入力してください" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={userName}/>
            <Input type="text" label="部屋の名前" placeholder="部屋の名前を入力してください" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={roomName}/>
            <Input type="password" label="パスワード" placeholder="パスワードを入力してください" labelClassName="col-xs-2" wrapperClassName="col-xs-10" value={roomPassword}/>
            <ButtonInput type="submit" value="送信" wrapperClassName="col-xs-offset-2 col-xs-10"/>
        </form>
    </div>;
}

module.exports = connect(
    state => ({
        userName: state.createRoom.userName,
        roomName: state.createRoom.roomName,
        roomPassword: state.createRoom.roomPassword
    }),
    { createRoomRequest }
)(CreateRoom);