import React from 'react'
import LoadingAnimation from 'react-loading-animation'

import Alert from '../components/alert'
import * as actionsAppBootstrap from '../actions/actions_app_bootstrap'
import storeApp from '../stores/store_app'

import Footer from '../components/footer'
import MenuTop from '../components/menu_top'

// Remove after test
import Dispatcher from '../libs/dispatcher';

export default class LayoutGlobal extends React.Component {
  constructor(){
    super()
    
    // appState = { failAPI | failBrowser | inProcess | completed }
    this.state = {
      bootstrapState: null
    }
    
    this.handleBootstrapCompleted = this.handleBootstrapCompleted.bind(this)
    this.handleBootstrapFailAPI = this.handleBootstrapFailAPI.bind(this)
    this.handleBootstrapFailBrowser = this.handleBootstrapFailBrowser.bind(this)
    this.handleBootstrapProcess = this.handleBootstrapProcess.bind(this)
    
    this.handlePageNotFound = this.handlePageNotFound.bind(this)
  }

  componentWillMount() {
    storeApp.on('app_bootstrap_completed', this.handleBootstrapCompleted)
    storeApp.on('app_bootstrap_fail_api', this.handleBootstrapFailAPI)
    storeApp.on('app_bootstrap_fail_browser', this.handleBootstrapFailBrowser)
    storeApp.on('app_bootstrap_process', this.handleBootstrapProcess)
    
    storeApp.on('app_page_not_found', this.handlePageNotFound)

    actionsAppBootstrap.bootstrap()
  }
  
  componentWillUnmount() {
    storeApp.removeListener('app_bootstrap_completed', this.handleBootstrapCompleted)
    storeApp.removeListener('app_bootstrap_fail_api', this.handleBootstrapFailAPI)
    storeApp.removeListener('app_bootstrap_fail_browser', this.handleBootstrapFailBrowser)
    storeApp.removeListener('app_bootstrap_process', this.handleBootstrapProcess)
    
    storeApp.removeListener('app_page_not_found', this.handlePageNotFound)
  }

  handleBootstrapCompleted(appState) {
    console.log('appState: ', appState)
    this.setState({bootstrapState: "completed"})
  }

  handleBootstrapFailAPI(appState) {
    this.setState({bootstrapState: "failAPI"})
  }

  handleBootstrapFailBrowser(appState) {
    this.setState({bootstarpState: "failBrowser"})
  }
  
  handleBootstrapProcess() {
    this.setState({bootstrapState: "inProcess"})
  }

  handlePageNotFound(appState) {
    this.setState({bootstrapState: "pageNotFound"})
  }
  
  render() {
    /*
    console.log('D.isDispatching: ', Dispatcher._isDispatching)
    console.log('D.pendingPayload: ', Dispatcher._pendingPayload)
    console.log('D.callbacks: ', Dispatcher._callbacks)
    console.log('D.isPending: ', Dispatcher._isPending)
    console.log('D.isHandled: ', Dispatcher._isHandled)  
    */
    
    var content = ''
    switch(this.state.bootstrapState) {
      case "failAPI": {
        content = <Alert type="warning" text="API сервер недоступен. Попробуйте чуть позже..." />
        break
      }
      case "failBrowser": {
        content = <Alert type="warning" text="Ваш браузер не поддерживается данным сайтом..." />
        break
      }
      case "inProcess": {
        content =  <LoadingAnimation />
        break
      }
      case "completed": {
        content = this.props.children
        break
      }
      case "pageNotFound": {
        content = <Alert type="warning" text="404 Page not found" />
        break
      }
      default: {
        content = ''
      }
    }
    
    return (
      <div className="container">
        <MenuTop />
        {content}
        <Footer />
      </div>
    )
    
  }
} 
