// System libs
import Axios from 'axios'
import Dispatcher from '../libs/dispatcher'

// Configs
import configAPI from '../config/config_api.json'

// Constants
import constsFormRecoveryLastPhase from '../consts/consts_form_recovery_last_phase'

export function validateHash(hash) {
  
  const apiBaseURL = configAPI.server.protocol+"://"+configAPI.server.ip+":"+configAPI.server.port
  
  const apiServerConfig = {
    method: 'get',
    baseURL: apiBaseURL,
    url: '/recovery/'+hash,
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
        Dispatcher.dispatch({type: constsFormRecoveryLastPhase.FORM_RECOVERY_LAST_PHASE_HASH_VALID})
        break
      }
      case 404: {
        Dispatcher.dispatch({type: constsFormRecoveryLastPhase.FORM_RECOVERY_LAST_PHASE_HASH_INVALID})
        break
      }
      case 500: {
        Dispatcher.dispatch({type: constsFormRecoveryLastPhase.FORM_RECOVERY_LAST_PHASE_API_UNAVAILABLE})
        break
      }
    }
  })
  .catch(function (error) {
    Dispatcher.dispatch({type: constsFormRecoveryLastPhase.FORM_RECOVERY_LAST_PHASE_API_UNAVAILABLE})
  })
}
