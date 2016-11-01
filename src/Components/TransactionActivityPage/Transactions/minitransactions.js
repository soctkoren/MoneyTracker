import React from 'react';
import './styles.css';

const MiniTransactions = ({props}) => {
	return (
		<div className='miniTransactionContainer'>
			{props.amount < 0 ? <div className='Dr'>{props.amount}</div> : <div className='Cr'>{props.amount}</div>}
		</div>
	)
}

export default MiniTransactions;

