import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Home from './pages/home';
import LayoutGlobal from './pages/layout_global';
import LayoutMain from './pages/layout_main';
import LayoutSystem from './pages/layout_system';
import Login from './pages/login';
import NotFound from './pages/not_found';
import Reg from './pages/reg';


const routes = {
	path: "/",
	component: LayoutGlobal,
	childRoutes: [
        { path: "login", component: Login },
        { path: "reg", component: Reg },
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