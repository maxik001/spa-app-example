import Axios from 'axios';
import React from 'react';
import { browserHistory } from 'react-router';

import api_config from '../config/api_config.json';


export default class Login extends React.Component {
	constructor() {
		super()
		
		this.api_test = this.api_test.bind(this);
		this.handleRedirect = this.handleRedirect.bind(this);		
	}

	api_test() {
		var body = {data: {email:'test@test.ru'}};
		
		const api_server_config = {
			method: 'post',
			baseURL: api_config.server.protocol+"://"+api_config.server.ip+":"+api_config.server.port,
			url: '/hash/',
			data: body,
			withCredentials: false
		};
		
		Axios(api_server_config)
		.then(function (response) {
			console.log("response", response);
			console.log("response data ", JSON.stringify(response.data));
		})
		.catch(function (error) {
			console.log("error", error);
		});
	}
	
	handleRedirect() {
		console.log("Handle Redirect");
		browserHistory.push('/')
	}
	
	render() {
		this.api_test();
		
		return (
			<div className="row">
				<div className="col-md-12">
					Test page. See console log.
				</div>
				<div className="col-md-12">
					<button onClick={this.handleRedirect}>Redirect to main page</button>
				</div>
			</div>
		);
	}
}