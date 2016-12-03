import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

class BarRandomNumbersStore extends EventEmitter {
	constructor() {
		super()
	}
	
	/*
	 * Action Switcher
	 */
	handleActions(action) {
		switch(action.type) {
			case "BRN_NEED_UPDATE": {
				this.emit("need_update", action.data);
				break;
			}
		}
	}
}

const barRandomNumbersStore = new BarRandomNumbersStore;

Dispatcher.register(barRandomNumbersStore.handleActions.bind(barRandomNumbersStore));

export default barRandomNumbersStore;
