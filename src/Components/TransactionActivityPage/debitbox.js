import React from 'react';
import './styles.css';

const DebitBox = ({amount}) => {
	return (
		<div className='transactionDebitCredit'>
			<div className='transactionCredit'><p>{amount}</p></div>
			<div className='transactionDebit'><p> </p></div>
		</div>
	)
}

export default DebitBox;
