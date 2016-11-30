import Dispatcher from '../dispatcher';

export function onEnter(hash) {
	const validHash = '123456';
	
	if(hash === validHash) {
		Dispatcher.dispatch({type: "FORM_SIGNUP_VALID_HASH"});
	} else {
		Dispatcher.dispatch({type: "FORM_SIGNUP_INVALID_HASH"});
	}
}