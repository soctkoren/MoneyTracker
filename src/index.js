import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';
import { rootReducers } from './Reducers/reducers.js';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import App from './App';
import TransactionActivityPage from './Components/TransactionActivityPage';
import './index.css';

const store = createStore(
  combineReducers({
    ...rootReducers,
    routing: routerReducer
  }),
  applyMiddleware(
  	thunkMiddleware,
  )
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path='/' component={TransactionActivityPage}/>
		</Router>
	</Provider>,
  document.getElementById('root')
);
