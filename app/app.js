import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './pages/layout';
import Login from './pages/login';
import Reg from './pages/reg';

const app = document.getElementById('app');
ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={Layout}>
			<Route path="login" component={Login} />
			<Route path="reg" component={Reg} /> 
		</Route>
	</Router>
, app
);