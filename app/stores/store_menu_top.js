import { EventEmitter } from 'events'

import Dispatcher from '../libs/dispatcher'

class storeMenuTop extends EventEmitter {
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
        case "MENU_TOP_NEED_UPDATE": {
          this.state.pending = false
          
          this.emit("need_update")
          break
        }
        case "MENU_TOP_SUCCESS": {
          this.state.pending = false
          
          this.emit("received_menu_data", action.data)
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

export default new storeMenuTop()
