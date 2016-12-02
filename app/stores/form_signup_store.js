import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

class FormSignupStore extends EventEmitter {
	constructor() {
		super()
	}

	/*
	 * Action Switcher
	 */
	handleActions(action) {
		switch(action.type) {
			case "FORM_SIGNUP_INVALID_HASH": {
				this.emit("hash_invalid");
				break;
			}
			case "FORM_SIGNUP_LOAD_PROCESS": {
				this.emit("load_process");
				break;
			}
			case "FORM_SIGNUP_VALID_HASH": {
				this.emit("hash_valid", action.email);
				break;
			}
						
			case "FORM_SIGNUP_SUBMIT_FAIL": {
				this.emit("submit_fail");
				break;
			}
			case "FORM_SIGNUP_SUBMIT_PROCESS": {
				this.emit("submit_process");
				break;
			}
			case "FORM_SIGNUP_SUBMIT_SUCCESS": {
				this.emit("submit_success");
				break;
			}

		}
	}
}

const formSignupStore = new FormSignupStore;

Dispatcher.register(formSignupStore.handleActions.bind(formSignupStore));

export default formSignupStore;