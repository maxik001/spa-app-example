import React from 'react';

import Content from '../components/content';
import Footer from '../components/footer';

export default class LayoutSystem extends React.Component {
	constructor(){
		super();
		this.name = "LayoutSystem";
	}
	
	render() {
		return (
			<div className="container">
				<Content />
				{this.props.children}
				<Footer />
			</div>
		);
	}
} 
