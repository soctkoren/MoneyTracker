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

// export function fetchTransactions(mode) {
// 	const instance = axios.create({
// 	  baseURL: 'https://2016.api.levelmoney.com/api/v2/core/',
// 	  timeout: 1000,
// 	  headers: {
// 	  	'Content-Type': 'application/json',
// 	  	'Accept': 'application/json'
// 	  }
// 	});
// 	const args = {"args": {"uid":  1110590645, "token":  "F002AA5679C51E60FF7A1823DD39C49C", "api-token":  "AppTokenForInterview", "json-strict-mode": false, "json-verbose-response": false}};
//   const request = instance.post(`${mode}`, 
//   		JSON.stringify(args))
// 		  .then(function (response) {
// 		  	receiveTransactions(mode, response.data)
// 		  })
// 		  .catch(function (error) {
// 		    console.log(error);
// 		  })
//   console.log(request)

// 	return {
//   	type: 'FETCH_TRANSACTION',
//   	mode
//   };
// }
export function fetchTransactions(mode) {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestTransactions(mode))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.
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
  console.log(data.transactions)
  return {
    type: 'RECEIVE_TRANSACTION',
    data: data.transactions,
    mode
  }
}


function requestTransactions(mode) {
  return {
    type: 'REQUEST_TRANSACTION',
    mode
  }
}



