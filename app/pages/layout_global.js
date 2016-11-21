import React from 'react';

import Footer from '../components/footer';

export default class LayoutGlobal extends React.Component {
	constructor(){
		super();
	}
	
	render() {
		return (
			<div className="container">
				{this.props.children}
				<Footer />
			</div>
		);
	}
} 
