import React from 'react';

import Footer from '../components/footer';
import TopMenuSystem from '../components/top_menu_system';

export default class LayoutSystem extends React.Component {
	constructor(){
		super();
	}
	
	render() {
		return (
			<div className="container">
				<TopMenuSystem />
				{this.props.children}
				<Footer />
			</div>
		);
	}
} 
