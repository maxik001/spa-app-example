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
		console.log("Submit Fail");
		this.emit("submit_fail");
	}

	submitRegFormOk() {
		console.log("Submit Ok");
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
				this.submitRegFormFail(action.email);
				break;
			}
			
		}
	}
}

const formRegStore = new FormRegStore;

Dispatcher.register(formRegStore.handleActions.bind(formRegStore));

export default formRegStore;
