import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
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

const LoaderOptions = {
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: 'white',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: false,
    zIndex: 2e9,
    top: '50%',
    left: '50%',
    scale: 0.7
}

class TransactionActivityPage extends React.Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data: [],
	  	selected: 'SHOW_ALL',
	  	loaded: false
	  };

	  this.setFilter = this.setFilter.bind(this);
	  this.props.fetchTransactions('get-all-transactions')
	}

	componentWillMount() {
		this.setFilter('SHOW_ALL')
	}

	componentWillReceiveProps(nextProps) {
		const prop = nextProps.data.app.visibleData

		this.setState({
			credit: prop.totalCredit,
			debit: prop.totalDebit,
			monthYearSplitAndSum: prop.monthYearSplitAndSum,
			loaded: nextProps.data.app.loaded 
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

		let data = this.props.data.app
		
		return (
			<div className='ReportsContainer'>
				<Loader loaded={this.state.loaded} options={LoaderOptions} className="spinner"/> 
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
					<ModeHeader props={data.ModeFilters}/>
					<div className='SummaryContainer'>
						<div className='HeadingCard Income'>
							<div><p>Total Income: {data.visibleData.totalCredit}</p></div>
						</div>
						<div className='HeadingCard Spending'>
							<div><p>Total Spending: {data.visibleData.totalDebit}</p></div>
						</div>
						<div className='HeadingCard Net'>
							<div><p>Net: {data.visibleData.totalCredit + data.visibleData.totalDebit}</p></div>
						</div>	
					</div>	
				</div>
				<div className='activitySummaryContainer'>
					{
						data.loaded ? 
						<Carousel dragging={true} decorators={Decorators}>
							{mapObject(data.visibleData.monthYearSplitAndSum, function (key, value) {
		  					return <TransactionList key={key} heading={key} value={value}/>
							})}
						</Carousel> : <div className='listContainer'></div>
					}
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionActivityPage)
