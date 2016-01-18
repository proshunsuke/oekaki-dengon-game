const React = require('react');
const { connect } = require('react-redux');
import { Button, Input, ButtonInput } from 'react-bootstrap';

class EnterRoom extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnterRoom = this.handleEnterRoom.bind(this);
    }

    handleEnterRoom(e) {
        e.preventDefault();
        alert("まだ入れません");
        // ここ部屋に入る処理
    }

    render() {
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.handleEnterRoom}>
                    <Input type="text" label="ユーザ名" placeholder="ユーザー名を入力してください" labelClassName="col-xs-2"
                           wrapperClassName="col-xs-10" ref='userName'/>
                    <ButtonInput type="submit" value="送信" wrapperClassName="col-xs-offset-2 col-xs-10"/>
                </form>
            </div>
        )
    }
}

module.exports = connect()(EnterRoom);