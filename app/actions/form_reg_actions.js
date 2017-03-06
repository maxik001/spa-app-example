import Axios from 'axios';
import Dispatcher from '../dispatcher';

import api_config from '../config/config_api.json';

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

	Dispatcher.dispatch({type: "FORM_REG_PROCESS"});
	
	Axios(apiServerConfig)
	.then(function (response) {
		switch(response.status) {
			case 202: {
				Dispatcher.dispatch({type: "FORM_REG_SUBMIT_SUCCESS"});
				break;
			}
			case 503:
			case 422:
			{
				Dispatcher.dispatch({type: "FORM_REG_SUBMIT_FAIL"});
				break;
			}
		}
	})
	.catch(function (error) {
		Dispatcher.dispatch({type: "FORM_REG_SUBMIT_FAIL"});
	});
}