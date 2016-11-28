import Axios from 'axios';
import Dispatcher from '../dispatcher';

import api_config from '../config/api_config.json';

export function submitForm(email) {
	const validEmail = "test@test.ru";

	const apiBaseURL = api_config.server.protocol+"://"+api_config.server.ip+":"+api_config.server.port;
	
	var postPayload = {data: {email:email}};
	
	const apiServerConfig = {
		method: 'post',
		baseURL: apiBaseURL,
		url: '/hash/',
		data: postPayload,
		withCredentials: false
	};
	
	Axios(apiServerConfig)
	.then(function (response) {
		console.log("response", response);
		console.log("response data ", JSON.stringify(response.data));
	})
	.catch(function (error) {
		console.log("error", error);
	});
	
	if(email === validEmail) {
		Dispatcher.dispatch({
			type: "SUBMIT_REG_FORM_OK"
		});
	} else {
		Dispatcher.dispatch({
			type: "SUBMIT_REG_FORM_FAIL"
		});
	}
	
}