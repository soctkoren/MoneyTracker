import React from 'react';
import './styles.css';

const DebitBox = ({amount}) => {
	return (
		<div className='transactionDebitCredit'>
			<div className='transactionCredit'><p> </p></div>
			<div className='transactionDebit'><p>{amount}</p></div>
		</div>
	)
}

export default DebitBox;
