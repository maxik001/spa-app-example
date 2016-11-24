import React from 'react';

export default class Alert extends React.Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<div className="alert alert-dismissible alert-danger">
				<button type="button" className="close" data-dismiss="alert">&times;</button>
				Test
			</div>

		);
	}
}