import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

class FormRegStore extends EventEmitter {
	constructor() {
		super()
	}
	
	/**
	 * Process work with API
	 */
	submitRegForm(email) {
		console.log("Store receive email", email);
	}
	
	handleActions(action) {
		switch(action.type) {
			case "SUBMIT_REG_FORM": {
				this.submitRegForm(action.email)
			}		
		}
	}
}

const formRegStore = new FormRegStore;

Dispatcher.register(formRegStore.handleActions.bind(formRegStore));

export default formRegStore;
