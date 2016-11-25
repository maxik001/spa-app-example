import React from 'react';

import Alert from './alert';

import * as FormRegActions from '../actions/form_reg_actions';
import FormRegStore from '../stores/form_reg_store'; 

export default class FromLogin extends React.Component {
	constructor() {
		super();
		
		this.state = { 
			email: { value: "", isValid: true, errorMsg: "" },
			form: { isSubmitSuccess: true, errorMsg: "" }
		}
		
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentWillMount() {
		FormRegStore.on(
			"submit_fail",
			() => {
				console.log("Catch fail in component");
				this.setState({ form: { isSubmitSuccess: false, errorMsg: "You pass invalid email" }});
			}
		);
	}
	
	handleEmailChange(event) {
		this.setState({
			email: {value: event.target.value}
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		if(this.validateEmail(this.state.email.value)) {
			this.setState({ 
				email: {isValid: true} 
			});
			
			FormRegActions.submitForm(this.state.email.value);
		} else {
			this.setState({ 
				email: {isValid: false} 
			});
		}
	}
	
	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
	
	render() {
		const formGroupClassName = this.state.email.isValid?"form-group":"form-group has-error";
		
		const alertMessage = this.state.form.isSubmitSuccess?"":<Alert type="danger" text="Hello" />;
		
		return (
			<form className="form-horizontal" onSubmit={this.handleSubmit}>

				<fieldset>
					<legend>Регистрация</legend>
					
					{alertMessage}
					
					<p>Укажите E-mail, на который необходимо отправить подтверждение регистрации</p>
					<div className={formGroupClassName}>
						<label for="email" className="control-label col-md-2">E-mail</label>
						<div className="col-md-10">
							<input type="text" name="email" value={this.state.email.value} onChange={this.handleEmailChange} className="form-control" id="email" />
							{this.state.email.isValid?"":<p className="text-danger">Значение не похоже на e-mail</p>}
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