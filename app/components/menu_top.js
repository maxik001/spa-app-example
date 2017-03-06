import React from 'react'
import {Link} from 'react-router'

import * as actionsApp from '../actions/actions_app'
import * as actionsMenuTop from '../actions/actions_menu_top'
import MenuBarSystem from '../components/menu_bar_system'
import storeApp from '../stores/store_app'
import storeMenuTop from '../stores/store_menu_top'

export default class menuTop extends React.Component {
  constructor() {
    super()
    
    this.state = {
      appBootstrapInProcess: true,
      accountAuthorized: false
    }
    
    this.handleAppBootstrapCompleted = this.handleAppBootstrapCompleted.bind(this)
    this.handleAppStateChange = this.handleAppStateChange.bind(this)
  }
  
  componentWillMount() {
    storeApp.on('app_bootstrap_completed', this.handleAppBootstrapCompleted)
    storeApp.on('app_state_change', this.handleAppStateChange)
  }
  
  comounentWillUnmount() {
    storeApp.removeListener('app_bootstrap_completed', this.handleAppBootstrapCompleted)
    storeApp.removeListener('app_state_change', this.handleAppStateChange)
  }

  handleAppBootstrapCompleted(appState) {
    this.setState({appBootstrapInProcess: false})

    if(appState.accountAuthorized) {
      this.setState({accountAuthorized: true})
    } else {
      this.setState({accountAuthorized: false})
    }
  }
  
  handleAppStateChange(appState) {
    if(appState.accountAuthorized) {
      this.setState({accountAuthorized: true})
    } else {
      this.setState({accountAuthorized: false})
    }    
  }
  
  
  render() {
    if(!this.state.appBootstrapInProcess) {
      var systemBar = this.state.accountAuthorized?<MenuBarSystem menuType="authorized" />:<MenuBarSystem menuType="anonymous" />
    } else {
      var systemBar = <MenuBarSystem menuType="" />  
    }

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to='/'><span className="glyphicon glyphicon-home" aria-hidden="true"></span>&nbsp;&nbsp;&nbsp;SPA App Example</Link>
          </div>

          {systemBar}
          
        </div>
      </nav>      
    )
  }
}
