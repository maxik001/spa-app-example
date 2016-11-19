import React from 'react';

export default class Footer extends React.Component {
	constructor() {
		super();
		this.state = {
			text: "Copyright (c) Maxim O. Gusev"
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