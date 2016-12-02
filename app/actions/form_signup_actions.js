import Axios from 'axios';
import Dispatcher from '../dispatcher';

import api_config from '../config/api_config.json';

export function submitForm(data) {
	console.log("submited", data);
	
	Dispatcher.dispatch({type: "FORM_SIGNUP_SUBMIT_PROCESS"});
/*	
	const apiBaseURL = api_config.server.protocol+"://"+api_config.server.ip+":"+api_config.server.port;
	
	var postPayload = {data: {email:email}};
	
	const apiServerConfig = {
		method: 'post',
		baseURL: apiBaseURL,
		url: '/hash/',
		data: postPayload,
		withCredentials: false
	};

	Dispatcher.dispatch({type: "FORM_SIGNUP_SUBMIT_PROCESS"});
	
	Axios(apiServerConfig)
	.then(function (response) {
		switch(response.status) {
			case 202: {
				Dispatcher.dispatch({type: "FORM_SIGNUP_SUBMIT_SUCCESS"});
				break;
			}
			case 503:
			case 422:
			{
				Dispatcher.dispatch({type: "FORM_SIGNUP_SUBMIT_FAIL"});
				break;
			}
		}
	})
	.catch(function (error) {
		Dispatcher.dispatch({type: "FORM_SIGNUP_SUBMIT_FAIL"});
	});
*/	
}

export function validateHash(hash) {
	const apiBaseURL = api_config.server.protocol+"://"+api_config.server.ip+":"+api_config.server.port;

	const apiServerConfig = {
		method: 'get',
		baseURL: apiBaseURL,
		url: '/hash/'+hash,
		withCredentials: false
	};
	
	Dispatcher.dispatch({type: "FORM_SIGNUP_LOAD_PROCESS"});
	
	Axios(apiServerConfig)
	.then(function (response) {
		switch(response.status) {
			case 200: { Dispatcher.dispatch({type: "FORM_SIGNUP_VALID_HASH", email: response.data.data.email }); break; }
			case 404: { Dispatcher.dispatch({type: "FORM_SIGNUP_INVALID_HASH"}); break; }
		}
	})
	.catch(function (error) {
		Dispatcher.dispatch({type: "FORM_SIGNUP_INVALID_HASH"});
	});
	
}