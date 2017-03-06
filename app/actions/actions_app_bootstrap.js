import Axios from 'axios'

import Dispatcher from '../libs/dispatcher'
import isLocalStorageExists from '../libs/check_localstorage'

import configAPI from '../config/config_api.json'

export function bootstrap() {
  Dispatcher.dispatch({type: "APP_BOOTSTRAP_PROCESS"})
  
  // Check localStorage exists
  if(!isLocalStorageExists) {
    console.log('localStorage not found in the browser')
    Dispatcher.dispatch({type: "APP_BOOTSTRAP_FAIL"})
    
    return
  }
  
  var token = localStorage.getItem('jwt')?localStorage.getItem('jwt'):'';
  
  const apiBaseURL = configAPI.server.protocol+"://"+configAPI.server.ip+":"+configAPI.server.port
  
  const apiServerConfig = {
    method: 'get',
    baseURL: apiBaseURL,
    url: '/jwt/check/',
    headers: {'x-access-token': token},
    withCredentials: false,
    validateStatus: function (status) {
      return (status >= 200 && status <= 300) || status == 401 // Non default. Need to catch 401 status. 
    }
  }
  
  Axios(apiServerConfig)
  .then(function (response) {
    console.log('response', response)
    switch(response.status) {
      case 200: {
        console.log('case 200')
        Dispatcher.dispatch({type: "APP_BOOTSTRAP_COMPLETED", payload: localStorage.getItem('jwt')})
        break
      }
      case 401: {
        localStorage.removeItem('jwt')
        Dispatcher.dispatch({type: "APP_BOOTSTRAP_COMPLETED", payload: null})
        break
      }
      case 500: {
        Dispatcher.dispatch({type: "APP_BOOTSTRAP_FAIL_API"})
        break
      }
    }
  })
  .catch(function (error) {
    console.log('App Bootstrap Actions Message\n', error)
    Dispatcher.dispatch({type: "APP_BOOTSTRAP_FAIL_API"})
  })
}