import Axios from 'axios';
import Dispatcher from '../dispatcher';

import api_config from '../config/api_config.json';

export function submitForm(email) {
	const apiBaseURL = api_config.server.protocol+"://"+api_config.server.ip+":"+api_config.server.port;
	
	var email = 'test@test.ru'; // Remove after test
	
	var postPayload = {data: {email:email}};
	
	const apiServerConfig = {
		method: 'post',
		baseURL: apiBaseURL,
		url: '/hash/',
		data: postPayload,
		withCredentials: false
	};

	/*
	Axios(apiServerConfig)
	.then(function (response) {
		switch(response.status) {
			case 202: {
				Dispatcher.dispatch({type: "SUBMIT_REG_FORM_OK"});
				break;
			}
			case 503:
			case 422:
			{
				Dispatcher.dispatch({type: "SUBMIT_REG_FORM_FAIL"});
				break;
			}
		}
	})
	.catch(function (error) {
		Dispatcher.dispatch({type: "SUBMIT_REG_FORM_FAIL"});
	});
	*/
	
	Dispatcher.dispatch({type: "SUBMIT_REG_FORM_PROCESS"});
	setTimeout(() => {
		Dispatcher.dispatch({type: "SUBMIT_REG_FORM_OK"})
	}, 5000);
	
}