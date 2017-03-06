import Axios from 'axios'
import md5 from 'md5' 
import { browserHistory } from 'react-router';

import Dispatcher from '../libs/dispatcher';

import configAPI from '../config/config_api.json';

export function submitForm(data) {
  const apiBaseURL = configAPI.server.protocol+"://"+configAPI.server.ip+":"+configAPI.server.port
  
  var postPayload = {email: data.email, password: md5(data.password)} 
  
  const apiServerConfig = {
    method: 'post',
    baseURL: apiBaseURL,
    url: '/account/auth/',
    data: postPayload,
    withCredentials: false
  }

  Dispatcher.dispatch({type: "FORM_LOGIN_PROCESS"})
  
  Axios(apiServerConfig)
  .then(function (response) {
    switch(response.status) {
      case 200: {
        if(response.data.success === true) {
          localStorage.setItem('jwt', response.data.jwt)
          Dispatcher.dispatch({type: "APP_ACCOUNT_LOGIN", payload: response.data.jwt})
          browserHistory.push('/')
        } else {
          Dispatcher.dispatch({type: "FORM_LOGIN_SUBMIT_FAIL", reason: 'Реквизиты указаны не верно!'})
        }
        break
      }
      case 500:
      case 503:
      case 422:
      {
        Dispatcher.dispatch({type: "FORM_LOGIN_SUBMIT_FAIL", reason: 'Ошибка при работе с сервером!'})
        break
      }
    }
  })
  .catch(function (error) {
    Dispatcher.dispatch({type: "FORM_LOGIN_SUBMIT_FAIL", reason: 'Неизвестная ошибка!'})
  })
    
}
