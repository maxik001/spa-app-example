import Axios from 'axios'
import { browserHistory } from 'react-router';

import Dispatcher from '../libs/dispatcher';
import constsFormRecovery from '../consts/consts_form_recovery'

import configAPI from '../config/config_api.json';

export function submitForm(data) {
  const apiBaseURL = configAPI.server.protocol+"://"+configAPI.server.ip+":"+configAPI.server.port
  
  var postPayload = {email: data.email} 
  
  const apiServerConfig = {
    method: 'post',
    baseURL: apiBaseURL,
    url: '/recovery',
    data: postPayload,
    withCredentials: false
  }

  Dispatcher.dispatch({type: constsFormRecovery.FORM_RECOVERY_IN_PROCESS})
  
  Axios(apiServerConfig)
  .then(function (response) {
    switch(response.status) {
      case 200: {
        Dispatcher.dispatch({type: constsFormRecovery.FORM_RECOVERY_SUBMIT_SUCCESS})
        break
      }
      case 422:
      case 500:
      case 503:
      {
        Dispatcher.dispatch({type: constsFormRecovery.FORM_RECOVERY_SUBMIT_FAIL})
        break
      }
    }
  })
  .catch(function (error) {
    Dispatcher.dispatch({type: constsFormRecovery.FORM_RECOVERY_SUBMIT_FAIL, reason: 'Неизвестная ошибка!'})
  })
}