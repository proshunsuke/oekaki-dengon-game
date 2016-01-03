const React = require('react');
import { Button } from 'react-bootstrap';

module.exports = function CreateRoom() {
    return <div>
        <p>ここに部屋の名前</p>
        <p>ここにパスワード</p>
        <Button>部屋を作る</Button>
    </div>;
}