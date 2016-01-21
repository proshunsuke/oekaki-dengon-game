const React = require('react');
const { connect } = require('react-redux');
import { Socket } from 'phoenix';

class Room extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // 以下のようにがんばる
        //let socket = new Socket('/ws');
        //socket.connect();
        //let channel = socket.channel('room');
        //channel.on('new:todo', msg => console.log('new:todo', msg));
        //channel.join()
        //    .receive('ok', messages => console.log('catching up', messages))
        //    .receive('error', reason => console.log('failed join', reason))
        //    .after(10000, () => console.log('Networking issue. Still waiting...'));
    }

    render() {
        return <div>
            <p>ここルーム</p>
        </div>;
    }
}

module.exports = connect()(Room);