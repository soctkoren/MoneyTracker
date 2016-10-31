import React from 'react';
import './styles.css';

const CreditBox = ({amount}) => {
	return (
		<div className='transactionDebitCredit'>
			<div className='transactionCredit'><p> </p></div>
			<div className='transactionDebit'><p>{Math.abs(amount)}</p></div>
		</div>
	)
}

export default CreditBox;

