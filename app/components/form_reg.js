import React from 'react'
import LoadingAnimation from 'react-loading-animation'

import Alert from './alert'
import isEmail from '../libs/email_validator'

import * as actionsFormReg from '../actions/actions_form_reg'
import storeFormReg from '../stores/store_form_reg'

export default class FromReg extends React.Component {
	constructor() {
		super()
		
		this.state = {
      submitState: "initial", // Available state: initial, process, finished
      submitStatus: null, // Available status: success, error
      email: { value: '', isValid: true, errorMsg: '' },
		  nickname: { value: '', isValid: true, errorMsg: '' }
		}
		
		this.handleEmailChange = this.handleEmailChange.bind(this)
		this.handleNicknameChange = this.handleNicknameChange.bind(this)
		
		this.handleFormSubmit = this.handleFormSubmit.bind(this)
		
		this.handleSubmitFail = this.handleSubmitFail.bind(this)
		this.handleSubmitProcess = this.handleSubmitProcess.bind(this)
		this.handleSubmitSuccess = this.handleSubmitSuccess.bind(this)
	}
	
	componentWillMount() {
		storeFormReg.on("submit_fail", this.handleSubmitFail)
		storeFormReg.on("submit_process", this.handleSubmitProcess)
		storeFormReg.on("submit_success", this.handleSubmitSuccess)
	}
	
	componentWillUnmount() {
		storeFormReg.removeListener("submit_fail", this.handleSubmitFail)
		storeFormReg.removeListener("submit_process", this.handleSubmitProcess)
		storeFormReg.removeListener("submit_success", this.handleSubmitSuccess)
	}
	
	handleEmailChange(event) {
		this.setState({ email: { value: event.target.value, isValid: true, errorMsg: '' }})
	}
	
	handleNicknameChange(event) {
	  this.setState({ nickname: { value: event.target.value, isValid: true, errorMsg: '' }})
	}
	
	handleFormSubmit(event) {
		event.preventDefault()
		
		this.validateForm().then(function() {
      this.setState({
        email: {value: this.state.email.value, isValid: true},
        nickname: {value: this.state.nickname.value, isValid: true}
      })
      
      actionsFormReg.submitForm({ email: this.state.email.value, nickname: this.state.nickname.value })
		}) 
	}
	
	handleSubmitFail() {
		this.setState({submitStatus: "initial"})
		this.setState({hasError: true})
	}
	
	handleSubmitProcess() {
		this.setState({submitStatus: "process"})
		this.setState({submitInProcess: true})
	}
	
	handleSubmitSuccess() {
		this.setState({submitStatus: "completed"})
		this.setState({hasError: false})
	}

	validateForm() {
	  var hasError = false
	  
    if(!isEmail(this.state.email.value)) {
      this.setState({
        email: { value: this.state.email.value, isValid: false, errorMsg: "Значение не похоже на E-mail" }
      })
      hasError = true
    }  
    
    if(this.state.nickname.value === '') {
      this.setState({
        nickname: { value: this.state.nickname.value, isValid: false, errorMsg: "Заполните пожалуйста Nickname" }
      })
      hasError = true
    }    
	  
    if(hasError) return new Promise(function(resolve, reject) { reject() })
    
    return new Promise(function(resolve, reject) { resolve() })
  }
	
	render() {
    switch(this.state.submitState) {
      case "initial": {
        return(
          <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
            <fieldset>
              <legend>Регистрация</legend>
              
              <div className={this.state.email.isValid?"form-group":"form-group has-error"}>
                <label htmlFor="inputEmail" className="col-md-2 control-label">E-mail</label>
                <div className="col-md-6">
                  <input className="form-control" id="inputEmail" name="email" placeholder="Email" type="text" value={this.state.email.value} onChange={this.handleEmailChange} />
                  {this.state.email.isValid?"":<p className="text-danger">{this.state.email.errorMsg}</p>}
                </div>
              </div>

              <div className={this.state.nickname.isValid?"form-group":"form-group has-error"}>
                <label htmlFor="inputNickname" className="col-md-2 control-label">Nickname</label>
                <div className="col-md-6">
                  <input className="form-control" id="inputNickname" name="nickname" placeholder="Nickname" type="text" value={this.state.nickname.value} onChange={this.handleNicknameChange} />
                  {this.state.nickname.isValid?"":<p className="text-danger">{this.state.nickname.errorMsg}</p>}
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-4 col-md-offset-2">
                  <button type="submit" value="submit" className="btn btn-info col-md-6">Зарегистрироваться</button>
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
              <legend>Регистрация</legend>
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
                <legend>Регистрация</legend>
                <Alert type="warning" text="API сервер недоступен. Попробуйте, пожалуйста, чуть позже..." />
                <LoadingAnimation />
              </fieldset>
            </form>               
          )
        } else if(this.state.submitStatus == "success") {
          return (
            <form className="form-horizontal">
              <fieldset>
                <legend>Регистрация</legend>
                <Alert type="success" text="На указанный вами e-mail отправлено письмо для завершения регистрации. Спасибо." />
                <LoadingAnimation />
              </fieldset>
            </form>               
          )
        }
        break
      }      
    }
	}
}