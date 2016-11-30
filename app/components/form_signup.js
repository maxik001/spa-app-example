import React from 'react';

import * as FormSignupActions from '../actions/form_signup_actions';
import FormSignupStore from '../stores/form_signup_store';

import PageNotFound from '../pages/not_found';

export default class FormSignup extends React.Component {
	constructor() {
		super();

		this.state = {
			hash: null,
			hashNotFound: false
		}
		
		this.handleHashInvalid = this.handleHashInvalid.bind(this);
		this.handleHashValid = this.handleHashValid.bind(this);
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

	handleHashValid() {
		console.log("catch valid hash");
	}
	
	handleHashInvalid() {
		console.log("catch invalid hash");
		this.setState({hashNotFound: true});
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
							<div className={formGroupClassName}>
								<label for="nickname" className="control-label col-md-3">Ник</label>
								<div className="col-md-9">
									<input type="text" name="nickname" value="" className="form-control" id="nickname" />
								</div>
							</div>
							
							<div className="form-group">
								<label for="password1" className="control-label col-md-3">Пароль</label>
								<div className="col-md-9">
									<input type="password" name="password1" value="" className="form-control" id="password1" />
								</div>
							</div>
							
							<div className="form-group">
								<label for="password2" className="control-label col-md-3">Пароль (повтор)</label>
								<div className="col-md-9">
									<input type="password" name="password2" value="" className="form-control" id="password2" />
								</div>
							</div>

							<div className="form-group">
								<div className="col-md-offset-4 col-md-7">
									<button type="submit" value="submit" className="btn btn-success col-md-12">Зарегистрироваться</button>
								</div>
							</div>
						{this.props.params.hash}
					</fieldset>
				</form>
			);
		}
		
	}
}