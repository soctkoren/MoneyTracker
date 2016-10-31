import React from 'react';
import './styles.css';

const TransactionHeader = () => {
	return (
		<div className='Header'>
			<div className='transactionLeft'>
				<div className='transactionDate Date'>
					<p>Date</p>
				</div>
				<div className='transactionAmount'>
					<p>Merchant</p>
				</div>
			</div>	
			<div className='transactionDebitCredit'>
				<div className='transactionCredit'><p>Credit</p></div>
				<div className='transactionDebit'><p>Debit</p></div>
			</div>
		</div>
	)
}

export default TransactionHeader;

