import React from 'react';
import data from '../../../data.json';

export default class TransactionActivitypage extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data: [],
	  	credit: 0,
	  	debit: 0
	  };
	}

	componentWillMount() {
		this.state = {
			data: data.transactions
		};
		this.debitAndCreditTotal(data);
	}

	debitAndCreditTotal(data) {
		const debit = []
		const credit = []
		const arr = data.transactions.forEach((transaction) => {
			if (transaction.amount <= 0) {
				debit.push(transaction.amount)
			} else {
				credit.push(transaction.amount)
			}
		})

		const totalDebit = debit.reduce((a, b) => {
			return a + b
		})

		const totalCredit = credit.reduce((a,b) => {
			return a +b
		})

		this.setState({
			credit: totalCredit,
			debit: totalDebit
		})
	}

	render () {
		return (
			<div>
			  <ul>
			  {this.state.data.map(function(t, i) {
			  	return <li key={i}>{t.amount}</li>
			  })}
		    </ul>
			</div>
		)
	}
}
