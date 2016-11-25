import React from 'react';

import Alert from './alert';

import * as FormRegActions from '../actions/form_reg_actions';
import FormRegStore from '../stores/form_reg_store'; 

export default class FromLogin extends React.Component {
	constructor() {
		super();
		
		this.state = { 
			email: { value: "", isValid: true, errorMsg: "" },
			form: { wasSend: false, isSubmitSuccess: true, errorMsg: "" }
		}
		
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitFail = this.handleSubmitFail.bind(this);
	}
	
	componentWillMount() {
		FormRegStore.on("submit_fail", this.handleSubmitFail);
		FormRegStore.on("submit_success", this.handleSubmitSuccess);
	}
	
	handleEmailChange(event) {
		this.setState({
			email: {
				value: event.target.value,
				isValid: true,
				errorMsg: ""
			}
		});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		if(this.validateEmail(this.state.email.value)) {
			this.setState({ 
				email: {value: this.state.email.value, isValid: true},
				form: { isSubmitSuccess: true, errorMsg: "" }
			});
			
			FormRegActions.submitForm(this.state.email.value);
		} else {
			this.setState({ 
				email: {value: this.state.email.value, isValid: false} 
			});
		}
	}
	
	handleSubmitFail() {
		this.setState({ form: { wasSend: true, isSubmitSuccess: false, errorMsg: "Упс! Ошибка! Попробуйте чуть позже! " }});
	}
	
	handleSubmitSuccess() {
		this.setState({ form: { wasSend: true, isSubmitSuccess: true }});
	}

	
	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
	
	render() {
		const formGroupClassName = this.state.email.isValid?"form-group":"form-group has-error";
		
		const alertMessage = this.state.form.isSubmitSuccess?"":<Alert type="danger" text={this.state.form.errorMsg} />;
		
		if(this.state.form.wasSend === false || (this.state.form.wasSend === true && this.state.form.isSubmitSuccess === false) ) {
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
		} else {
			return(
				<form className="form-horizontal">

					<fieldset>
						<legend>Регистрация</legend>
						<Alert type="success" text="Отлично! В ближайшее время на указанный вами e-mail будет отправлено письмо для подтверждения регистрации." />
					</fieldset>
				</form>					
				
			);
			
		}
	}
}