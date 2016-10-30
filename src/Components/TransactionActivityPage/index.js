import React from 'react';
import data from '../../../data.json';
import { connect } from 'react-redux';
import { setModeFilter } from '../../Actions/actions.js';
import TransactionList from './transactionlist.js';

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
	  	data: []
	  };

	  this.setFilter = this.setFilter.bind(this);
	}

	componentWillMount() {
		this.setFilter('SHOW_ALL')
	}

	componentWillReceiveProps(nextProps) {
		const prop = nextProps.data.app.visibleData
		this.setState({
			credit: prop.totalCredit,
			debit: prop.totalDebit,
			monthYearSplitAndSum: prop.monthYearSplitAndSum
		});
	}

	setFilter(mode) {
		this.props.setModeFilter(mode)
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
							{this.props.data.app.visibleData.totalCredit}
							<p>{this.props.data.app.ModeFilters}</p>					
							<button onClick={() => this.setFilter('IGNORE_DONUT')}>test</button>
						</li>
						<li>
							<button onClick={() => this.setFilter('IGNORE_CC')}>test</button>
							{this.props.data.app.visibleData.totalDebit}
						</li>
						<li>
							{console.log(this.state)}
							{this.props.data.app.visibleData.totalCredit + this.props.data.app.visibleData.totalDebit}
						</li>
					</ul>
				</div>
				<div className='activitySummaryContainer'>
					{this.props.data.app.visibleData.monthYearSplitAndSum ? mapObject(this.props.data.app.visibleData.monthYearSplitAndSum, function (key, value) {
  					return <TransactionList heading={key} value={value}/>
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
