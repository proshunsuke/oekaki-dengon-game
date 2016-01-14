const React = require('react');
import '../../css/app.css';
const ReactDOM = require('react-dom');
const { compose, createStore, combineReducers, applyMiddleware } = require('redux');
import thunk from 'redux-thunk';
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute } = require('react-router');
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { devTools } from 'redux-devtools';
const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

const reducers = require('./reducers');
let middleware = [ thunk ];
const { App, Home, CreateRoom } = require('./components');

const history = createHistory();
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

let finalCreateStore;

// こここうすると動かない
// DebugPanelコンポーネントを別で定義して__ENVで読み込むか決めないとだめ

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
syncReduxAndRouter(history, store);
ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="room" component={CreateRoom}/>
        </Route>
      </Router>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
  </Provider>,
  document.getElementById('root')
);
