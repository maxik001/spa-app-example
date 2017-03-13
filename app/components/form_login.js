import React from 'react'
import {Link} from 'react-router'
import LoadingAnimation from 'react-loading-animation'

import Alert from './alert'
import isEmail from '../libs/email_validator'

import * as actionsFormLogin from '../actions/actions_form_login'
import storeFormLogin from '../stores/store_form_login'

import Dispatcher from '../libs/dispatcher'

export default class formLogin extends React.Component {
  constructor(){
    super()
    
    this.state = {
      hasError: false,
      errorMsg: '',
      submitState: "initial", // Available status: initial, process
      email: {value: "", isValid: true, errorMsg: ""},
      password: {value: "", isValid: true, errorMsg: ""}
    }
    
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    
    this.handleSubmitFail = this.handleSubmitFail.bind(this)
    this.handleSubmitProcess = this.handleSubmitProcess.bind(this)
  }

  componentWillMount() {
    storeFormLogin.on('submit_fail', this.handleSubmitFail)
    storeFormLogin.on('submit_process', this.handleSubmitProcess)
  }
  
  componentWillUnmount() {
    storeFormLogin.removeListener("submit_fail", this.handleSubmitFail);
    storeFormLogin.removeListener("submit_process", this.handleSubmitProcess);
  }
  
  handleEmailChange(event) {
    this.setState({email: {value: event.target.value, isValid: true, errorMsg: ""}})
  } 
  
  handleFormSubmit(event) {
    event.preventDefault()

    if(this.state.email.value === "") {
      this.setState({email: {value: this.state.email.value, isValid: false, errorMsg: "Заполните пожалуйста email"}});
    }    
    
    if(this.state.password.value === "") {
      this.setState({password: {value: this.state.password.value, isValid: false, errorMsg: "Введите пароль для входа в систему"}});
    }    

    if(this.state.email.value !== "" && this.validateEmail(this.state.email.value)) {
      this.setState({email: {value: this.state.email.value, isValid: true}})
      actionsFormLogin.submitForm({
        email: this.state.email.value,
        password: this.state.password.value
      })
    } else {
      this.setState({email: {value: this.state.email.value, isValid: false, errorMsg: "Значение не похоже на email"}});
    }
  }
  
  handlePasswordChange(event) {
    this.setState({password: {value: event.target.value, isValid: true, errorMsg: ""}})
  }

  handleSubmitFail(reason) {
    this.setState({submitStatus: "initial"});
    this.setState({hasError: true, errorMsg: 'Ошибка! '+reason});
  }  
  
  handleSubmitProcess() {
    this.setState({submitStatus: "process"});
    this.setState({submitInProcess: true});
  }
  
  validateEmail(email) {
    return isEmail(email)
  }
  
  render() {
    switch(this.state.submitState) {
      case "initial": {
        const alertBox = this.state.hasError?<Alert type="danger" text={this.state.errorMsg} />:"";

        return (
            <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
            <fieldset>
              <legend>Вход</legend>
              
              {alertBox}
              
              <div className={this.state.email.isValid?"form-group":"form-group has-error"}>
                <label htmlFor="inputEmail" className="col-md-2 control-label">E-mail</label>
                <div className="col-md-6">
                  <input className="form-control" id="inputEmail" name="email" placeholder="Email" type="text" value={this.state.email.value} onChange={this.handleEmailChange} />
                  {this.state.email.isValid?"":<p className="text-danger">{this.state.email.errorMsg}</p>}
                </div>
              </div>
              
              <div className={this.state.password.isValid?"form-group":"form-group has-error"}>
                <label htmlFor="inputPassword" className="col-md-2 control-label">Пароль</label>
                <div className="col-md-6">
                  <input className="form-control" id="inputPassword" name="password" placeholder="пароль" type="password" value={this.state.password.value} onChange={this.handlePasswordChange} />
                  {this.state.password.isValid?"":<p className="text-danger">{this.state.password.errorMsg}</p>}
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-4 col-md-offset-2">
                  <button type="submit" value="submit" className="btn btn-info col-md-6">Вход</button>
                </div>
              </div>
              
              <div className="form-group">
                <div className="col-md-6 col-md-offset-2">
                  <small><Link to="/recovery">Я забыл пароль, помогите мне восстановить его!</Link></small>
                </div>
              </div>
            </fieldset>
          </form>
        )
        break
      }
      case "process": {
        return (
          <form className="form-horizontal">
            <fieldset>
              <legend>Вход</legend>
              <Alert type="warning" text="Ваш запрос обрабатывается. Подождите пожалуйста..." />
              <LoadingAnimation />
            </fieldset>
          </form>         
        )       
        break
      }
    }
  }
} 
