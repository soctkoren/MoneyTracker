import React from 'react';
import { connect } from 'react-redux';
import { setModeFilter, fetchTransactions } from '../../Actions/actions.js';
import TransactionList from './Transactions/transactionlist.js';
import Carousel from 'nuka-carousel';
import Decorators from './decorators.js';
import ModeHeader from './ModeHeader';
import './Transactions/styles.css';

const mapStateToProps = (state) => {
	return {
		data: state
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchTransactions: (transactions) => dispatch(fetchTransactions(transactions)),
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
	  	selected: 'SHOW_ALL'
	  };

	  this.props.fetchTransactions('get-all-transactions')
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
		this.setState({selected  : mode})
		this.props.setModeFilter(mode)
	}

  isActive(mode){
    return ((mode===this.state.selected) ?'active':'default');
  }

	render () {
		return (
			<div className='ReportsContainer'>
				<div className='navBar'>
					<div>
						<button className={this.isActive('SHOW_ALL')} onClick={() => this.setFilter('SHOW_ALL')}>All Transactions</button>
					</div>
					<div>
						<button className={this.isActive('IGNORE_DONUT')} onClick={() => this.setFilter('IGNORE_DONUT')}>Ignore Donuts</button>
					</div>
					<div>
						<button className={this.isActive('IGNORE_CC')} onClick={() => this.setFilter('IGNORE_CC')}>Ignore CC</button>
					</div>
				</div>
				<div className='ModeSummaryContainer'>
					<ModeHeader props={this.props.data.app.ModeFilters}/>
					<div className='SummaryContainer'>
						<div className='HeadingCard Income'>
							<div><p>Total Income: {this.props.data.app.visibleData.totalCredit}</p></div>
						</div>
						<div className='HeadingCard Spending'>
							<div><p>Total Spending: {this.props.data.app.visibleData.totalDebit}</p></div>
						</div>
						<div className='HeadingCard Net'>
							<div><p>Net: {this.props.data.app.visibleData.totalCredit + this.props.data.app.visibleData.totalDebit}</p></div>
						</div>	
					</div>	
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
