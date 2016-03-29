import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
const App = require('./components/App');

const reducer = combineReducers({
  ...reducers
})

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);
const store = finalCreateStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
