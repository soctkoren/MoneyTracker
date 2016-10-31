import React from 'react';
import './Transactions/styles.css';

const Decorators = [{
  component: React.createClass({
    render() {
      return (
	       <div className='MonthButtonsContainer'>
	        <button className='PrevButton'
	          onClick={this.props.previousSlide}>
	          Prev Month
	        </button>
	        <button className='NextButton'
	          onClick={this.props.nextSlide}>
	          Next Month
	        </button>
        </div>
      )
    }
  }),
  position: 'TopCenter',
  style: {
    
  }
}];

export default Decorators