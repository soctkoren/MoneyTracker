import React from 'react';
import data from '../../../data.json';
import { connect } from 'react-redux';
import { setModeFilter } from '../../Actions/actions.js';
import TransactionList from './transactionlist.js';
import Carousel from 'nuka-carousel';
import Decorators from './decorators.js';

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
			<div className='ReportsContainer'>
				<div className='navBar'>
					<div>
						<button onClick={() => this.setFilter('SHOW_ALL')}>All Transactions</button>
					</div>
					<div>
						<button onClick={() => this.setFilter('IGNORE_DONUT')}>Ignore Donuts</button>
					</div>
					<div>
						<button onClick={() => this.setFilter('IGNORE_CC')}>Ignore CC</button>
					</div>
				</div>
				<div className='SummaryContainer'>
					{this.props.data.app.visibleData.totalCredit}					
					{this.props.data.app.visibleData.totalDebit}
					{this.props.data.app.visibleData.totalCredit + this.props.data.app.visibleData.totalDebit}
				</div>
				<div className='activitySummaryContainer'>
					<Carousel dragging={true} decorators={Decorators}>
						{this.props.data.app.visibleData.monthYearSplitAndSum ? mapObject(this.props.data.app.visibleData.monthYearSplitAndSum, function (key, value) {
	  					return <TransactionList heading={key} value={value}/>
						}) : <div className='listContainer'></div> }
					</Carousel>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionActivityPage)
