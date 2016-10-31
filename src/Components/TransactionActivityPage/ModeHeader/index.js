import React from 'react';
import './styles.css';

const ModeHeader = ({props}) => {
	const Mode = {
		'SHOW_ALL': 'All Transactions',
		'IGNORE_DONUT': 'Ignore Donuts',
		'IGNORE_CC': 'Ignore CC'
	}

	return (
		<div className='ModeHeader'>
			<h2>{Mode[props]}</h2>
		</div>
	)
}

export default ModeHeader;

