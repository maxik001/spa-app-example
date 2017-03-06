import { EventEmitter } from 'events'

import Dispatcher from '../libs/dispatcher'

class storeFormLogin extends EventEmitter {
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
        case "FORM_LOGIN_SUBMIT_FAIL": {
          this.state.pending = false
          
          this.emit("submit_fail", action.reason)
          break
        }
        case "FORM_LOGIN_PROCESS": {
          this.state.pending = false
          
          this.emit("submit_process")
          break
        }
        default: {
          console.log(this.constructor.name, 'says: no such action')
        }
      }
    })

    console.log(this.constructor.name, this.id)
  }
}

export default new storeFormLogin()
