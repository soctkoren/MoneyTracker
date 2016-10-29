import React from 'react';
import data from '../../../data.json';

export default class TransactionActivitypage extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data: {}
	  };
	}

	componentDidMount() {
		this.state = {
			data: data
		};
		{console.log(this.state.data)}
	}

	render () {
		return (
			<div>yo
			</div>
		)
	}
}
