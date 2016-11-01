import React from 'react';
import cc from '../../../../public/cc.png'
import MiniTransactions from '../Transactions/minitransactions.js'
import './styles.css';

const SideWidget = ({props}) => {
	return (
		<div>
			<div className='Widget'>
				<div className='MiniHeader'>
					<p>CC DR/CR</p>
				</div>
				<div className='MiniTransactionsList'>
					{props.map(function(transaction, i) {
			  		return <MiniTransactions key={i} props={transaction} />
			  	})}
				</div>
			</div>
		</div>
	)
}

export default SideWidget;