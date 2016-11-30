import React from 'react';

export default class FromSignup extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<form className="form-horizontal">
				<fieldset>
					<legend>Подтверждение регистрации</legend>
					{this.props.hash}
				</fieldset>
			</form>
		);
	}
}