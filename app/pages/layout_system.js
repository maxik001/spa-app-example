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
				
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						{this.props.children}
					</div>
					<div className="col-md-3"></div>
				</div>				
				
			</div>
		);
	}
} 
