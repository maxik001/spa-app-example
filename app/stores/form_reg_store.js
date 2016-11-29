import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

class FormRegStore extends EventEmitter {
	constructor() {
		super()
	}
	
	/*
	 * Action Switcher
	 */
	handleActions(action) {
		switch(action.type) {
			case "FORM_REG_SUBMIT_SUCCESS": {
				this.emit("submit_success");
				break;
			}
			case "FORM_REG_SUBMIT_FAIL": {
				this.emit("submit_fail");
				break;
			}
			case "FORM_REG_PROCESS": {
				this.emit("submit_process");
				break;
			}
		}
	}
}

const formRegStore = new FormRegStore;

Dispatcher.register(formRegStore.handleActions.bind(formRegStore));

export default formRegStore;
