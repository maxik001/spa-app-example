import React from 'react';

import Footer from './footer';

export default class Layout extends React.Component {
	constructor(){
		super();
		this.name = "Layout";
	}
	
	render() {
		return (
			<div className="container">
				<Footer />
			</div>
		);
	}
} 
