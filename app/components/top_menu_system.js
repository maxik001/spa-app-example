import React from 'react';
import { Link } from 'react-router';

export default class TopMenu extends React.Component {
	constructor() {
		super();
	}
	
	render() {
		return (
			<div className="row">
				<ul className="nav nav-pills pull-left">
					<li role="presentation"><Link to="/">AMHub</Link></li>
				</ul>
				<ul className="nav nav-pills pull-right">
					<li role="presentation"><Link to="login">Войти</Link></li>
					<li role="presentation"><Link to="reg">Зарегистрироваться</Link></li>
				</ul>
			</div>
		);
	}
}