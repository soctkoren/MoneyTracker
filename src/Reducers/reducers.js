import { combineReducers } from 'redux';

const initialState = {
	ModeFilters: 'RECEIVE_TRANSACTION',
	data: [],
	visibleData: {},
	loaded: false
}

const app = (state = initialState, action) => {  
  switch (action.type) {
  	case 'RECEIVE_TRANSACTION': 
  		return Object.assign({}, state, {
  			data: action.data,
  			ModeFilters: 'SHOW_ALL',
				visibleData: showAll(action),
				loaded: action.loaded
  		})
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
	if (state.data) {
		let visibleData = monthYearSplitAndSum(state.data)
		return visibleData
	}
	return state
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
	if (transaction['raw-merchant'].toLowerCase() !== "cc payment" && transaction['raw-merchant'] !== "CREDIT CARD PAYMENT") {
		return true
	} else {
		return false
	}
}

function monthYearSplitAndSum(visibleData) {
	let totalDebit = 0
	let totalCredit = 0
	let histogramMonths = {
		'01': 'January',
		'02': 'February',
		'03': 'March',
		'04': 'April',
		'05': 'May',
		'06': 'June',
		'07': 'July',
		'08': 'August',
		'09': 'September',
		'10': 'October',
		'11': 'November',
		'12': 'December'
	}
	const monthYearSplitAndSum = {}
	// Create sum for debit and credit. Also create month & year parser. Doing both work here instead of
	// iterating through again.
	visibleData.forEach((transaction) => {
	// Create date parser. Rather than converting to date.
	// split 2014-10-08T10:41:00.000Z by -. first 2 index gives unquie year and month key
	// that can be stored to the collection monthYearSplitAndSum
	const date = transaction['transaction-time'].split('-')
	const yearMonth = (histogramMonths[date[1]] + ' ' + date[0])
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
	
	for (let key in monthYearSplitAndSum) {
		let monthDebit = 0
		let monthCredit = 0
		let total = 0
		let DebitCount = 0
		let avgSpending = 0
		monthYearSplitAndSum[key].forEach(function(a){
			if (a.amount <= 0) {
				monthDebit += a.amount
				DebitCount += 1
			} else {
				monthCredit += a.amount
			}
			total += a.amount
			avgSpending = Math.floor(monthCredit / DebitCount)
		})
		monthYearSplitAndSum[key] = [monthYearSplitAndSum[key], monthDebit, monthCredit, total, avgSpending, DebitCount]
	}
	
	return visibleData = {monthYearSplitAndSum, totalDebit, totalCredit}
}

const rootReducers = combineReducers({
	app,
})

export default rootReducers