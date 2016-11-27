import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

class FormRegStore extends EventEmitter {
	constructor() {
		super()
	}
	
	/*
	 * 
	 */
	submitRegFormFail() {
		this.emit("submit_fail");
	}

	submitRegFormOk() {
		this.emit("submit_success");
	}
	
	/*
	 * Action Switcher
	 */
	handleActions(action) {
		switch(action.type) {
			case "SUBMIT_REG_FORM_OK": {
				this.submitRegFormOk(action.email);
				break;
			}
			case "SUBMIT_REG_FORM_FAIL": {
				this.submitRegFormFail();
				break;
			}
			
		}
	}
}

const formRegStore = new FormRegStore;

Dispatcher.register(formRegStore.handleActions.bind(formRegStore));

export default formRegStore;