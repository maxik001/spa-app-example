import React from 'react';

import * as FormRegActions from '../actions/form_reg_actions';
import FormRegStore from '../stores/form_reg_store'; 

export default class FromLogin extends React.Component {
	constructor() {
		super();
		
		this.state = { email: "" };
		
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleEmailChange(event) {
		this.setState({
			email: event.target.value
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		FormRegActions.submitForm(this.state.email);
	}
	
	render() {
		return (
			<form className="form-horizontal" onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>Регистрация</legend>
					<p>Укажите E-mail, на который необходимо отправить подтверждение регистрации</p>
					<div className="form-group">
						<label for="email" className="col-md-2">E-mail</label>
						<div className="col-md-10">
							<input type="email" name="email" value={this.state.email} onChange={this.handleEmailChange} className="form-control" id="email" />
						</div>
					</div>
					<div className="form-group">
						<div className="col-md-offset-3 col-md-8">
							<button type="submit" value="submit" className="btn btn-success col-md-12">Зарегистрироваться</button>
						</div>
					</div>
				</fieldset>
			</form>
		);
	}
}