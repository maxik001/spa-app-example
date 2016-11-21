import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './pages/layout';
import Login from './pages/login';
import NotFound from './pages/not_found';
import Reg from './pages/reg';

const routes = {
	path: "/",
	component: Layout,
	childRoutes: [
        { path: "login", component: Login },
        { path: "reg", component: Reg },
        { path: "*", component: NotFound }
    ]
}

const app = document.getElementById('app');
ReactDOM.render( 
	<Router history={browserHistory} routes={routes} />
, app
);