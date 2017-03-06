import Dispatcher from '../libs/dispatcher'

export function logout() {
  localStorage.removeItem('jwt')

  Dispatcher.dispatch({type: "APP_ACCOUNT_LOGOUT"})
}