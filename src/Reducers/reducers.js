import data from '../../data.json';
import { combineReducers } from 'redux';

const initialState = {
	ModeFilters: 'SHOW_ALL',
	data: data.transactions,
	visibleData: data.transactions,
}

const visibilityFilter = (state = initialState, action) => {  
  switch (action.type) {
    case 'IGNORE_DONUT':
			console.log('yo')
			return Object.assign({}, state, {
				ModeFilters: action.mode,
				visibleData: ignoreDonuts(state)
			})
    default:
      return state
  }
}

const ignoreDonuts = (state) => {
	let visibleData = state.data.filter(isNotDonut)
	return Object.assign([], state, visibleData: visibleData)
}

function isNotDonut(transaction) {
	if (transaction['raw-merchant'] !== "DUNKIN #336784" && transaction['raw-merchant'] !== "Krispy Kreme Donuts") {
		return true
	} else {
		return false
	}
}

const rootReducers = combineReducers({
	visibilityFilter,
})

export default rootReducers