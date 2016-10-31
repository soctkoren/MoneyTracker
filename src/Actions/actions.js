import Axios from 'axios';

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
  return dispatch => {
    dispatch(requestTransactions(mode))
    return fetch(`https://2016.api.levelmoney.com/api/v2/core/${mode}`)
      .then(response => response.json())
      .then(json => dispatch(receiveTransactions(mode, json)))
  }
}

function receiveTransactions(mode, json) {
  return {
    type: 'RECEIVE_TRANSACTION',
    mode,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function requestTransactions(mode) {
  return {
    type: 'REQUEST_TRANSACTION',
    mode
  }
}


