import axios from 'axios';

// constants
export const SET_MODE_FILTER = 'SET_MODE_FILTER'

export const ModeFilters = {
  SHOW_ALL: 'SHOW_ALL',
  IGNORE_DONUT: 'IGNORE_DONUT',
  CRYSTAL_BALL: 'CRYSTAL_BALL',
  IGNORE_CC: 'IGNORE_CC'
}

//action creators
export function setModeFilter(mode) {
  return { 
  	type: mode, 
  	mode 
  }
}

export function fetchTransactions(mode) {
  return function (dispatch) {
    dispatch(requestTransactions(mode))
    	const instance = axios.create({
			  baseURL: 'https://2016.api.levelmoney.com/api/v2/core/',
			  timeout: 1000,
			  headers: {
			  	'Content-Type': 'application/json',
			  	'Accept': 'application/json'
			  }
			});
			const args = {"args": {"uid":  1110590645, "token":  "F002AA5679C51E60FF7A1823DD39C49C", "api-token":  "AppTokenForInterview", "json-strict-mode": false, "json-verbose-response": false}};
		  return instance.post(`${mode}`, 
		  		JSON.stringify(args))
				  .then(function (response) {
				  	dispatch(receiveTransactions(mode, response.data))
				  })
				  .catch(function (error) {
				    console.log(error);
				  })
  }
}


function receiveTransactions(mode, data) {
  return {
    type: 'RECEIVE_TRANSACTION',
    data: data.transactions,
    loaded: true
  }
}

function requestTransactions(mode) {
  return {
    type: 'REQUEST_TRANSACTION',
    mode
  }
}



