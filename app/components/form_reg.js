import React from 'react';

import Alert from './alert';

import * as FormRegActions from '../actions/form_reg_actions';
import FormRegStore from '../stores/form_reg_store'; 

export default class FromReg extends React.Component {
	constructor() {
		super();
		
		this.state = {
			email: {value: "", isValid: true, errorMsg: ""},
			submitStatus: "initial", // Available status: initial, process, completed
			hasError: false
		};
		
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitFail = this.handleSubmitFail.bind(this);
		this.handleSubmitProcess = this.handleSubmitProcess.bind(this);
		this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this);
	}
	
	componentWillMount() {
		FormRegStore.on("submit_fail", this.handleSubmitFail);
		FormRegStore.on("submit_process", this.handleSubmitProcess);
		FormRegStore.on("submit_success", this.handleSubmitSuccess);
	}
	
	componentWillUnmount() {
		FormRegStore.removeListener("submit_fail", this.handleSubmitFail);
		FormRegStore.removeListener("submit_process", this.handleSubmitProcess);
		FormRegStore.removeListener("submit_success", this.handleSubmitSuccess);
	}
	
	handleEmailChange(event) {
		this.setState({email: {value: event.target.value, isValid: true, errorMsg: ""}});
	}
	
	handleSubmit(event) {
		event.preventDefault();
		
		if(this.validateEmail(this.state.email.value)) {
			this.setState({email: {value: this.state.email.value, isValid: true}});
			FormRegActions.submitForm(this.state.email.value);
		} else {
			this.setState({email: {value: this.state.email.value, isValid: false}});
		}
	}
	
	handleSubmitFail() {
		this.setState({submitStatus: "completed"});
		this.setState({hasError: true});
	}
	
	handleSubmitProcess() {
		this.setState({submitStatus: "process"});
		this.setState({submitInProcess: true});
	}
	
	handleSubmitSuccess() {
		this.setState({submitStatus: "completed"});
		this.setState({hasError: false});
	}

	
	validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
	
	render() {
		switch(this.state.submitStatus) {
			case "initial": {
				const formGroupClassName = this.state.email.isValid?"form-group":"form-group has-error";
				
				const alertMessage = this.state.hasError?<Alert type="danger" text="Ошибка" />:"";
				
				return(
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
				break;
			}
			case "process": {
				return(
					<form className="form-horizontal">
						<fieldset>
							<legend>Регистрация</legend>
							<Alert type="success" text="Ваш запрос обрабатывается. Подождите пожалуйста..." />
						</fieldset>
					</form>					
				);
				break;
			}
			case "completed": {
				return(
					<form className="form-horizontal">
						<fieldset>
							<legend>Регистрация</legend>
							<Alert type="success" text="Отлично! В ближайшее время на указанный вами e-mail будет отправлено письмо для подтверждения регистрации." />
						</fieldset>
					</form>					
				);				
				break;
			}
		}
	}
}