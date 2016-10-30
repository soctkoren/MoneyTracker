import React from 'react';
import data from '../../../data.json';
import { connect } from 'react-redux';
import { setModeFilter } from '../../Actions/actions.js';
import Transaction from './transaction.js';

const mapStateToProps = (state) => {
	return {
		data: state
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setModeFilter: (mode) => dispatch(setModeFilter(mode))
	}
}

function mapObject(object, callback) {
  return Object.keys(object).map(function (key) {
    return callback(key, object[key]);
  });
}

class TransactionActivityPage extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data: [],
	  	visiableData: [],
	  	credit: 0,
	  	debit: 0,
	  	monthYearSplitAndSum: {'2014':[]}
	  };

	  this.setFilter = this.setFilter.bind(this);
	}

	componentWillMount() {
	}

	setFilter() {
		this.props.setModeFilter('IGNORE_DONUT')
	}

	render () {
		return (
			<div>
				<div className='navBar'>
					<ul>
						<li>
							All
						</li>
						<li>
							<p>{this.props.data.app.ModeFilters}</p>					
							<button onClick={this.setFilter}>test</button>
						</li>
						<li>
								
						</li>
						<li>
							Ignore CC
							{this.props.data.app.visibleData.totalCredit}
						</li>
					</ul>
				</div>
				<div className='activitySummaryContainer'>
					{this.props.data.app.visibleData.monthYearSplitAndSum ? mapObject(this.props.data.app.visibleData.monthYearSplitAndSum, function (key, value) {
  					console.log(key)
  					console.log(value)
					}) : <div>d</div> }
				</div>
				<div className='transactionListContainer'>
				  {this.state.data.map(function(transaction, i) {
				  	return <Transaction key={i} props={transaction} />
				  })}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionActivityPage)
