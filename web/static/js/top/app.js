const React = require('react');
import '../../css/app.css';
const ReactDOM = require('react-dom');
const { compose, createStore, combineReducers, applyMiddleware } = require('redux');
import thunk from 'redux-thunk';
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute, browserHistory } = require('react-router');
import { createHistory } from 'history'
import { syncHistory, routeReducer } from 'redux-simple-router'
import { devTools } from 'redux-devtools';
import DevToolsComponent from './containers/index';
const { startSocket, joinLobby, leaveOtherChannel } = require('./actions/socketChannel');

const reducers = require('./reducers');

const { App, Home, CreateRoom, EnterRoom, Room } = require('./components');

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));
const reduxRouterMiddleware = syncHistory(browserHistory)
let middleware = [ thunk, reduxRouterMiddleware ];

let finalCreateStore;

if (__DEV__) {
  finalCreateStore = compose(
      applyMiddleware(...middleware),
      devTools()
  )(createStore);
} else {
  finalCreateStore = compose(
      applyMiddleware(...middleware)
  )(createStore);
}

const store = finalCreateStore(reducer);
reduxRouterMiddleware.listenForReplays(store);

store.dispatch(startSocket());

function channelCheckInHome() {
  store.dispatch(leaveOtherChannel());
  store.dispatch(joinLobby());
}

function channelCheckInCreateRoom() {
  store.dispatch(leaveOtherChannel());
}

function channelCheckInEnterRoom() {
  store.dispatch(leaveOtherChannel());
}

function channelCheckInRoom() {
  store.dispatch(leaveOtherChannel());
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} onEnter={channelCheckInHome}/>
          <Route path="room" component={CreateRoom} onEnter={channelCheckInCreateRoom} />
          <Route path="room/:id" component={Room}  onEnter={channelCheckInRoom}/>
          <Route path="room/:id/enter" component={EnterRoom} onEnter={channelCheckInEnterRoom} />
        </Route>
      </Router>
      <DevToolsComponent store={store}/>
    </div>
  </Provider>,
  document.getElementById('root')
);
