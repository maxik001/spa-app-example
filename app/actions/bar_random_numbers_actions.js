import Axios from 'axios';
import Dispatcher from '../dispatcher';

import api_config from '../config/api_config.json';

export function getData() {
	const apiBaseURL = api_config.server.protocol+"://"+api_config.server.ip+":"+api_config.server.port;
	
	const apiServerConfig = {
		method: 'get',
		baseURL: apiBaseURL,
		url: '/random/6',
		withCredentials: false
	};

	Axios(apiServerConfig)
	.then(function (response) {
		switch(response.status) {
			case 200: {
				Dispatcher.dispatch({type: "BRN_NEED_UPDATE", data: response.data.data.values });
				break;
			}
			case 503:
			case 422:
			{
				Dispatcher.dispatch({type: "BRN_UPDATE_FAIL"});
				break;
			}
		}
	})
	.catch(function (error) {
		Dispatcher.dispatch({type: "BRN_UPDATE_FAIL"});
	});
}