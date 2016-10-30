import data from '../../data.json';
import { combineReducers } from 'redux';

const initialState = {
	ModeFilters: 'SHOW_ALL',
	data: data.transactions,
	visibleData: {}
}

const app = (state = initialState, action) => {  
  switch (action.type) {
    case 'SHOW_ALL':
    	return Object.assign({}, state, {
				ModeFilters: action.mode,
				visibleData: showAll(state)
			})
    case 'IGNORE_DONUT':
			return Object.assign({}, state, {
				ModeFilters: action.mode,
				visibleData: ignoreDonuts(state)
			})
		case 'IGNORE_CC':
			return Object.assign({}, state, {
				ModeFilters: action.mode,
				visibleData: ignoreCC(state)
			})
    default:
      return state
  }
}

const showAll = (state) => {
	let visibleData = monthYearSplitAndSum(state.data)
	return visibleData
}

const ignoreDonuts = (state) => {
	let visibleData = monthYearSplitAndSum(state.data.filter(isNotDonut))
	return visibleData
}

function isNotDonut(transaction) {
	if (transaction['raw-merchant'] !== "DUNKIN #336784" && transaction['raw-merchant'] !== "Krispy Kreme Donuts") {
		return true
	} else {
		return false
	}
}

const ignoreCC = (state) => {
	let visibleData = monthYearSplitAndSum(state.data.filter(isNotCC))
	return visibleData
}

function isNotCC(transaction) {
	if (transaction['raw-merchant'] !== "CC payment" && transaction['raw-merchant'] !== "CREDIT CARD PAYMENT") {
		return true
	} else {
		return false
	}
}




function monthYearSplitAndSum(visibleData) {
	let totalDebit = 0
	let totalCredit = 0
	const monthYearSplitAndSum = {}
	// Create sum for debit and credit. Also create month & year parser. Doing both work here instead of
	// iterating through again.
	visibleData.forEach((transaction) => {
	// Create date parser. Rather than converting to date.
	// split 2014-10-08T10:41:00.000Z by -. first 2 index gives unquie year and month key
	// that can be stored to the collection monthYearSplitAndSum
	const date = transaction['transaction-time'].split('-')
	const yearMonth = (date[0] + date[1])
		if (monthYearSplitAndSum[yearMonth]) {
			monthYearSplitAndSum[yearMonth].push(transaction)
		} else {
			monthYearSplitAndSum[yearMonth] = [transaction]
		}

	// Logic to push transaction amount to debit or credit
		if (transaction.amount <= 0) {
			totalDebit += transaction.amount
		} else {
			totalCredit += transaction.amount
		}
	})

	return visibleData = {monthYearSplitAndSum, totalDebit, totalCredit}
}

const rootReducers = combineReducers({
	app,
})

export default rootReducers