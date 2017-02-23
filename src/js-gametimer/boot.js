import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as Reducers from './reducers';
import '../sass/gametimer.scss';
import GameTimer from './components/GameTimer';

const reducers = combineReducers(Reducers);

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Provider store={ store }>
    <GameTimer />
  </Provider>,
  document.getElementById('root')
);
