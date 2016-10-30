import data from '../../data.json';
import { combineReducers } from 'redux';

const initialState = {
	ModeFilters: 'SHOW_ALL',
	data: data.transactions
}

const visibilityFilter = (state = initialState, action) => {  
  switch (action.type) {
    case 'IGNORE_DONUT':
			console.log('yo')
			return Object.assign({}, state, {
				ModeFilters: action.mode
			})
    default:
      return state
  }
}

const rootReducers = combineReducers({
	visibilityFilter,
})

export default rootReducers