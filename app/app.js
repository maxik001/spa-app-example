/**
 * Filename: app.js 
 */

import React from 'react';
import ReactDOM from 'react-dom';

class Layout extends React.Component {
	render() {
		return (
			<div>
				<h2>Hello, World!</h2>
				<p>test</p>
			</div>
		);
	}
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);