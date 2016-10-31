import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducers from './Reducers/reducers.js';
import TransactionActivityPage from './Components/TransactionActivityPage';
import './index.css';

//Configure middleware w/ redux-promise for AJAX requests
const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

const store = createStore(rootReducers)

ReactDOM.render(
	<Provider store={store}>
    <TransactionActivityPage />
	</Provider>,
  document.getElementById('root')
);
