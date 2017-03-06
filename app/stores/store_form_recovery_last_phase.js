import { EventEmitter } from 'events'

import Dispatcher from '../libs/dispatcher'

//Constants
import constsFormRecoveryLastPhase from '../consts/consts_form_recovery_last_phase'

class storeFormRecoveryLastPhase extends EventEmitter {
  constructor() {
    super()
    
    this.state = {
      pending: true
    }

    /*
     * Action Switcher
     */
    this.id = Dispatcher.register((action) => {
      console.log(this.constructor.name, "action.type: ", action.type)
      
     switch(action.type) {
       case constsFormRecoveryLastPhase.FORM_RECOVERY_LAST_PHASE_HASH_INVALID: {
          this.state.pending = false
          
          this.emit("hash_invalid")
          break
        }
        case constsFormRecoveryLastPhase.FORM_RECOVERY_LAST_PHASE_HASH_VALID: {
          this.state.pending = false
           
          this.emit("hash_valid")
          break
        }
        case constsFormRecoveryLastPhase.FORM_RECOVERY_LAST_PHASE_API_UNAVAILABLE: {
          this.state.pending = false

          console.log('api_not_available')
        }
        default: {
          console.log(this.constructor.name, 'says: no such action')
        }
      }
    })
    
    console.log(this.constructor.name, this.id)
  }
}

export default new storeFormRecoveryLastPhase()
