import React from 'react';
import CreditBox from './creditbox.js'
import DebitBox from './debitbox.js'

import './styles.css';

const Transaction = ({props}) => {
	return (
		<div className='transactionContainer'>
			<div className='transactionDate'>
				<p>{props['transaction-time'].substring(5,10)}</p>
			</div>
			<div className='transactionAmount'>
				<p>{props.merchant}</p>
			</div>
			{props.amount <= 0 ? <CreditBox amount={props.amount}/> : <DebitBox amount={props.amount}/> }
		</div>
	)
}

export default Transaction;

