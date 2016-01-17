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

const reducers = require('./reducers');

const { App, Home, CreateRoom, Room } = require('./components');

const history = createHistory();
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

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="room" component={CreateRoom}/>
          <Route path="room/:id" component={Room}/>
        </Route>
      </Router>
      <DevToolsComponent store={store}/>
    </div>
  </Provider>,
  document.getElementById('root')
);
