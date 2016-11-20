import React from 'react';
import { Link } from 'react-router';

import Content from '../components/content';
import Footer from '../components/footer';
import TopMenu from '../components/top_menu';

export default class Layout extends React.Component {
	constructor(){
		super();
		this.name = "Layout";
	}
	
	render() {
		return (
			<div className="container">
				<TopMenu />
				<Content />
				{this.props.children}
				<Footer />
			</div>
		);
	}
} 
