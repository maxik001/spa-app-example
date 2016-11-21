import React from 'react';

export default class FromLogin extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<div className="row">
				<div className="col-md-4">
				</div>
				<div className="col-md-4">
					<form className="form-horizontal">
						<h4>Вход</h4>
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
							<div className="col-md-offset-4 col-md-8">
								<button type="button" className="btn btn-success col-md-12">Вход</button>
							</div>
						</div>
					</form>
				</div>
				<div className="col-md-4">
				</div>
			</div>
		);
	}
}