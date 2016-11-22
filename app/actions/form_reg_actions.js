import Dispatcher from '../dispatcher';

export function submitForm(email) {
	Dispatcher.dispatch({
		type: "SUBMIT_REG_FORM",
		email
	});
}