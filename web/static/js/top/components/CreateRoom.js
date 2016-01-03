const React = require('react');
import { Button, Input, ButtonInput } from 'react-bootstrap';

module.exports = function CreateRoom() {
    return <div>
        <form className="form-horizontal">
            <Input type="text" label="部屋の名前" placeholder="部屋の名前を入力してください" labelClassName="col-xs-2" wrapperClassName="col-xs-10" />
            <Input type="password" label="パスワード" placeholder="パスワードを入力してください" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
            <ButtonInput type="submit" value="送信" wrapperClassName="col-xs-offset-2 col-xs-10"/>
        </form>
    </div>;
}