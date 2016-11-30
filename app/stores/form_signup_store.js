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
			case "FORM_SIGNUP_VALID_HASH": {
				this.emit("hash_valid");
				break;
			}
			case "FORM_SIGNUP_INVALID_HASH": {
				this.emit("hash_invalid");
				break;
			}
		}
	}
}

const formSignupStore = new FormSignupStore;

Dispatcher.register(formSignupStore.handleActions.bind(formSignupStore));

export default formSignupStore;