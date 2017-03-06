import { EventEmitter } from 'events'

import Dispatcher from '../libs/dispatcher'

//Constants
import constsFormResetPassword from '../consts/consts_form_reset_password'

class storeFormResetPassword extends EventEmitter {
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
       case constsFormResetPassword.FORM_RESET_PASSWORD_SUBMIT_IN_PROCESS: {
         this.state.pending = false
         
         this.emit("submit_in_process")
         break
       }
       case constsFormResetPassword.FORM_RESET_PASSWORD_HASH_NOT_FOUND: {
          this.state.pending = false
          
          this.emit("hash_not_found")
          break
        }
        case constsFormResetPassword.FORM_RESET_PASSWORD_HASH_VALID: {
          this.state.pending = false
           
          this.emit("hash_valid")
          break
        }
        case constsFormResetPassword.FORM_RESET_PASSWORD_API_NOT_AVAILABLE: {
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

export default new storeFormResetPassword()
