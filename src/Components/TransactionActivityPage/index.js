import React from 'react';
import data from '../../../data.json';
import { connect } from 'react-redux';
import { setModeFilter } from '../../Actions/actions.js';
import Transaction from './transaction.js';

const mapStateToProps = (state) => {
	return {
		data: state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setModeFilter: (mode) => dispatch(setModeFilter(mode))
	}
}

class TransactionActivityPage extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data: [],
	  	visiableData: [],
	  	credit: 0,
	  	debit: 0,
	  	monthYearSplitAndSum: {}
	  };

	  this.setFilter = this.setFilter.bind(this);
	}

	componentWillMount() {
		console.log(this.props)
		// this.state = {
		// 	data: data.transactions
		// };
		// this.monthYearSplitAndSum(data);
	}

	setFilter() {
		this.props.setModeFilter('IGNORE_DONUT')
	}

	monthYearSplitAndSum(data) {
		let totalDebit = 0
		let totalCredit = 0
		const monthYearSplitAndSum = {}
		
		// Create sum for debit and credit. Also create month & year parser. Doing both work here instead of
		// iterating through again.
		data.transactions.forEach((transaction) => {
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

		// console.log(totalCredit)
		// console.log(totalDebit)
		// console.log(monthYearSplitAndSum)

		this.setState({
			credit: totalCredit,
			debit: totalDebit,
			monthYearSplitAndSum: monthYearSplitAndSum
		})
	}

	render () {
		return (
			<div>
				<div className='navBar'>
					<ul>
						<li>
							All
						</li>
						<li>
							<p>{this.props.data.visibilityFilter.ModeFilters}</p>					
							<button onClick={this.setFilter}>test</button>
						</li>
						<li>
							Crystal Ball
									{console.log(this.props.data.visibilityFilter)}
						</li>
						<li>
							Ignore CC
						</li>
					</ul>
				</div>
				<div className='activitySummaryContainer'>
					
				</div>
				<div className='transactionListContainer'>
				  {this.state.data.map(function(transaction, i) {
				  	return <Transaction key={i} props={transaction} />
				  })}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionActivityPage)
