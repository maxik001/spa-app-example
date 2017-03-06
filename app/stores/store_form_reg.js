import { EventEmitter } from 'events'

import Dispatcher from '../libs/dispatcher'

class storeFormReg extends EventEmitter {
  constructor() {
    super()
    
    this.state = {
      pending: true
    }

    /*
     * Action Switcher
     */
    this.id = Dispatcher.register((action) => {
      switch(action.type) {
        default: {
          console.log(this.constructor.name, 'says: no such action')
        }
      }
    })
    
    console.log(this.constructor.name, this.id)
  }
}
export default new storeFormReg()
