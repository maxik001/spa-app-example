import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// Components
import formLogin from './components/form_login';
import formRecovery from './components/form_recovery';
import formReg from './components/form_reg';
import formSignup from './components/form_signup';

// Layouts
import Home from './pages/home';
import LayoutGlobal from './pages/layout_global';
import LayoutMain from './pages/layout_main';
import LayoutSystem from './pages/layout_system';
import NotFound from './pages/not_found';
import Test from './pages/test';

const routes = {
	path: "/",
	component: LayoutGlobal,
	indexRoute: { component: Home },
	childRoutes: [
        { 
        	component: LayoutSystem,
        	childRoutes: [
        	    { path: "test", component: Test }
        	]
        },
        {
        	path: "/system",
        	component: LayoutSystem,
        	childRoutes: [
    	        { path: "login", component: formLogin },
    	        { path: "recovery", component: formRecovery },
        	    { path: "reg", component: formReg },
        	    { path: "signup/:hash", component: formSignup }
        	]
        },
        { path: "*", component: NotFound }
    ]
}


/*
const routes = {
	path: "/",
	component: LayoutGlobal
}
*/

const app = document.getElementById('app');
ReactDOM.render( 
	<Router history={browserHistory} routes={routes} />
, app
);