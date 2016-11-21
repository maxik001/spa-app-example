import React from 'react';

import FormLogin from '../components/form_login';

export default class Login extends React.Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<div className="row">
				<div className="col-md-4">
				</div>
				<div className="col-md-4">
					<FormLogin />
				</div>
				<div className="col-md-4">
				</div>
			</div>
		);
	}
}