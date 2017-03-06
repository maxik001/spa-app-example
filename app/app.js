import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

// Components
import formLogin from './components/form_login'
import formRecovery from './components/form_recovery'
import formRecoveryLastPhase from './components/form_recovery_last_phase'
import helloWorld from './components/hello_world'
import pageNotFound from './components/page_not_found'

// Layouts
import layoutGlobal from './pages/layout_global'

const routes = {
  path: "/",
	component: layoutGlobal,
	indexRoute: { component: helloWorld },
	childRoutes: [
    { path: "login", component: formLogin },
    { path: "recovery", component: formRecovery },
    { path: 'recovery/:hash', component: formRecoveryLastPhase },
    { path: "*", component: pageNotFound }
  ]
}

const app = document.getElementById('react-root')
ReactDOM.render( 
	<Router history={browserHistory} routes={routes} />
	,app
)