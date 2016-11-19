import React from 'react';

import Content from './content';
import Footer from './footer';

export default class Layout extends React.Component {
	constructor(){
		super();
		this.name = "Layout";
	}
	
	render() {
		return (
			<div className="container">
								
				<div className="row">
					<ul className="nav nav-pills pull-right">
						<li role="presentation"><a href="#">Войти</a></li>
						<li role="presentation"><a href="#">Зарегистрироваться</a></li>
					</ul>
				</div>

				<Content />
				<Footer />
			</div>
		);
	}
} 
