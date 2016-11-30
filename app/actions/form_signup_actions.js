import Axios from 'axios';
import Dispatcher from '../dispatcher';

import api_config from '../config/api_config.json';

export function validateHash(hash) {
	const apiBaseURL = api_config.server.protocol+"://"+api_config.server.ip+":"+api_config.server.port;

	const apiServerConfig = {
		method: 'get',
		baseURL: apiBaseURL,
		url: '/hash/'+hash,
		withCredentials: false
	};
	
	Dispatcher.dispatch({type: "FORM_SIGNUP_PROCESS"});
	
	Axios(apiServerConfig)
	.then(function (response) {
		switch(response.status) {
			case 200: { Dispatcher.dispatch({type: "FORM_SIGNUP_VALID_HASH"}); break; }
			case 404: { Dispatcher.dispatch({type: "FORM_SIGNUP_INVALID_HASH"}); break; }
		}
	})
	.catch(function (error) {
		Dispatcher.dispatch({type: "FORM_SIGNUP_INVALID_HASH"});
	});
	
}