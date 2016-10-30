import React from 'react';
import Transaction from './transaction.js'

import './styles.css';

const TransactionList = ({heading, value}) => {
	return (
		<div className='transactionContainer'>
			<h1>{heading}</h1>
			<div className='transactionListContainer'>
			  {value.map(function(transaction, i) {
			  	return <Transaction key={i} props={transaction} />
			  })}
			</div>
		</div>
	)
}

export default TransactionList;

