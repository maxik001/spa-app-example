import React from 'react';

export default class Alert extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		const className = "alert alert-dismissible alert-"+this.props.type;
		
		return (
			<div className={className}>
				{this.props.text}
			</div>
		);
	}
}