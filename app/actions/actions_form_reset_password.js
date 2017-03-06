// System libs
import Axios from 'axios'
import Dispatcher from '../libs/dispatcher'

// Configs
import configAPI from '../config/config_api.json'

// Constants
import constsFormResetPassword from '../consts/consts_form_reset_password'

export function setPassword(data) {
  console.log(data)
  
  Dispatcher.dispatch({type: constsFormResetPassword.FORM_RESET_PASSWORD_SUBMIT_IN_PROCESS})
}

export function validateHash(hash) {
  
  const apiBaseURL = configAPI.server.protocol+"://"+configAPI.server.ip+":"+configAPI.server.port
  
  const apiServerConfig = {
    method: 'get',
    baseURL: apiBaseURL,
    url: '/recovery/'+hash,
    //headers: {'x-access-token': token},
    withCredentials: false,
    validateStatus: function (status) {
      return (status >= 200 && status <= 300) || status == 404 // Non default. Need to catch 404 status. 
    }
  }
  
  Axios(apiServerConfig)
  .then(function (response) {
    console.log('response', response)
    switch(response.status) {
      case 200: {
        Dispatcher.dispatch({type: constsFormResetPassword.FORM_RESET_PASSWORD_HASH_VALID})
        break
      }
      case 404: {
        Dispatcher.dispatch({type: constsFormResetPassword.FORM_RESET_PASSWORD_HASH_NOT_FOUND})
        break
      }
      case 500: {
        Dispatcher.dispatch({type: constsFormResetPassword.FORM_RESET_PASSWORD_API_NOT_AVAILABLE})
        break
      }
    }
  })
  .catch(function (error) {
    Dispatcher.dispatch({type: constsFormResetPassword.FORM_RESET_PASSWORD_API_NOT_AVAILABLE})
  })
}
