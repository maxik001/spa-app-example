import React from 'react';

import FormLogin from '../components/form_login';

export default class Login extends React.Component {
	constructor() {
		super()
	}
	
	render() {
		return (
			<div className="container">
				<FormLogin />
			</div>
		);
	}
}