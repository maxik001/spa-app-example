import { EventEmitter } from 'events'

import Dispatcher from '../libs/dispatcher'

import constsApp from '../consts/consts_app'

class storeApp extends EventEmitter {
  constructor() {
    super()

    this.state = {
      accountAuthorized: false,
      apiAvailable: false,
      firstLoad: true,
      jwt: null,
      pending: true
    }
    
    /*
     * Action Switcher
     */
    this.id = Dispatcher.register((action) => {
      switch(action.type) {
        case constsApp.APP_ACCOUNT_LOGIN: {
          this.state.pending = false
          
          this.state.accountAuthorized = true
          this.state.jwt = action.payload
          this.emit("app_state_change", this.state)
          break
        }
        case constsApp.APP_ACCOUNT_LOGOUT: {
          this.state.pending = false
          
          this.state.accountAuthorized = false
          this.state.jwt = null
          this.emit("app_state_change", this.state)
          break
        }
        case constsApp.APP_BOOTSTRAP_FAIL_API: {
          this.state.pending = false
          
          this.state.apiAvailable = false
          this.state.firstLoad = false
          this.emit("app_bootstrap_fail_api", this.state)
          break
        }
        case constsApp.APP_BOOTSTRAP_FAIL_BROWSER: {
          this.state.pending = false
          this.state.firstLoad = false
          this.emit("app_bootstrap_fail_browser", this.state)
          break
        }
        case constsApp.APP_BOOTSTRAP_COMPLETED: {
          console.log(constsApp.APP_BOOTSTRAP_COMPLETED)
          
          this.state.pending = false
          
          this.state.apiAvailable = true
          this.state.firstLoad = false
          
          if(action.payload) {
            this.state.jwt = action.payload
            this.state.accountAuthorized = true
          }
          this.emit("app_bootstrap_completed", this.state)
          break
        }
        case constsApp.APP_BOOTSTRAP_PROCESS: {
          console.log(constsApp.APP_BOOTSTRAP_PROCESS)
          this.state.pending = false
          
          this.emit("app_bootstrap_process")
          break
        }
        case constsApp.APP_PAGE_NOT_FOUND: {
          this.state.pending = false
          
          this.emit("app_page_not_found")
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

export default new storeApp()
