import React from 'react'
import {Link} from 'react-router'

import * as actionsApp from '../actions/actions_app'

export default class menuBarSystem extends React.Component {
  constructor() {
    super()
    
    this.handleLogout = this.handleLogout.bind(this)

  }

  handleLogout(event) {
    event.preventDefault()
    
    console.log('logout')
    actionsApp.logout()
  }
  
  render() {
    switch(this.props.menuType) {
      case "anonymous": {
        return (
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className='nav navbar-nav navbar-right'>
              <li><Link to="/reg">Регистрация</Link></li>
              <li><Link to="/login">Вход</Link></li> 
            </ul>
          </div>
        )
      }
      case "authorized": {
        return (
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className='nav navbar-nav navbar-right'>
              <li><a href="/logout" onClick={this.handleLogout}>Выход</a></li>
            </ul>
          </div>
        )        
      }
      default: {
        return(
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          </div>        
        )
      }
      
    }
    
  }
}