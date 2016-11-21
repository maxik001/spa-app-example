import React from 'react';

export default class FromReg extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<form className="form-horizontal">
				<fieldset>
					<legend>Вход</legend>
					<div className="form-group">
						<label for="email" className="col-md-2">E-mail</label>
						<div className="col-md-10">
							<input type="email" className="form-control" id="email" />
						</div>
					</div>
					<div className="form-group">
						<label for="password" className="col-md-2">Пароль</label>
						<div className="col-md-10">
							<input type="password" className="form-control" id="password" />
						</div>
					</div>
					<div className="form-group">
						<label className="col-md-offset-2 col-md-10"><input checked type="checkbox" />&nbsp;Запомнить меня</label>
					</div>
					<div className="form-group">
						<div className="col-md-offset-3 col-md-8">
							<button type="button" className="btn btn-success col-md-12">Вход</button>
						</div>
					</div>
				</fieldset>
			</form>
		);
	}
}