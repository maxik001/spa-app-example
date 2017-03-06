import { EventEmitter } from 'events'

import Dispatcher from '../libs/dispatcher'
import constsFormRecovery from '../consts/consts_form_recovery'

class storeFormRecovery extends EventEmitter {
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
        case constsFormRecovery.FORM_RECOVERY_IN_PROCESS: {
          this.state.pending = false
          
          this.emit("submit_in_process")
          break
        }
        case constsFormRecovery.FORM_RECOVERY_SUBMIT_FAIL: {
          this.state.pending = false
          
          this.emit("submit_fail")
          break
        }
        case constsFormRecovery.FORM_RECOVERY_SUBMIT_SUCCESS: {
          this.state.pending = false
          
          this.emit("submit_success")
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
export default new storeFormRecovery()
