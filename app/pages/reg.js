import React from 'react';

import FormReg from '../components/form_reg';

export default class Reg extends React.Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<div className="row">
				<div className="col-md-3">
				</div>
				<div className="col-md-6">
					<FormReg />
				</div>
				<div className="col-md-3">
				</div>
			</div>
		);
	}
}