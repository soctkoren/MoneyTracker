import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from './Reducers/reducers.js';
import TransactionActivityPage from './Components/TransactionActivityPage';
import './index.css';

const store = createStore(rootReducers)

ReactDOM.render(
	<Provider store={store}>
    <TransactionActivityPage />
	</Provider>,
  document.getElementById('root')
);
