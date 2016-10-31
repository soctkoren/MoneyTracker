import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './Reducers/reducers.js';
import TransactionActivityPage from './Components/TransactionActivityPage';
import './index.css';

const store = createStore(
  rootReducers,
	applyMiddleware(
  	thunkMiddleware, promise
  )
)

ReactDOM.render(
	<Provider store={store}>
    <TransactionActivityPage />
	</Provider>,
  document.getElementById('root')
);
