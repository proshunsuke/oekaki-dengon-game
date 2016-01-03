const React = require('react');
import { Button, Input, ButtonInput } from 'react-bootstrap';

module.exports = function CreateRoom() {
    return <div>
        <form>
            <Input type="text" label="部屋の名前" placeholder="部屋の名前を入力してください" />
            <Input type="password" label="パスワード" placeholder="パスワードを入力してください" />
            <ButtonInput type="submit" value="送信" />
        </form>
    </div>;
}