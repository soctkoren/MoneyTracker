import React from 'react';
import Transaction from './transaction.js';
import TransactionHeader from './transactionheader.js';

import './styles.css';

const TransactionList = ({heading, value}) => {	
	console.log(value[0])
	return (
		<div className='listContainer'>
			<div className='DetailContainer'>
				<h1>{heading}</h1>
				<div className='Circle shadow'>
					<p>Count: {value[5]}</p>
					<p>Avg: {value[4]}</p>
				</div>
			</div>
			<TransactionHeader/>
			<div className='transactionListContainer'>
			  {value[0].map(function(transaction, i) {
			  	return <Transaction key={i} props={transaction} />
			  })}
			</div>
			<div className='transactionTotalContainer'>
				<div className='transactionTotalLabel'>
					<p>Totals</p>
				</div>
				<div className='transactionTotal'>
					<div className='transactionTotalCredit'>
						<span className='underline'><p>{value[2]}</p></span>
					</div>
					<div className='transactionTotalDebit'>
						<span className='underline'><p>{Math.abs(value[1])}</p></span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TransactionList;

