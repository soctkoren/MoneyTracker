import React from 'react';
import data from '../../../data.json';
import Transaction from './transaction.js';

export default class TransactionActivitypage extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data: [],
	  	credit: 0,
	  	debit: 0,
	  	monthYearSpliter: {}
	  };
	}

	componentWillMount() {
		this.state = {
			data: data.transactions
		};
		this.monthYearSplitAndSum(data);
	}

	monthYearSplitAndSum(data) {
		let totalDebit = 0
		let totalCredit = 0
		const monthYearSpliter = {}
		
		// Create sum for debit and credit. Also create month & year parser. Doing both work here instead of
		// iterating through again.
		data.transactions.forEach((transaction) => {
		// Create date parser. Rather than converting to date.
		// split 2014-10-08T10:41:00.000Z by -. first 2 index gives unquie year and month key
		// that can be stored to the collection monthYearSpliter
		const date = transaction['transaction-time'].split('-')
		const yearMonth = (date[0] + date[1])
			if (monthYearSpliter[yearMonth]) {
				monthYearSpliter[yearMonth].push(transaction)
			} else {
				monthYearSpliter[yearMonth] = [transaction]
			}

		// Logic to push transaction amount to debit or credit
			if (transaction.amount <= 0) {
				totalDebit += transaction.amount
			} else {
				totalCredit += transaction.amount
			}
		})

		console.log(totalCredit)
		console.log(totalDebit)
		console.log(monthYearSpliter)

		this.setState({
			credit: totalCredit,
			debit: totalDebit,
			monthYearSpliter: monthYearSpliter
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
							Ignore Donuts
						</li>
						<li>
							Crystal Ball
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
