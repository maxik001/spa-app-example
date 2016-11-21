import React from 'react';

export default class LayoutGlobal extends React.Component {
	constructor(){
		super();
		console.log(this.props.children);
	}
	
	render() {
		return (
			<div>
			{this.props.children}
			</div>
		);
	}
} 
