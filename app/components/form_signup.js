import React from 'react';

import * as FormSignupActions from '../actions/form_signup_actions';
import FormSignupStore from '../stores/form_signup_store';

import PageNotFound from '../pages/not_found';

export default class FormSignup extends React.Component {
	constructor() {
		super();

		this.state = {
			hash: null,
			hashNotFound: false,
			email: "",
			nickname: { value: "", isValid: true, errorMsg: "" },
			password1: { value: "", isValid: true, errorMsg: "" },
			password2: { value: "", isValid: true, errorMsg: "" }
		}
		
		this.handleHashInvalid = this.handleHashInvalid.bind(this);
		this.handleHashValid = this.handleHashValid.bind(this);
		this.handleNicknameChange = this.handleNicknameChange.bind(this);
		this.handlePassword1Change = this.handlePassword1Change.bind(this);
		this.handlePassword2Change = this.handlePassword2Change.bind(this);
	}
	
	componentWillMount() {
		FormSignupStore.on('hash_valid', this.handleHashValid);
		FormSignupStore.on('hash_invalid', this.handleHashInvalid);
		
		if(this.props.params.hash) { FormSignupActions.validateHash(this.props.params.hash); }
	}
	
	componentWillUnmount() {
		FormSignupStore.removeListener('hash_valid', this.handleHashValid);
		FormSignupStore.removeListener('hash_invalid', this.handleHashInvalid);
	}

	handleHashValid(email) {
		this.setState({email:email});
	}
	
	handleHashInvalid() {
		this.setState({hashNotFound: true});
	}

	handleNicknameChange(event) {
		this.setState({nickname: {value: event.target.value, isValid: true, errorMsg: ""}});
	}
	
	handlePassword1Change(event) {
		this.setState({password1: {value: event.target.value, isValid: true, errorMsg: ""}});
	}

	handlePassword2Change(event) {
		this.setState({password2: {value: event.target.value, isValid: true, errorMsg: ""}});
	}

	
	render() {
		if(this.state.hashNotFound) {
			return(<PageNotFound />);
		} else {
			const formGroupClassName = true?"form-group":"form-group has-error";
			
			return (
				<form className="form-horizontal">
					<fieldset>
						<legend>Подтверждение регистрации</legend>
							<p>Для завершения заполните пожалуйста поля формы</p>
							
							<div className="form-group">
								<label htmlFor="email" className="control-label col-md-3">E-mail</label>
								<div className="col-md-9">
									<input type="text" value={this.state.email} className="form-control" id="email" readOnly />
								</div>
							</div>
							
							
							<div className={formGroupClassName}>
								<label htmlFor="nickname" className="control-label col-md-3">Ник</label>
								<div className="col-md-9">
									<input type="text" name="nickname" value={this.state.nickname.value} onChange={this.handleNicknameChange} className="form-control" id="nickname" />
								</div>
							</div>
							
							<div className="form-group">
								<label htmlFor="password1" className="control-label col-md-3">Пароль</label>
								<div className="col-md-9">
									<input type="password" name="password1" value={this.state.password1.value} onChange={this.handlePassword1Change} className="form-control" id="password1" />
								</div>
							</div>
							
							<div className="form-group">
								<label htmlFor="password2" className="control-label col-md-3">Пароль (повтор)</label>
								<div className="col-md-9">
									<input type="password" name="password2" value={this.state.password2.value} onChange={this.handlePassword2Change} className="form-control" id="password2" />
								</div>
							</div>

							<div className="form-group">
								<div className="col-md-offset-4 col-md-7">
									<button type="submit" value="submit" className="btn btn-success col-md-12">Зарегистрироваться</button>
								</div>
							</div>
					</fieldset>
				</form>
			);
		}
		
	}
}