// System
import keyMirror from 'keymirror'
import React from 'react'
import LoadingAnimation from 'react-loading-animation'

//Pages
import Alert from './alert'
import PageNotFound from '../components/page_not_found'

// Actions and Store
import * as actionsFormRecoveryLastPhase from '../actions/actions_form_recovery_last_phase'
import storeFormRecoveryLastPhase from '../stores/store_form_recovery_last_phase'

export default class formRecoveryLastPhase extends React.Component {
  constructor() {
    super()
    
    this.availableState = keyMirror({
      "API_UNAVAILABLE": null,
      "HASH_CHECK_FAIL": null,
      "HASH_CHECK_PROCESS": null,
      "HASH_CHECK_SUCCESS": null
    })
    
    this.state = {
      current: this.availableState.HASH_CHECK_PROCESS
    }
    
    this.handleAPIUnavailable = this.handleAPIUnavailable.bind(this)
    this.handleHashInvalid = this.handleHashInvalid.bind(this)
    this.handleHashValid = this.handleHashValid.bind(this)
  }
  
  componentWillMount() {
    storeFormRecoveryLastPhase.on('api_unavailable', this.handleAPIUnavailable)
    storeFormRecoveryLastPhase.on('hash_invalid', this.handleHashInvalid)
    storeFormRecoveryLastPhase.on('hash_valid', this.handleHashValid)
    
    actionsFormRecoveryLastPhase.validateHash(this.props.params.hash)
  }
  
  componentWillUnmount() {
    storeFormRecoveryLastPhase.removeListener('api_unavailable', this.handleAPIUnavailable)
    storeFormRecoveryLastPhase.removeListener('hash_invalid', this.handleHashInvalid)
    storeFormRecoveryLastPhase.removeListener('hash_valid', this.handleHashValid)
  }
  
  handleAPIUnavailable() {
    this.setState({current: this.availableState.API_UNAVAILABLE})
  }
  
  handleHashInvalid() {
    this.setState({current: this.availableState.HASH_CHECK_FAIL})
  }
  
  handleHashValid() {
    this.setState({current: this.availableState.HASH_CHECK_SUCCESS})
  }
  
  render() {
    switch(this.state.current) {
      case this.availableState.API_UNAVAILABLE: {
        return(
          <form className="form-horizontal">
            <fieldset>
              <legend>Изменение реквизитов доступа к сайту</legend>
              <Alert type="warning" text="API сервер недоступен. Попробуйте чуть позже..." />
            </fieldset>
          </form>
        )
        break
      }
      case this.availableState.HASH_CHECK_FAIL: {
        return (
          <PageNotFound />
        )        
        break
      }
      case this.availableState.HASH_CHECK_PROCESS: {
        return(
          <LoadingAnimation />
        )
        /*
        return(
          <form className="form-horizontal">
            <fieldset>
              <legend>Изменение реквизитов доступа к сайту</legend>
              <Alert type="warning" text="Ваш запрос обрабатывается. Подождите пожалуйста..." />
            </fieldset>
          </form>
        )
        */
        break
      }
      case this.availableState.HASH_CHECK_SUCCESS: {
        return(
          <form className="form-horizontal">
            <fieldset>
              <legend>Изменение реквизитов доступа к сайту</legend>
              <Alert type="success" text="Пароль успешно изменен. Новый пароль отправлен на ваш email. Спасибо." />
            </fieldset>
          </form>
        )
        break
      }
    }
  }
}