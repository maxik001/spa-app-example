import React from 'react';

export default class Footer extends React.Component {
	constructor() {
		super();
		
		let curYear = new Date().getFullYear();
		this.state = {
			text: "Copyright (c) Maxim O. Gusev, " + curYear 
		}
	}
	
	render() {
		return (
			<div className="row">
				<div className="col-md-12">
					<hr/>
					<p className="text-center">
						{this.state.text}
					</p>
				</div>
			</div>
		);
	}
}