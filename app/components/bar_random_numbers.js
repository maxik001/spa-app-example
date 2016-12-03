import React from 'react';

import * as BarRandomNumbersActions from '../actions/bar_random_numbers_actions'; 
import BarRandomNumbersStore from '../stores/bar_random_numbers_store';

export default class BarRandomNumbers extends React.Component {
	constructor() {
		super();
		
		this.state = {
			intervalId: null,
			numbers : [null, null, null, null, null, null]
		}
		
		this.changeNumbers = this.changeNumbers.bind(this);
		this.needUpdate = this.needUpdate.bind(this);
	}
	
	componentDidMount() {
		BarRandomNumbersStore.on("need_update", this.changeNumbers);

		const interval = parseInt(this.props.updateInterval)*1000;
		var id = setInterval(
			this.needUpdate,
			interval
		);
		this.setState({intervalId: id});
	}
	
	componentWillUnmount() {
		clearInterval(this.state.intervalId);
		
		BarRandomNumbersStore.removeListener("need_update", this.changeNumbers);
	}
	
	changeNumbers(numbers) {
		this.setState({numbers: numbers}); 
	}
	
	needUpdate() {
		BarRandomNumbersActions.getData();
	}
	
	render() {
		return(
			<div className="row">
				<div className="col-md-2">{this.state.numbers[0]}</div>
				<div className="col-md-2">{this.state.numbers[1]}</div>
				<div className="col-md-2">{this.state.numbers[2]}</div>
				<div className="col-md-2">{this.state.numbers[3]}</div>
				<div className="col-md-2">{this.state.numbers[4]}</div>
				<div className="col-md-2">{this.state.numbers[5]}</div>
			</div>
		);
	}
}