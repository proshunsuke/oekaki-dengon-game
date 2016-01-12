const React = require('react');
import '../../css/app.css';
const ReactDOM = require('react-dom');
const { createStore, combineReducers, applyMiddleware, compose } = require('redux');
import thunk from 'redux-thunk';
const { Provider } = require('react-redux');
const { Router, Route, IndexRoute } = require('react-router');
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import { devTools } from 'redux-devtools';
const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');

const reducers = require('./reducers/index');
let reducer = combineReducers(reducers);
const { App, Home, CreateRoom } = require('./components');

const history = createHistory();

let finalCreateStore;
if (process.env.NODE_ENV === 'production') {
  finalCreateStore = applyMiddleware(thunk)(createStore)
} else {
  finalCreateStore = compose(
      applyMiddleware(thunk),
      devTools()
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
