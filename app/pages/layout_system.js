import React from 'react';

import TopMenuSystem from '../components/top_menu_system';

export default class LayoutSystem extends React.Component {
	constructor(){
		super();
	}
	
	render() {
		return (
			<div>
				<TopMenuSystem />
				{this.props.children}
			</div>
		);
	}
} 
