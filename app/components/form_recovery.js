import React from 'react';

export default class FromSignup extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<form className="form-horizontal">
				<fieldset>
					<legend>Восстановление пароля</legend>
					Здесь будет форма восстановления пароля
				</fieldset>
			</form>
		);
	}
}