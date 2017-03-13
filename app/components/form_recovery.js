import React from 'react'
import LoadingAnimation from 'react-loading-animation'

import Alert from './alert'
import isEmail from '../libs/email_validator'

import * as actionsFormRecovery from '../actions/actions_form_recovery'
import storeFormRecovery from '../stores/store_form_recovery'

export default class formRecovery extends React.Component {
  constructor() {
    super()
  
    this.state = {
      hasError: false,
      errorMsg: '',
      submitState: "initial", // Available state: initial, process, finished
      submitStatus: null, // Available status: success, error
      email: {value: "", isValid: true, errorMsg: ""}
    }
    
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    
    this.handleSubmitFail = this.handleSubmitFail.bind(this) 
    this.handleSubmitProcess = this.handleSubmitProcess.bind(this)
    this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this)

  }

  componentWillMount() {
    storeFormRecovery.on('submit_fail', this.handleSubmitFail)
    storeFormRecovery.on('submit_in_process', this.handleSubmitProcess)
    storeFormRecovery.on('submit_success', this.handleSubmitSuccess)
  }
  
  componentWillUnmount() {
    storeFormRecovery.removeListener("submit_fail", this.handleSubmitFail);
    storeFormRecovery.removeListener("submit_in_process", this.handleSubmitProcess);
    storeFormRecovery.removeListener("submit_success", this.handleSubmitSuccess);
  }
  
  handleEmailChange(event) {
    this.setState({email: {value: event.target.value, isValid: true, errorMsg: ""}})
  } 
  
  handleFormSubmit(event) {
    event.preventDefault()

    if(this.state.email.value === "") {
      this.setState({email: {value: this.state.email.value, isValid: false, errorMsg: "Заполните пожалуйста email"}});
    }    
    
    if(this.state.email.value !== "" && this.validateEmail(this.state.email.value)) {
      this.setState({email: {value: this.state.email.value, isValid: true}})

      actionsFormRecovery.submitForm({
        email: this.state.email.value
      })
    } else {
      this.setState({email: {value: this.state.email.value, isValid: false, errorMsg: "Значение не похоже на email"}});
    }
  }
  
  
  handleSubmitFail() {
    this.setState({submitState: "finished", submitStatus: "error"});
  }
  
  handleSubmitProcess() {
    this.setState({submitState: "process"});
  }
  
  handleSubmitSuccess() {
    this.setState({submitState: "finished", submitStatus: "success"});
  }

  validateEmail(email) {
    return isEmail(email)
  }
  
  render() {
    switch(this.state.submitState) {
      case "initial": {    
        return(
          <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
            <fieldset>
              <legend>Восстановление пароля</legend>
              
              <div className={this.state.email.isValid?"form-group":"form-group has-error"}>
                <label htmlFor="inputEmail" className="col-md-2 control-label">E-mail</label>
                <div className="col-md-6">
                  <input className="form-control" id="inputEmail" name="email" placeholder="Email" type="text" value={this.state.email.value} onChange={this.handleEmailChange} />
                  {this.state.email.isValid?"":<p className="text-danger">{this.state.email.errorMsg}</p>}
                </div>
              </div>
            
              <div className="form-group">
                <div className="col-md-4 col-md-offset-2">
                  <button type="submit" value="submit" className="btn btn-info col-md-6">Восстановить</button>
                </div>
              </div>
              
            </fieldset>
          </form>
        )
      }
      case "process": {
        return (
          <form className="form-horizontal">
            <fieldset>
              <legend>Восстановление пароля</legend>
              <Alert type="warning" text="Ваш запрос обрабатывается. Подождите пожалуйста..." />
              <LoadingAnimation />
            </fieldset>
          </form>         
        )       
        break
      }      
      case "finished": {
        if(this.state.submitStatus == "error") {
          return (
            <form className="form-horizontal">
              <fieldset>
                <legend>Восстановление пароля</legend>
                <Alert type="warning" text="API сервер недоступен. Попробуйте чуть позже..." />
              </fieldset>
            </form>                  
          )
        } else if(this.state.submitStatus == "success") {
          return (
            <form className="form-horizontal">
              <fieldset>
                <legend>Восстановление пароля</legend>
                <Alert type="success" text="На указанный вами e-mail адрес отправлено письмо для восстановления пароля." /> 
              </fieldset>
            </form>                  
          )
        }
        break
      }      
    }
  }
}