import Dispatcher from '../dispatcher';

import api_config from '../config/api_config.json';

export function submitForm(email) {
	const validEmail = "test@test.ru";
	
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