import React from 'react';

export default class LayoutGlobal extends React.Component {
	constructor(){
		super();
	}
	
	render() {
		return (
			<div className="container">
				{this.props.children}
			</div>
		);
	}
} 
