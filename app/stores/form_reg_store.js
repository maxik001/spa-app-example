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
	
	submitRegFormProcess() {
		this.emit("submit_process");
	}

	/*
	 * Action Switcher
	 */
	handleActions(action) {
		switch(action.type) {
			case "SUBMIT_REG_FORM_OK": {
				this.submitRegFormOk();
				break;
			}
			case "SUBMIT_REG_FORM_FAIL": {
				this.submitRegFormFail();
				break;
			}
			case "SUBMIT_REG_FORM_PROCESS": {
				this.submitRegFormProcess();
				break;
			}
		}
	}
}

const formRegStore = new FormRegStore;

Dispatcher.register(formRegStore.handleActions.bind(formRegStore));

export default formRegStore;
